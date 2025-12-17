
import { ModeCategory, NoteName } from './types';

export const CHROMATIC_SCALE: NoteName[] = [
  'Do', 'Do#', 'Ré', 'Mib', 'Mi', 'Fa', 'Fa#', 'Sol', 'Lab', 'La', 'Sib', 'Si'
];

export const CATEGORIES: ModeCategory[] = [
  {
    id: 'arab',
    title: 'Modes Arabes / Algériens',
    modes: [
      { name: 'Nahawand', intervals: [0, 2, 3, 5, 7, 8, 10] }, // Mineur Naturel
      { name: 'Kurd', intervals: [0, 1, 3, 5, 7, 8, 10] }, // Phrygien
      { name: 'Rast (Tempéré)', intervals: [0, 2, 4, 5, 7, 9, 11] }, // Majeur
      { name: 'Bayati (Tempéré)', intervals: [0, 1, 3, 5, 7, 8, 10] }, // Phrygien approx
      { name: 'Hijaz', intervals: [0, 1, 4, 5, 7, 8, 10] }, // Phrygien Dominant
      { name: 'Nekriz', intervals: [0, 2, 3, 6, 7, 9, 10] }, // Dorien #4
      { name: 'Sika (Tempéré)', intervals: [0, 2, 4, 5, 7, 9, 11] }, // Majeur approx
      { name: 'Sika Saba', intervals: [0, 1, 3, 4, 7, 8, 10] }, // Saba tempéré
      { name: 'Mawal (Bartók)', intervals: [0, 2, 4, 6, 7, 9, 10] }, // Lydien b7
      { name: 'Raml Maya', intervals: [0, 2, 3, 5, 7, 9, 10] }, // Dorien
      { name: 'Khoumasi 1', intervals: [0, 2, 4, 7, 9] }, // Majeur Penta
      { name: 'Khoumasi 2', intervals: [0, 3, 5, 7, 10] }, // Mineur Penta
    ]
  },
  {
    id: 'greek-major',
    title: 'Modes Grecs (Majeur)',
    modes: [
      { name: 'Ionien', intervals: [0, 2, 4, 5, 7, 9, 11] },
      { name: 'Dorien', intervals: [0, 2, 3, 5, 7, 9, 10] },
      { name: 'Phrygien', intervals: [0, 1, 3, 5, 7, 8, 10] },
      { name: 'Lydien', intervals: [0, 2, 4, 6, 7, 9, 11] },
      { name: 'Mixolydien', intervals: [0, 2, 4, 5, 7, 9, 10] },
      { name: 'Éolien', intervals: [0, 2, 3, 5, 7, 8, 10] },
      { name: 'Locrien', intervals: [0, 1, 3, 5, 6, 8, 10] },
    ]
  },
  {
    id: 'greek-minor',
    title: 'Modes Grecs (Min. Mélodique)',
    modes: [
      { name: 'Mineur mélodique', intervals: [0, 2, 3, 5, 7, 9, 11] },
      { name: 'Dorien ♭2', intervals: [0, 1, 3, 5, 7, 9, 10] },
      { name: 'Lydien augmenté', intervals: [0, 2, 4, 6, 8, 9, 11] },
      { name: 'Lydien dominant', intervals: [0, 2, 4, 6, 7, 9, 10] },
      { name: 'Mixolydien ♭6', intervals: [0, 2, 4, 5, 7, 8, 10] },
      { name: 'Locrien ♮2', intervals: [0, 2, 3, 5, 6, 8, 10] },
      { name: 'Superlocrien', intervals: [0, 1, 3, 4, 6, 8, 10] },
    ]
  }
];
