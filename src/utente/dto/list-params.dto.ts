//tipi utilizzati per definire quali campi di where e orderby rendo disponibilie nell'api pubblica
type WhereInput = {nome?: string, cognome?: string, email?: string, ruolo?: string, 
  AND?: WhereInput[], OR?: WhereInput[], NOT?: WhereInput[]};

type OrderByInput = {nome?: "asc" | "desc", cognome?: "asc" | "desc", email?: "asc" | "desc", ruolo?: "asc" | "desc"};

export class UtenteListParamsDto {
  skip?: number;
  take?: number;
  //where?: Prisma.UtenteWhereInput;
  //restringo cosa rendo disponibile nell'api pubblica
  where? : WhereInput;
  //orderBy?: Prisma.UtenteOrderByWithRelationInput;
  orderBy? : OrderByInput;
};