
import React, { useState, useMemo } from 'react';
import { CHROMATIC_SCALE, CATEGORIES } from './constants';
import { Instrument, Mode, NoteName } from './types';

export default function App() {
  const [concertRoot, setConcertRoot] = useState<NoteName>('Do');
  const [instrument, setInstrument] = useState<Instrument>('ALTO');
  const [activeTab, setActiveTab] = useState<string>(CATEGORIES[0].id);
  const [selectedMode, setSelectedMode] = useState<Mode>(CATEGORIES[0].modes[0]);

  // Transposition logic
  // Alto (Eb): Concert + 9 semitones (Major 6th)
  // Tenor (Bb): Concert + 2 semitones (Major 2nd)
  // Ut (C): Concert + 0 semitones (No transposition)
  const transposedNotes = useMemo(() => {
    const rootIndex = CHROMATIC_SCALE.indexOf(concertRoot);
    
    let shift = 0;
    if (instrument === 'ALTO') shift = 9;
    else if (instrument === 'TENOR') shift = 2;
    else if (instrument === 'UT') shift = 0;
    
    const saxRootIndex = (rootIndex + shift) % 12;

    return selectedMode.intervals.map(interval => {
      const noteIndex = (saxRootIndex + interval) % 12;
      return CHROMATIC_SCALE[noteIndex];
    });
  }, [concertRoot, instrument, selectedMode]);

  const activeCategory = CATEGORIES.find(c => c.id === activeTab);

  return (
    <div className="min-h-screen pb-20 lg:pb-0 lg:flex lg:flex-col">
      {/* Header & Main Controls */}
      <header className="bg-white shadow-sm sticky top-0 z-10 p-4 border-b">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-indigo-700 tracking-tight">MO2</h1>
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full font-semibold">
              v1.2
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Concert Pitch Selector */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Note de Concert (Fondamentale)</label>
              <select
                value={concertRoot}
                onChange={(e) => setConcertRoot(e.target.value as NoteName)}
                className="w-full bg-gray-100 border-none rounded-xl py-3 px-4 text-lg font-bold focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
              >
                {CHROMATIC_SCALE.map(note => (
                  <option key={note} value={note}>{note}</option>
                ))}
              </select>
            </div>

            {/* Instrument Selector */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Tonalité de l'instrument</label>
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setInstrument('ALTO')}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${instrument === 'ALTO' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-500'}`}
                >
                  Eb
                </button>
                <button
                  onClick={() => setInstrument('TENOR')}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${instrument === 'TENOR' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-500'}`}
                >
                  Bb
                </button>
                <button
                  onClick={() => setInstrument('UT')}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${instrument === 'UT' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-500'}`}
                >
                  C
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Result Display (Immediate value) */}
      <div className="bg-indigo-700 text-white p-6 shadow-lg border-b border-indigo-800">
        <div className="max-w-4xl mx-auto space-y-2 text-center lg:text-left">
          <div className="flex flex-wrap items-baseline gap-2 justify-center lg:justify-start">
            <h2 className="text-2xl font-bold">{selectedMode.name}</h2>
            <p className="text-indigo-200 text-sm">sur {concertRoot} (concert)</p>
          </div>
          
          <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-3">
            {transposedNotes.map((note, idx) => (
              <React.Fragment key={idx}>
                <span className="text-3xl lg:text-4xl font-black">{note}</span>
                {idx < transposedNotes.length - 1 && (
                  <span className="text-indigo-400 text-2xl lg:text-3xl self-center mx-1">–</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="text-xs text-indigo-300 pt-2 font-medium uppercase tracking-widest">
            {instrument === 'UT' 
              ? 'Version originale (Instrument en C / Piano)' 
              : `Notes à jouer sur instrument en ${instrument === 'ALTO' ? 'Eb (Alto)' : 'Bb (Ténor)'}`
            }
          </p>
        </div>
      </div>

      {/* Tabs Menu */}
      <nav className="flex overflow-x-auto bg-gray-200 p-1 space-x-1 sticky top-[248px] md:top-[124px] z-10 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveTab(cat.id);
              setSelectedMode(cat.modes[0]);
            }}
            className={`whitespace-nowrap flex-1 py-3 px-4 text-xs font-bold rounded-lg transition-all ${activeTab === cat.id ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-600 hover:bg-gray-300'}`}
          >
            {cat.title}
          </button>
        ))}
      </nav>

      {/* Mode List Selection */}
      <main className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {activeCategory?.modes.map(mode => (
            <button
              key={mode.name}
              onClick={() => setSelectedMode(mode)}
              className={`text-left p-5 rounded-2xl border-2 transition-all active:scale-95 ${selectedMode.name === mode.name 
                ? 'border-indigo-600 bg-indigo-50 shadow-md ring-1 ring-indigo-600' 
                : 'border-white bg-white hover:border-gray-200 shadow-sm'}`}
            >
              <h3 className={`text-lg font-bold ${selectedMode.name === mode.name ? 'text-indigo-800' : 'text-gray-800'}`}>
                {mode.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1 uppercase tracking-tight">
                {activeCategory.title}
              </p>
            </button>
          ))}
        </div>
      </main>

      <footer className="text-center p-6 text-gray-400 text-xs">
        MO2 – Outil pédagogique pour saxophonistes.
      </footer>
    </div>
  );
}
