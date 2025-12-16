import React, { useState, useMemo, useCallback } from "react";
import { CharacterStrip } from "./components/CharacterStrip";
import { GestureControl } from "./components/GestureControl";
import { GestureEncyclopedia } from "./components/GestureEncyclopedia";
import { CHARACTERS, DEFAULT_CHARACTERS, GESTURES } from "./constants";
import { CharacterReaction, Gesture, CharacterProfile, CharacterId, CulturalNote } from "./types";
import { fetchReactions } from "./services/geminiService";

export default function App() {
  const [started, setStarted] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [currentReactions, setCurrentReactions] = useState<CharacterReaction[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Interaction State
  const [selectedGestureId, setSelectedGestureId] = useState<string | null>(null);
  const [hoveredGestureId, setHoveredGestureId] = useState<string | null>(null);
  
  // Helper to find full character profile
  const getCharacter = (id: CharacterId): CharacterProfile | undefined => 
    CHARACTERS.find(c => c.id === id);

  // Determine which characters to display
  const activeCharacters = useMemo(() => {
    let targetId = hoveredGestureId || selectedGestureId;
    let ids: CharacterId[] = DEFAULT_CHARACTERS;

    if (targetId) {
       const g = GESTURES.find((g: Gesture) => g.id === targetId);
       if (g && g.relatedCharacters) ids = g.relatedCharacters;
    }

    const chars = ids.map(id => getCharacter(id)).filter((c): c is CharacterProfile => !!c);
    // Ensure we always have 4 for the layout
    return chars.length >= 4 ? chars.slice(0, 4) : chars;
  }, [hoveredGestureId, selectedGestureId]);

  // --- Handle Interactions ---
  const handleGestureSelect = async (gesture: Gesture) => {
    if (loading) return;

    setHoveredGestureId(null);
    setLoading(true);
    setSelectedGestureId(gesture.id);
    setCurrentReactions([]); 

    try {
      const reactions = await fetchReactions(gesture.prompt, activeCharacters);
      setCurrentReactions(reactions);
    } catch (err) {
      console.error("Failed to fetch reactions", err);
    } finally {
      setLoading(false);
    }
  };

  const handleHoverGesture = (gesture: Gesture | null) => {
    if (!loading) {
        setHoveredGestureId(gesture?.id || null);
        if (gesture) setCurrentReactions([]);
    }
  };

  const getReactionForCharacter = (charId: string) => {
    return currentReactions.find(r => r.characterId === charId) || null;
  };

  return (
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden font-sans">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

       {/* INTRO SCREEN */}
       <div 
         onClick={() => setStarted(true)}
         className={`fixed inset-0 z-[100] bg-zinc-900 cursor-pointer transition-opacity duration-1000 ${started ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
       >
          {/* Background Image filling the screen */}
          <img 
            src="https://i.imgur.com/tQVxKm8.png" 
            alt="Title Screen" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Enter Button Overlay */}
          <div className="absolute inset-x-0 bottom-24 flex justify-center z-10">
              <span className="text-white/80 text-xs lg:text-sm border border-white/40 bg-black/30 backdrop-blur-md px-10 py-4 rounded-full hover:bg-white hover:text-black transition-all hover:scale-105 tracking-[0.3em] uppercase shadow-2xl">
                  ENTER
              </span>
          </div>
       </div>

      {/* Encyclopedia Button */}
      {started && (
        <button 
            onClick={() => setShowGuide(true)}
            className="fixed top-32 right-6 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full border border-white/10 transition-all duration-300 hover:scale-110 group"
            title="Gesture Encyclopedia"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 lg:w-6 lg:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                백과사전
            </span>
        </button>
      )}

      {/* Encyclopedia Modal */}
      {showGuide && <GestureEncyclopedia onClose={() => setShowGuide(false)} />}

      {/* Main Layout */}
      <div className={`flex flex-col lg:flex-row h-full w-full transition-opacity duration-1000 ${started ? 'opacity-100' : 'opacity-0'}`}>
        {activeCharacters.map((char, index) => (
          <div key={`${index}-${char.id}`} className="flex-1 relative border-b lg:border-b-0 lg:border-r border-white/10 last:border-0 overflow-hidden">
            <CharacterStrip 
                profile={char} 
                reaction={getReactionForCharacter(char.id)}
                isLoading={loading}
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className={`transition-opacity duration-1000 ${started ? 'opacity-100' : 'opacity-0'}`}>
        <GestureControl 
            onSelectGesture={handleGestureSelect}
            onHoverGesture={handleHoverGesture}
            isLoading={loading}
            selectedGestureId={selectedGestureId}
        />
      </div>
    </div>
  );
}