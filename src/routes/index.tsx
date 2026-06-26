import { createFileRoute } from "@tanstack/react-router";
import { useRef, useCallback } from "react";
import { WeddingSlide } from "@/components/WeddingSlide";
import { SlideHero } from "@/components/SlideHero";
import { SlideNames } from "@/components/SlideNames";
import { SlideInvite } from "@/components/SlideInvite";
import { SlideCeremony } from "@/components/SlideCeremony";
import { SlideRegistry } from "@/components/SlideRegistry";
import { SlideMessages } from "@/components/SlideMessages";
import { SlideRSVP } from "@/components/SlideRSVP";
import { slideBackgrounds } from "@/config/backgrounds";

export const Route = createFileRoute("/")({
  component: WeddingInvitation,
  head: () => ({
    meta: [
      { title: "Jikku & Lena — Wedding Invitation" },
      { name: "description", content: "You're invited to celebrate the wedding of Jikku & Lena on June 22, 2024" },
      { property: "og:title", content: "Jikku & Lena — Wedding Invitation" },
      { property: "og:description", content: "You're invited to celebrate the wedding of Jikku & Lena on June 22, 2024" },
    ],
  }),
});

function WeddingInvitation() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = useCallback((index: number) => {
    if (!containerRef.current) return;
    const slides = containerRef.current.children;
    if (slides[index]) {
      slides[index].scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-dvh w-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
      style={{ scrollSnapType: "y mandatory" }}
    >
      <WeddingSlide backgroundImage={slideBackgrounds.heroVideo} showSwipeUp={false}>
        <SlideHero onStart={() => scrollToSlide(1)} />
      </WeddingSlide>

      <WeddingSlide backgroundImage={slideBackgrounds.names} onNext={() => scrollToSlide(2)}>
        <SlideNames />
      </WeddingSlide>

      <WeddingSlide backgroundImage={slideBackgrounds.invite} onNext={() => scrollToSlide(3)} noOverlay>
        <SlideInvite />
      </WeddingSlide>

      <WeddingSlide backgroundImage={slideBackgrounds.ceremony} onNext={() => scrollToSlide(4)} noOverlay>
        <SlideCeremony />
      </WeddingSlide>

      <WeddingSlide backgroundImage={slideBackgrounds.registry} onNext={() => scrollToSlide(5)}>
        <SlideRegistry />
      </WeddingSlide>

      <WeddingSlide backgroundImage={slideBackgrounds.messages} onNext={() => scrollToSlide(6)}>
        <SlideMessages />
      </WeddingSlide>

      <WeddingSlide backgroundImage={slideBackgrounds.rsvp} showSwipeUp={false}>
        <SlideRSVP />
      </WeddingSlide>
    </div>
  );
}
