
export type Instrument = 'ALTO' | 'TENOR' | 'UT';

export interface Mode {
  name: string;
  intervals: number[]; // en demi-tons depuis la fondamentale
  microtonalIndices?: number[]; // indices dans le tableau d'intervalles qui sont des quarts de ton
  useFlats?: boolean; // préférence générale pour les bémols
  sharpIndices?: number[]; // indices spécifiques qui DOIVENT être affichés en dièse (ex: Fa# dans un mode à bémols)
  description?: string;
}

export interface ModeCategory {
  id: string;
  title: string;
  modes: Mode[];
}

export type NoteName = 'Do' | 'Do#' | 'Ré' | 'Mib' | 'Mi' | 'Fa' | 'Fa#' | 'Sol' | 'Lab' | 'La' | 'Sib' | 'Si' | 'Réb' | 'Solb';
