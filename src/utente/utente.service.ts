import { Injectable } from '@nestjs/common';
import { CreateUtenteDto } from './dto/create-utente.dto.js';
import { UpdateUtenteDto } from './dto/update-utente.dto.js';

@Injectable()
export class UtenteService {
  create(createUtenteDto: CreateUtenteDto) {
    return 'This action adds a new utente';
  }

  findAll() {
    return `This action returns all utente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} utente`;
  }

  update(id: number, updateUtenteDto: UpdateUtenteDto) {
    return `This action updates a #${id} utente`;
  }

  remove(id: number) {
    return `This action removes a #${id} utente`;
  }
}
