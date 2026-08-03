"use client";

import { useEffect, useRef } from "react";

export default function Work() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!wrapperRef.current) return;
    
    let slider: any = null;
    let rafId: number;

    const init = async () => {
      try {
        const Core = (await import("smooothy")).default;
        
        slider = new Core(wrapperRef.current, {
          infinite: true,
          snap: true,
          onUpdate: ({ parallaxValues }: { parallaxValues: number[] }) => {
            if (!parallaxValues) return;
            slidesRef.current.forEach((el, i) => {
              if (el) {
                const val = parallaxValues[i] || 0;
                // Subtle depth effect: scale down based on distance from center
                const scale = Math.max(0.85, 1 - Math.abs(val) * 0.15);
                // Parallax translation
                const tx = val * 50; 
                el.style.transform = `scale(${scale}) translateX(${tx}px)`;
              }
            });
          }
        });

        const animate = () => {
          if (slider && slider.update) {
            slider.update();
          }
          rafId = requestAnimationFrame(animate);
        };
        
        animate();
      } catch (err) {
        console.error("Failed to load smooothy:", err);
      }
    };
    
    init();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (slider && typeof slider.destroy === "function") {
        slider.destroy();
      }
    };
  }, []);

  const projects = [
    {
      title: "Finora",
      desc: "Flutter and Firebase personal finance application with real-time syncing.",
      color: "from-orange-400 to-orange-500",
      tag: "Mobile App"
    },
    {
      title: "Offline-First POS",
      desc: "Tauri v2 + React + SQLite point of sale system designed for zero-connectivity environments.",
      color: "from-orange-500 to-orange-600",
      tag: "Desktop Software"
    },
    {
      title: "3D Creator Portfolio",
      desc: "Immersive portfolio site built with vanilla JavaScript and scroll-driven animations.",
      color: "from-orange-500 to-[#d85800]",
      tag: "Web Experience"
    }
  ];

  return (
    <section id="work" className="py-24 sm:py-32 overflow-hidden bg-[#fffaf5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold text-gray-900 tracking-tight text-center">
          Our <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Work</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto text-center">
          A showcase of our recent engineering challenges and solutions.
        </p>
      </div>

      <div className="w-full select-none cursor-grab active:cursor-grabbing pb-12">
        <div 
          ref={wrapperRef} 
          data-slider 
          className="flex items-center" 
          style={{ display: "flex", overflowX: "hidden" }}
        >
          {projects.map((proj, idx) => (
            <div 
              key={idx} 
              className="w-[85vw] sm:w-[60vw] md:w-[45vw] shrink-0 px-3 sm:px-4"
              style={{ flexShrink: 0 }}
            >
              <div 
                ref={(el: HTMLDivElement | null) => { slidesRef.current[idx] = el; }}
                className={`relative h-[350px] sm:h-[450px] rounded-3xl p-8 sm:p-10 flex flex-col justify-end text-white overflow-hidden bg-gradient-to-br ${proj.color} shadow-xl shadow-orange-500/10 transition-transform duration-75`}
              >
                {/* Decorative background circle */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                    {proj.tag}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3">{proj.title}</h3>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-sm">{proj.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
