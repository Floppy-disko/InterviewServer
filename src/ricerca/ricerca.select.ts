import { Prisma } from '../generated/prisma/client.js';

export const ricercaSelect = {
  id: true,
  descrizione: true,
  stato: true,
  interviste: {
    select: {
      id: true,
    },
  },
  selezionati: {
    select: {
      id: true,
    },
  },
} satisfies Prisma.RicercaSelect;

export type RicercaForMapping = Prisma.RicercaGetPayload<{
  select: typeof ricercaSelect;
}>;
