"use client";

import { useEffect } from "react";

export default function StringTuneWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    import("@fiddle-digital/string-tune").then(({ default: StringTune, StringMagnetic, StringProgress }) => {
      const instance = StringTune.getInstance();
      instance.use([StringMagnetic, StringProgress]);
      instance.start(60);
    }).catch(console.error);
  }, []);

  return (
    <>
      <div 
        data-string-progress 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600 z-[9999] pointer-events-none" 
        style={{ transformOrigin: "0% 50%" }}
      />
      {children}
    </>
  );
}
