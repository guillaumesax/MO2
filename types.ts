
export type Instrument = 'ALTO' | 'TENOR' | 'UT';

export interface Mode {
  name: string;
  intervals: number[]; // in semitones from root
  description?: string;
}

export interface ModeCategory {
  id: string;
  title: string;
  modes: Mode[];
}

export type NoteName = 'Do' | 'Do#' | 'Ré' | 'Mib' | 'Mi' | 'Fa' | 'Fa#' | 'Sol' | 'Lab' | 'La' | 'Sib' | 'Si';
