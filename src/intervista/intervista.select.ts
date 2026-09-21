import { Prisma } from '../generated/prisma/client.js';

// Argomenti per query ricerca interviste che estrae solo i campi che interessano per creare il dto di risposta. Serve per evitare di estrarre campi inutili e per evitare errori di mapping quando si fa il mapping da modello a dto.
export const intervistaSelect = {
  id: true,
  stato: true,
  note: true,
  inizio: true,
  fine: true,
  candidato: {
    select: {
      id: true,
    },
  },
  intervistatori: {
    select: {
      id: true,
    },
  },
  ricerca: {
    select: {
      id: true,
    },
  },
} satisfies Prisma.IntervistaSelect;

export type IntervistaForMapping = Prisma.IntervistaGetPayload<{
  select: typeof intervistaSelect;
}>;
