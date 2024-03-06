import { IdAndTitle } from "./IdAndTitle.model";

export interface Movie {
    idAndTitle: IdAndTitle | null;
    type: string | null;
    year: number | null;
    fiche: string | null;
}