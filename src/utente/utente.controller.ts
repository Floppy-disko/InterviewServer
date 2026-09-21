import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  IntersectionType,
} from '@nestjs/swagger';
import { UtenteService } from './utente.service.js';
import { CreateUtenteDto } from './dto/create-utente.dto.js';
import { ResponseUtenteDto } from './dto/response-utente.dto.js';
import { UpdateUtenteDto } from './dto/update-utente.dto.js';
import { UtenteSelectParamsDto } from './dto/utente-select-params.dto.js';
import { UtenteWhereParamsDto } from './dto/utente-where-params.dto.js';
import { PaginationParamsDto } from '../dto/pagination-params.dto.js';

//classe che combina tutti i tipi di query paramter
//serve che sia una classe così che class-validator sappia il tipo a runtime
export class UtenteFindAllParamsDto extends IntersectionType(
  IntersectionType(UtenteSelectParamsDto, UtenteWhereParamsDto),
  PaginationParamsDto,
) {}

@ApiTags('Utenti')
@Controller('utente')
export class UtenteController {
  constructor(private readonly utenteService: UtenteService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user (candidate or interviewer)' })
  @ApiResponse({ status: 201, description: 'User created successfully', type: ResponseUtenteDto })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 404, description: 'User with email already exists' })
  create(@Body() createDto: CreateUtenteDto) {
    return this.utenteService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve users with filters, projection, and pagination' })
  @ApiResponse({ status: 200, description: 'List of matching users', type: [ResponseUtenteDto] })
  findAll(
    @Query() params: UtenteFindAllParamsDto,
  ) {
    return this.utenteService.findAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single user by ID' })
  @ApiResponse({ status: 200, description: 'User found', type: ResponseUtenteDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(
    @Param('id') id: number,
    @Query() params: UtenteSelectParamsDto,
  ) {
    return this.utenteService.findOne(id, params);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiResponse({ status: 200, description: 'User updated successfully', type: ResponseUtenteDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(
    @Param('id') id: number,
    @Body() update: UpdateUtenteDto,
  ) {
    return this.utenteService.update(id, update);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully', type: ResponseUtenteDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id') id: number) {
    return this.utenteService.remove(id);
  }
}
