"use client";

import { useEffect } from "react";

export default function StringTuneWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    import("@fiddle-digital/string-tune").then(({ default: StringTune, StringMagnetic, StringProgress, StringReveal, StringMarquee }) => {
      const instance = StringTune.getInstance();
      instance.use([StringMagnetic, StringProgress, StringReveal, StringMarquee]);
      instance.start(60);
    }).catch(console.error);
  }, []);

  return (
    <>
      <div 
        data-string-progress 
        className="fixed top-0 right-0 w-1 bg-gradient-to-b from-orange-400 to-orange-600 z-[9999] pointer-events-none" 
        style={{ transformOrigin: "50% 0%", height: "100vh" }}
      />
      {children}
    </>
  );
}
