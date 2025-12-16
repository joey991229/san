import React, { useState, useEffect } from "react";
import { CharacterProfile, CharacterReaction } from "../types";

interface CharacterStripProps {
  profile: CharacterProfile;
  reaction: CharacterReaction | null;
  isLoading: boolean;
}

export const CharacterStrip: React.FC<CharacterStripProps> = ({ profile, reaction, isLoading }) => {
  const [imgError, setImgError] = useState(false);
  
  // Determine if the reaction is considered "negative" (insulted, shocked, confused)
  const isNegative = reaction && !isLoading && (
    reaction.emotion === 'negative' || 
    reaction.emotion === 'confused' || 
    reaction.emotion === 'surprised'
  );
  
  // Determine which image URL to show
  let currentImageUrl = profile?.images?.default;
  if (reaction && !isLoading) {
      if (reaction.emotion === 'positive' || reaction.emotion === 'happy' || reaction.emotion === 'excited') {
        currentImageUrl = profile?.images?.positive;
      } else if (isNegative) {
        currentImageUrl = profile?.images?.negative;
      }
  }

  useEffect(() => {
    setImgError(false);
  }, [profile?.id, currentImageUrl]);

  return (
    <div className={`relative h-full w-full overflow-hidden transition-colors duration-500 ${profile.color} border-x border-white/10 group flex flex-col items-center justify-center`}>
      {/* Background Image Layer */}
      <div className="absolute inset-0 w-full h-full transition-opacity duration-700">
         {!imgError && currentImageUrl ? (
             <img 
               key={currentImageUrl}
               src={currentImageUrl} 
               alt={profile.name} 
               onError={() => setImgError(true)}
               className={`w-full h-full object-cover animate-[fadeIn_0.5s_ease-out] ${isLoading ? 'blur-sm scale-105 grayscale-[30%]' : 'blur-0 scale-100'}`}
               style={{ transition: 'filter 0.5s ease, transform 0.5s ease' }}
             />
         ) : (
            <div className={`w-full h-full ${profile.color} flex items-center justify-center opacity-50`}>
               <span className="text-white font-bold">{profile.country}</span>
            </div>
         )}
         {/* Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10"></div>
      </div>

      {/* Country Watermark */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-white/20 select-none">
          {profile.country}
        </h2>
      </div>

      {/* Character Name */}
      <div className="absolute top-8 right-8 z-10 pointer-events-none text-right">
        <p className="text-xs font-bold text-white/90 uppercase tracking-[0.2em] border-b border-white/30 pb-1 mb-1">
            {profile.name}
        </p>
        <p className="text-[10px] text-white/60 uppercase">
            {profile.country}
        </p>
      </div>

      {/* Dialogue Bubble */}
      <div className={`absolute bottom-[20%] left-1/2 -translate-x-1/2 z-20 w-11/12 max-w-[260px] transition-all duration-500 transform ${reaction && !isLoading ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90 pointer-events-none'}`}>
        <div className={`
            backdrop-blur-xl p-4 rounded-2xl shadow-2xl border text-center relative transition-colors duration-300
            ${isNegative 
                ? 'bg-red-600/90 border-red-500/50 shadow-red-900/50' 
                : 'bg-white/90 border-white/50 shadow-black/20'
            }
        `}>
            {/* Arrow */}
            <div className={`
                absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-r border-b transition-colors duration-300
                ${isNegative 
                    ? 'bg-red-600/90 border-red-500/50' 
                    : 'bg-white/90 border-white/50'
                }
            `}></div>
            
            <p className={`text-lg font-bold mb-0 leading-tight break-keep transition-colors duration-300 ${isNegative ? 'text-white' : 'text-gray-900'}`}>
                "{reaction?.dialogue}"
            </p>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 z-20">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-white animate-bounce delay-0 shadow-lg"></div>
                <div className="w-3 h-3 rounded-full bg-white animate-bounce delay-100 shadow-lg"></div>
                <div className="w-3 h-3 rounded-full bg-white animate-bounce delay-200 shadow-lg"></div>
            </div>
        </div>
      )}
    </div>
  );
};