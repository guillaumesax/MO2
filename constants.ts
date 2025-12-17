
import { ModeCategory } from './types';

// Échelle chromatique standard avec correspondance pour les enharmoniques
export const CHROMATIC_MAP: Record<number, { sharp: string, flat: string }> = {
  0: { sharp: 'Do', flat: 'Do' },
  1: { sharp: 'Do#', flat: 'Réb' },
  2: { sharp: 'Ré', flat: 'Ré' },
  3: { sharp: 'Mib', flat: 'Mib' },
  4: { sharp: 'Mi', flat: 'Mi' },
  5: { sharp: 'Fa', flat: 'Fa' },
  6: { sharp: 'Fa#', flat: 'Solb' },
  7: { sharp: 'Sol', flat: 'Sol' },
  8: { sharp: 'Lab', flat: 'Lab' },
  9: { sharp: 'La', flat: 'La' },
  10: { sharp: 'Sib', flat: 'Sib' },
  11: { sharp: 'Si', flat: 'Si' },
};

export const CATEGORIES: ModeCategory[] = [
  {
    id: 'arab',
    title: 'Modes Arabes / Algériens',
    modes: [
      { 
        name: 'Nahawand / Sihli (Algérie)', 
        intervals: [0, 2, 3, 5, 7, 8, 11], // Pas de Sib, donc Si bécarre (11)
        useFlats: true 
      },
      { 
        name: 'Kurd / Sika (Algérie)', 
        intervals: [0, 1, 3, 5, 7, 8, 10], 
        useFlats: true 
      },
      { 
        name: 'Sika Saba', 
        intervals: [0, 1, 3, 4, 7, 8, 10], 
        useFlats: true 
      },
      { 
        name: 'Rast', 
        intervals: [0, 2, 3, 5, 7, 9, 10], 
        microtonalIndices: [2, 6], // Mib et Sib quarts de ton
        useFlats: true 
      },
      { 
        name: 'Bayati', 
        intervals: [0, 1, 3, 5, 7, 8, 11], // Pas de Sib (Si bécarre), Réb et Lab qdt
        microtonalIndices: [1, 5], 
        useFlats: true 
      },
      { 
        name: 'Hijaz / Zidane (Algérie)', 
        intervals: [0, 1, 4, 5, 7, 8, 11], // Pas de Sib (Si bécarre)
        useFlats: true 
      },
      { 
        name: 'Nekriz', 
        intervals: [0, 2, 3, 6, 7, 8, 11], // Fa# (6), Lab (8), Si bécarre (11)
        sharpIndices: [3], // L'intervalle à l'index 3 (semiton 6) doit être Fa#
        useFlats: true 
      },
      { 
        name: 'Mawal (Algérie) / Mode Bartók', 
        intervals: [0, 2, 4, 6, 7, 9, 10], 
        sharpIndices: [3], // L'intervalle à l'index 3 (semiton 6) doit être Fa#
        useFlats: true 
      },
      { 
        name: 'Raml Maya (Algérie) / Dorien', 
        intervals: [0, 2, 3, 5, 7, 9, 10], 
        useFlats: true 
      },
      { name: 'Khoumasi 1', intervals: [0, 3, 5, 7, 10], useFlats: true },
      { name: 'Khoumasi 2', intervals: [0, 2, 4, 7, 9], useFlats: true },
    ]
  },
  {
    id: 'greek-major',
    title: 'Modes Grecs (Majeur)',
    modes: [
      { name: 'Ionien', intervals: [0, 2, 4, 5, 7, 9, 11] },
      { name: 'Dorien', intervals: [0, 2, 3, 5, 7, 9, 10] },
      { name: 'Phrygien', intervals: [0, 1, 3, 5, 7, 8, 10], useFlats: true },
      { name: 'Lydien', intervals: [0, 2, 4, 6, 7, 9, 11] },
      { name: 'Mixolydien', intervals: [0, 2, 4, 5, 7, 9, 10] },
      { name: 'Éolien', intervals: [0, 2, 3, 5, 7, 8, 10], useFlats: true },
      { name: 'Locrien', intervals: [0, 1, 3, 5, 6, 8, 10], useFlats: true },
    ]
  },
  {
    id: 'greek-minor',
    title: 'Modes Grecs (Min. Mélodique)',
    modes: [
      { name: 'Mineur mélodique', intervals: [0, 2, 3, 5, 7, 9, 11] },
      { name: 'Dorien ♭2', intervals: [0, 1, 3, 5, 7, 9, 10], useFlats: true },
      { name: 'Lydien augmenté', intervals: [0, 2, 4, 6, 8, 9, 11] },
      { name: 'Lydien dominant', intervals: [0, 2, 4, 6, 7, 9, 10] },
      { name: 'Mixolydien ♭6', intervals: [0, 2, 4, 5, 7, 8, 10], useFlats: true },
      { name: 'Locrien ♮2', intervals: [0, 2, 3, 5, 6, 8, 10], useFlats: true },
      { name: 'Superlocrien', intervals: [0, 1, 3, 4, 6, 8, 10], useFlats: true },
    ]
  }
];
