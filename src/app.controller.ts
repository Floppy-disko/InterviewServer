// @ts-nocheck

import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';

import { UtenteService } from './utente.service';
import { IntervistaService } from './intervista.service';
import { RicercaService } from './ricerca.service';
import { Utente as UtenteModel, Intervista as IntervistaModel, Ricerca as RicercaModel } from './generated/prisma/client';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly UtenteService: UtenteService,
    private readonly IntervistaService: IntervistaService,
    private readonly RicercaService: RicercaService,
  ) {}

  @Get("utenti")
  async getUtenti(): Promise<UtenteModel[]> {
    return this.UtenteService.utenti({});
  }

  @Get("utente/:id")
  async getUtente(@Param("id") id: string): Promise<UtenteModel | null> {
    return this.UtenteService.utente({ id: parseInt(id) });
  }

  @Get("utente/:id/interviste")
  async getIntervisteUtente(@Param("id") id: string): Promise<IntervistaModel[]> {
    return this.IntervistaService.interviste({ where: { candidatoId: parseInt(id) } });
  }

  @Get("interviste")
  async getInterviste(): Promise<IntervistaModel[]> {
    return this.IntervistaService.interviste({});
  }
  
  @Get("intervista/:id")
  async getIntervista(@Param("id") id: string): Promise<IntervistaModel | null> {
    return this.IntervistaService.intervista({ id: parseInt(id) });
  }

  @Get("ricerche")
  async getRicerche(): Promise<RicercaModel[]> {
    return this.RicercaService.ricerche({});
  }

  @Get("ricerca/:id")
  async getRicerca(@Param("id") id: string): Promise<RicercaModel | null> {
    return this.RicercaService.ricerca({ id: parseInt(id) });
  }

  @Get("ricerca/:id/interviste")
  async getIntervisteRicerca(@Param("id") id: string): Promise<IntervistaModel[]> {
    return this.IntervistaService.interviste({ where: { ricercaId: parseInt(id) } });
  }

  @Post("utente")
  async aggiungiUtente(@Body() userData: { nome: string; cognome: string; email: string; ruolo?: string }): Promise<UtenteModel> {
    return this.UtenteService.createUtente(userData);
  }

  // Non definisco lo stato dell'intervista fin da subito, l'ho appena creata quindi tengo lo stato di default (attiva)
  @Post("ricerca")
  async iniziaRicerca(@Body() ricercaData: { descrizione: string }): Promise<RicercaModel> {
    return this.RicercaService.createRicerca(ricercaData);
  }

  @Post("intervista")
  async programmaIntervista(@Body() intervistaData: { ricercaId: number; candidatoId: number; intervistatoriIds: number[]; inizio: Date; fine: Date }): Promise<IntervistaModel> {
    return this.IntervistaService.createIntervista(intervistaData);
  }

  // Comodo per un intervista fatta a un nuovo utente che viene quindi creato al momento della programmazione dell'intervista
  @Post("intervista/nuovo-utente")
  async programmaIntervistaNuovoUtente(@Body() intervistaData: { ricercaId: number; candidato: { nome: string; cognome: string; email: string; ruolo?: string }; intervistatoriIds: number[]; inizio: Date; fine: Date }): Promise<IntervistaModel> {
    return this.IntervistaService.createIntervista({
      ricerca: { connect: { id: intervistaData.ricercaId } },
      candidato: {
        connectOrCreate: { //connectOrCreate al posto di create per evitare di creare un utente duplicato se l'email esiste già
          where: { email: intervistaData.candidato.email },
          create: intervistaData.candidato,
        },
      },
      intervistatori: {
        connect: intervistaData.intervistatoriIds.map(id => ({ id })),
      },
      inizio: intervistaData.inizio,
      fine: intervistaData.fine,
    });
  }

  // Put usato per sostituire completamente i dati della risorsa, mentre Patch per aggiornare solo alcuni campi
  @Put("utente/:id")
  async aggiornaUtente(@Param("id") id: string, @Body() userData: { nome: string; cognome: string; email: string; ruolo: string }): Promise<UtenteModel> {
    return this.UtenteService.updateUtente({
      where: { id: parseInt(id) },
      data: userData,
    });
  }

  @Put("intervista/:id")
  async aggiornaIntervista(@Param("id") id: string, @Body() intervistaData: { ricercaId: number; candidatoId: number; intervistatoriIds: number[]; inizio: Date; fine: Date }): Promise<IntervistaModel> {
    return this.IntervistaService.updateIntervista({
      where: { id: parseInt(id) },
      data: intervistaData,
    });
  }

  @Put("ricerca/:id")
  async aggiornaRicerca(@Param("id") id: string, @Body() ricercaData: { descrizione: string }): Promise<RicercaModel> {
    return this.RicercaService.updateRicerca({
      where: { id: parseInt(id) },
      data: ricercaData,
    });
  }

  @Patch("utente/:id")
  async aggiornaParzialeUtente(@Param("id") id: string, @Body() userData: { nome?: string; cognome?: string; email?: string; ruolo?: string }): Promise<UtenteModel> {
    return this.UtenteService.updateUtente({
      where: { id: parseInt(id) },
      data: userData,
    });
  }
}
