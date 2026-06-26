import { type ReactNode } from "react";
import { ChevronUp } from "lucide-react";

interface WeddingSlideProps {
  backgroundImage: string;
  children: ReactNode;
  showSwipeUp?: boolean;
  onNext?: () => void;
  noOverlay?: boolean;
}

export function WeddingSlide({ backgroundImage, children, showSwipeUp = true, onNext, noOverlay = false }: WeddingSlideProps) {
  return (
    <div className="relative h-dvh w-full shrink-0 overflow-hidden snap-start snap-always">
      <img
        src={backgroundImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="lazy"
      />
      {!noOverlay && <div className="wedding-overlay absolute inset-0" />}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
        {children}
      </div>
      {showSwipeUp && (
        <button
          onClick={onNext}
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <ChevronUp className="swipe-indicator text-wedding-champagne" size={24} />
          <span className="wedding-caps text-[0.6rem] text-wedding-ivory">
            Swipe Up
          </span>
        </button>
      )}
    </div>
  );
}
