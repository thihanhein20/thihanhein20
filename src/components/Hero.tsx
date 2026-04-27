import React, { useEffect, useState } from "react";
import ModelViewer from "./ModelViewer";

const roles = ["Full Stack Software Engineer", "Backend Engineer", "Mobile App Developer", "Creative Coder"];

const TypingText: React.FC = () => {
  const [displayed, setDisplayed] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];

    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1500);
        }
      } else {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setRoleIndex((r) => (r + 1) % roles.length);
        }
      }
    }, deleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  return (
    <span className="inline-flex items-center gap-1">
      <span className="text-cyan-300">{displayed}</span>
      <span className="inline-block w-0.5 h-6 bg-cyan-300 animate-pulse rounded-full" />
    </span>
  );
};

const Hero: React.FC = () => {
  return (
    <>
      {/* Load Nunito from Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap"
        rel="stylesheet"
      />

      <section className="w-full" style={{ fontFamily: "'Nunito', sans-serif" }}>
        <div className="relative w-full h-[420px] sm:h-[480px] md:h-[540px] lg:h-[540px] overflow-hidden">
          {/* 3D Model */}
          <div className="absolute inset-0 pointer-events-auto">
            <ModelViewer modelPath="/models/my_room_2.glb" />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-800/20 to-transparent pointer-events-none" />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center pointer-events-none">
            <div className="px-8 sm:px-12 lg:px-16">

              {/* Hello label */}
              <p className="text-white/80 text-lg sm:text-xl font-700 mb-1 tracking-wide">
                Hello! I'm
              </p>

              {/* Name */}
              <h1
                className="text-white font-900 leading-none drop-shadow-lg"
                style={{
                  fontSize: "clamp(2.8rem, 6vw, 5rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.5px",
                }}
              >
                Thi Han Hein
              </h1>

              {/* Typing subtitle */}
              <p
                className="mt-3 text-xl sm:text-2xl font-700"
                style={{ fontWeight: 700, minHeight: "2rem" }}
              >
                <TypingText />
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;