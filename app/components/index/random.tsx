import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function IndexRandom(): JSX.Element {
  gsap.registerPlugin(ScrollTrigger);
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const image = imageRef.current;

    if (section && text && image) {
      gsap.set(section, { opacity: 0 });
      gsap.set(text, { y: 100 });
      gsap.set(image, { x: 100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom 60%",
          scrub: 1,
        },
      });

      tl.to(section, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      })
        .to(
          text,
          {
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          0
        )
        .to(
          image,
          {
            x: 0,
            duration: 1,
            ease: "power2.out",
          },
          0
        );

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#ecceae] overflow-hidden py-20"
    >
      <div className="mx-auto flex flex-col md:flex-row w-4/5 items-center justify-around">
        <div ref={textRef} className="mb-10 md:mb-0">
          <h1 className="text-4xl font-black text-[#fff5ed] sm:text-5xl lg:text-6xl">
            Shape the Future of <span className="text-[#e68369]">Creation</span>{" "}
            with Us
          </h1>
          <p className="mt-4 text-[#fff5ed] text-xl w-full md:w-[60%]">
            Watch your creativity blossom into a thriving business
          </p>
        </div>
        <img
          ref={imageRef}
          src=""
          alt="Shape the Future of Creation with Us"
          className="max-w-full md:max-w-[40%]"
        />
      </div>
    </section>
  );
}
