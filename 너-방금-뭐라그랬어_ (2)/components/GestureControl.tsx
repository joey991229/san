import React from "react";
import { GESTURES } from "../constants";
import { Gesture } from "../types";

interface GestureControlProps {
  onSelectGesture: (gesture: Gesture) => void;
  onHoverGesture: (gesture: Gesture | null) => void;
  isLoading: boolean;
  selectedGestureId: string | null;
}

export const GestureControl: React.FC<GestureControlProps> = ({ onSelectGesture, onHoverGesture, isLoading, selectedGestureId }) => {
  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center w-full pointer-events-none">
      
      {/* Description Text (Moved Above) */}
      <div className="text-center mb-2 pointer-events-auto">
        <p className="text-white/80 text-[10px] font-medium uppercase tracking-[0.2em] animate-pulse bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-lg">
            {isLoading ? "AI 캐릭터 분석 중..." : "미리보기: 마우스 오버 • 상호작용: 클릭"}
        </p>
      </div>

      {/* Gesture List Container */}
      <div className="pointer-events-auto max-w-[95vw]">
        <div className="bg-black/70 backdrop-blur-xl rounded-2xl lg:rounded-full p-2 shadow-2xl border border-white/10 flex items-center justify-center gap-2 overflow-x-auto custom-scrollbar ring-1 ring-white/20 w-fit mx-auto">
            {GESTURES.map((gesture) => (
            <button
                key={gesture.id}
                onClick={() => onSelectGesture(gesture)}
                onMouseEnter={() => onHoverGesture(gesture)}
                onMouseLeave={() => onHoverGesture(null)}
                disabled={isLoading}
                className={`
                    relative group flex flex-col items-center justify-center 
                    min-w-[64px] h-[64px] lg:min-w-[72px] lg:h-[72px] rounded-xl lg:rounded-full transition-all duration-300 flex-shrink-0
                    ${selectedGestureId === gesture.id ? 'bg-white text-black scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-white/5 text-white hover:bg-white/10'}
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
            >
                <img 
                    src={gesture.icon} 
                    alt={gesture.label}
                    className="w-10 h-10 lg:w-12 lg:h-12 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
                />
                
                {/* Active Indicator Ring */}
                {selectedGestureId === gesture.id && (
                    <span className="absolute inset-0 rounded-xl lg:rounded-full border-2 border-white animate-ping opacity-20"></span>
                )}
            </button>
            ))}
        </div>
      </div>
    </div>
  );
};