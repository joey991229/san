import React from 'react';
import { GESTURES, CHARACTERS } from '../constants';
import { CharacterId } from '../types';

interface GestureEncyclopediaProps {
  onClose: () => void;
}

export const GestureEncyclopedia: React.FC<GestureEncyclopediaProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl overflow-y-auto custom-scrollbar p-4 lg:p-10 animate-[fadeIn_0.3s_ease-out]">
        <button 
            onClick={onClose} 
            className="fixed top-24 right-6 z-50 text-white bg-white/10 hover:bg-white/20 hover:scale-110 border border-white/20 rounded-full p-3 transition-all duration-300"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        
        <div className="text-center mt-10 mb-12">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-2 uppercase tracking-tighter">제스처 백과사전</h2>
            <p className="text-gray-400 uppercase tracking-[0.3em] text-xs lg:text-sm">글로벌 의미 가이드</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto pb-20">
            {GESTURES.map(gesture => (
                <div key={gesture.id} className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 hover:bg-zinc-800/50 transition-all duration-300 hover:border-white/20 group">
                    <div className="flex items-center justify-center mb-6 border-b border-white/10 pb-4">
                        <div className="w-16 h-16 flex items-center justify-center bg-white/5 rounded-full p-2 group-hover:bg-white/10 transition-colors">
                            <img 
                                src={gesture.icon} 
                                alt={gesture.label} 
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        {gesture.culturalNote?.map((note, idx) => {
                             const char = CHARACTERS.find(c => c.id === note.characterId);
                             if (!char) return null;
                             return (
                                 <div key={idx} className="flex justify-between items-start text-sm">
                                     <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${note.isNegative ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                        <span className="text-gray-400 font-medium shrink-0">{char.country}</span>
                                     </div>
                                     <span className={`text-right font-bold ${note.isNegative ? 'text-red-400' : 'text-emerald-400'}`}>
                                        {note.note}
                                     </span>
                                 </div>
                             )
                        })}
                        {(!gesture.culturalNote || gesture.culturalNote.length === 0) && (
                          <p className="text-gray-600 text-sm italic">일반적인 상황에서의 보편적 의미.</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};