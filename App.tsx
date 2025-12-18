
import React, { useState, useMemo } from 'react';
import { CHROMATIC_MAP, CATEGORIES } from './constants';
import { Instrument, Mode, NoteName } from './types';

export default function App() {
  const [concertRoot, setConcertRoot] = useState<number>(0); // Index 0-11
  const [instrument, setInstrument] = useState<Instrument>('ALTO');
  const [activeTab, setActiveTab] = useState<string>(CATEGORIES[0].id);
  const [selectedMode, setSelectedMode] = useState<Mode>(CATEGORIES[0].modes[0]);

  // Logique de transposition
  const transposedResult = useMemo(() => {
    let shift = 0;
    if (instrument === 'ALTO') shift = 9;
    else if (instrument === 'TENOR') shift = 2;
    else if (instrument === 'UT') shift = 0;
    
    const saxRootIndex = (concertRoot + shift) % 12;

    return selectedMode.intervals.map((interval, idx) => {
      const noteIndex = (saxRootIndex + interval) % 12;
      const isMicrotonal = selectedMode.microtonalIndices?.includes(idx);
      const isForcedSharp = selectedMode.sharpIndices?.includes(idx);
      
      const noteInfo = CHROMATIC_MAP[noteIndex];
      // Si l'index est forcé en dièse (ex: Fa#), on l'utilise, sinon on suit la préférence du mode
      const noteName = isForcedSharp ? noteInfo.sharp : (selectedMode.useFlats ? noteInfo.flat : noteInfo.sharp);

      return {
        name: noteName,
        isMicrotonal
      };
    });
  }, [concertRoot, instrument, selectedMode]);

  const activeCategory = CATEGORIES.find(c => c.id === activeTab);

  return (
    <div className="min-h-screen lg:flex lg:flex-col select-none bg-gray-50 text-gray-900">
      {/* Zone Collante Supérieure (Header + Résultats + Nav) */}
      <div className="sticky top-0 z-30 shadow-md">
        {/* Header & Contrôles */}
        <header className="bg-white p-3 md:p-4 border-b">
          <div className="max-w-4xl mx-auto space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2 overflow-hidden">
                <h1 className="text-xl font-black text-indigo-700 tracking-tighter flex-shrink-0">MO2</h1>
                <span className="text-[10px] font-semibold text-gray-400 truncate italic">proposée par Guillaume Sax</span>
              </div>
              <span className="text-[9px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider flex-shrink-0">
                v2.0
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Note Concert</label>
                <select
                  value={concertRoot}
                  onChange={(e) => setConcertRoot(parseInt(e.target.value))}
                  className="w-full bg-gray-100 border-none rounded-lg py-2 px-3 text-base font-bold focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                >
                  {Object.entries(CHROMATIC_MAP).map(([idx, note]) => (
                    <option key={idx} value={idx}>{note.sharp}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Instrument</label>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setInstrument('ALTO')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${instrument === 'ALTO' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-500'}`}
                  >
                    Eb
                  </button>
                  <button
                    onClick={() => setInstrument('TENOR')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${instrument === 'TENOR' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-500'}`}
                  >
                    Bb
                  </button>
                  <button
                    onClick={() => setInstrument('UT')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${instrument === 'UT' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-500'}`}
                  >
                    C
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Affichage des Résultats (Zone Bleue) */}
        <div className="bg-indigo-700 text-white p-3 md:p-6 border-b border-indigo-800">
          <div className="max-w-4xl mx-auto text-center lg:text-left overflow-hidden">
            <h2 className="text-lg md:text-2xl font-bold tracking-tight mb-2 md:mb-3 truncate">{selectedMode.name}</h2>
            
            <div className="flex flex-nowrap justify-between items-center gap-1 md:gap-4 w-full">
              {transposedResult.map((note, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-start flex-shrink-0">
                    <span className="text-lg sm:text-2xl md:text-4xl font-black tracking-tighter">
                      {note.name}
                    </span>
                    {note.isMicrotonal && (
                      <span className="text-sm sm:text-xl md:text-2xl text-indigo-300 font-serif -ml-0.5 mt-0.5" title="Quart de ton">
                        𝄳
                      </span>
                    )}
                  </div>
                  {idx < transposedResult.length - 1 && (
                    <span className="w-0.5 md:w-1.5 h-0.5 md:h-1.5 rounded-full bg-indigo-400 opacity-40 flex-shrink-0"></span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Onglets Catégories */}
        <nav className="flex overflow-x-auto bg-gray-200 p-1 space-x-1 no-scrollbar border-b border-gray-300">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setSelectedMode(cat.modes[0]);
              }}
              className={`whitespace-nowrap flex-1 py-2.5 px-4 text-[10px] font-black uppercase tracking-wider rounded-md transition-all ${activeTab === cat.id ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:bg-gray-300'}`}
            >
              {cat.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Grille de sélection des Modes (Partie Scrollable) */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {activeCategory?.modes.map(mode => (
            <button
              key={mode.name}
              onClick={() => {
                setSelectedMode(mode);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-left p-4 md:p-5 rounded-xl border-2 transition-all active:scale-[0.98] ${selectedMode.name === mode.name 
                ? 'border-indigo-600 bg-indigo-50 shadow-md ring-1 ring-indigo-600' 
                : 'border-white bg-white hover:border-gray-200 shadow-sm'}`}
            >
              <h3 className={`text-base md:text-lg font-bold leading-tight ${selectedMode.name === mode.name ? 'text-indigo-800' : 'text-gray-800'}`}>
                {mode.name}
              </h3>
            </button>
          ))}
        </div>
      </main>

      <footer className="text-center p-8 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
        MO2 – Assistant Modal v2.0
      </footer>
    </div>
  );
}
