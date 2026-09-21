import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  IntersectionType,
} from '@nestjs/swagger';
import { IntervistaService } from './intervista.service.js';
import { CreateIntervistaDto } from './dto/create-intervista.dto.js';
import { UpdateIntervistaDto } from './dto/update-intervista.dto.js';
import { ResponseIntervistaDto } from './dto/response-intervista.dto.js';
import { IntervistaSelectParamsDto } from './dto/intervista-select-params.dto.js';
import { IntervistaWhereParamsDto } from './dto/Intervista-where-params.dto.js';
import { PaginationParamsDto } from '../dto/pagination-params.dto.js';
import { UtenteIdDto } from '../dto/utente-id.dto.js';

export class IntervistaFindAllParamsDto extends IntersectionType(
  IntersectionType(IntervistaSelectParamsDto, IntervistaWhereParamsDto),
  PaginationParamsDto,
) {}

@ApiTags('Interviste')
@Controller('intervista')
export class IntervistaController {
  constructor(private readonly intervistaService: IntervistaService) {}

  @Post()
  @ApiOperation({ summary: 'Schedule a new interview with collision detection' })
  @ApiResponse({ status: 201, description: 'Interview scheduled successfully', type: ResponseIntervistaDto })
  @ApiResponse({ status: 400, description: 'Validation failed or schedule conflict detected' })
  @ApiResponse({ status: 404, description: 'Candidate, interviewer, or ricerca not found' })
  create(@Body() createDto: CreateIntervistaDto) {
    return this.intervistaService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve interviews with filters, date ranges, and pagination' })
  @ApiResponse({ status: 200, description: 'List of matching interviews', type: [ResponseIntervistaDto] })
  findAll(@Query() params: IntervistaFindAllParamsDto) {
    return this.intervistaService.findAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single interview by ID' })
  @ApiResponse({ status: 200, description: 'Interview found', type: ResponseIntervistaDto })
  @ApiResponse({ status: 404, description: 'Interview not found' })
  findOne(@Param('id') id: number, @Query() params: IntervistaSelectParamsDto) {
    return this.intervistaService.findOne(id, params);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an interview (re-validates schedule conflicts)' })
  @ApiResponse({ status: 200, description: 'Interview updated successfully', type: ResponseIntervistaDto })
  @ApiResponse({ status: 400, description: 'Schedule conflict or validation error' })
  @ApiResponse({ status: 404, description: 'Interview or referenced entity not found' })
  update(@Param('id') id: number, @Body() update: UpdateIntervistaDto) {
    return this.intervistaService.update(id, update);
  }

  @Post(':id/intervistatori')
  @ApiOperation({ summary: 'Add an interviewer to an interview' })
  @ApiResponse({ status: 201, description: 'Interviewer added successfully', type: ResponseIntervistaDto })
  @ApiResponse({ status: 400, description: 'Interviewer is already busy during interview time' })
  @ApiResponse({ status: 404, description: 'Interview or user not found' })
  addIntervistatore(@Param('id') id: number, @Body() body: UtenteIdDto) {
    return this.intervistaService.addIntervistatore(id, body.utenteId);
  }

  @Delete(':id/intervistatori/:utenteId')
  @ApiOperation({ summary: 'Remove an interviewer from an interview' })
  @ApiResponse({ status: 200, description: 'Interviewer removed successfully', type: ResponseIntervistaDto })
  @ApiResponse({ status: 400, description: 'Cannot remove if zero interviewers would remain' })
  @ApiResponse({ status: 404, description: 'Interview not found or user is not an interviewer' })
  removeIntervistatore(
    @Param('id') id: number,
    @Param('utenteId') utenteId: number,
  ) {
    return this.intervistaService.removeIntervistatore(id, utenteId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancel/delete an interview by ID' })
  @ApiResponse({ status: 200, description: 'Interview deleted successfully', type: ResponseIntervistaDto })
  @ApiResponse({ status: 404, description: 'Interview not found' })
  remove(@Param('id') id: number) {
    return this.intervistaService.remove(id);
  }
}
