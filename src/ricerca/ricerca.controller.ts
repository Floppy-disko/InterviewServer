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
import { RicercaService } from './ricerca.service.js';
import { CreateRicercaDto } from './dto/create-ricerca.dto.js';
import { UpdateRicercaDto } from './dto/update-ricerca.dto.js';
import { ResponseRicercaDto } from './dto/response-ricerca.dto.js';
import { RicercaSelectParamsDto } from './dto/ricerca-select-params.dto.js';
import { RicercaWhereParamsDto } from './dto/ricerca-where-params.dto.js';
import { PaginationParamsDto } from '../dto/pagination-params.dto.js';
import { UtenteIdDto } from '../dto/utente-id.dto.js';

export class RicercaFindAllParamsDto extends IntersectionType(
  IntersectionType(RicercaSelectParamsDto, RicercaWhereParamsDto),
  PaginationParamsDto,
) {}

@ApiTags('Ricerche')
@Controller('ricerca')
export class RicercaController {
  constructor(private readonly ricercaService: RicercaService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new recruitment campaign' })
  @ApiResponse({ status: 201, description: 'Ricerca created successfully', type: ResponseRicercaDto })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  create(@Body() createRicercaDto: CreateRicercaDto) {
    return this.ricercaService.create(createRicercaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve recruitment campaigns with filters and pagination' })
  @ApiResponse({ status: 200, description: 'List of matching ricerche', type: [ResponseRicercaDto] })
  findAll(@Query() params: RicercaFindAllParamsDto) {
    return this.ricercaService.findAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single recruitment campaign by ID' })
  @ApiResponse({ status: 200, description: 'Ricerca found', type: ResponseRicercaDto })
  @ApiResponse({ status: 404, description: 'Ricerca not found' })
  findOne(@Param('id') id: string, @Query() params: RicercaSelectParamsDto) {
    return this.ricercaService.findOne(+id, params);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a recruitment campaign' })
  @ApiResponse({ status: 200, description: 'Ricerca updated successfully', type: ResponseRicercaDto })
  @ApiResponse({ status: 404, description: 'Ricerca not found' })
  update(@Param('id') id: string, @Body() updateRicercaDto: UpdateRicercaDto) {
    return this.ricercaService.update(+id, updateRicercaDto);
  }

  @Post(':id/selezionato')
  @ApiOperation({ summary: 'Add a selected candidate to this recruitment campaign' })
  @ApiResponse({ status: 201, description: 'Candidate added to selection', type: ResponseRicercaDto })
  @ApiResponse({ status: 404, description: 'Ricerca or user not found' })
  addSelezionato(@Param('id') id: string, @Body() body: UtenteIdDto) {
    return this.ricercaService.addSelezionato(+id, body.utenteId);
  }

  @Delete(':id/selezionato/:utenteId')
  @ApiOperation({ summary: 'Remove a candidate from the selection' })
  @ApiResponse({ status: 200, description: 'Candidate removed from selection', type: ResponseRicercaDto })
  @ApiResponse({ status: 404, description: 'Ricerca or user not found or not selected' })
  removeSelezionato(
    @Param('id') id: string,
    @Param('utenteId') utenteId: string,
  ) {
    return this.ricercaService.removeSelezionato(+id, +utenteId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a recruitment campaign by ID' })
  @ApiResponse({ status: 200, description: 'Ricerca deleted successfully', type: ResponseRicercaDto })
  @ApiResponse({ status: 404, description: 'Ricerca not found' })
  remove(@Param('id') id: string) {
    return this.ricercaService.remove(+id);
  }
}
