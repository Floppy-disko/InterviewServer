import { Prisma } from '../generated/prisma/client.js';

export const utenteSelect = {
  id: true,
  nome: true,
  cognome: true,
  email: true,
  ruolo: true,
  intervisteRicevute: {
    select: {
      id: true,
    },
  },
  intervisteEffettuate: {
    select: {
      id: true,
    },
  },
  selezionatoIn: {
    select: {
      id: true,
    },
  },
} satisfies Prisma.UtenteSelect;

export type UtenteForMapping = Prisma.UtenteGetPayload<{
  select: typeof utenteSelect;
}>;
