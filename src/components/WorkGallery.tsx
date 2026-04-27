import React, { useState, useEffect } from "react";
import dashboardImg from "../assets/talent_and_jobs.jpg";
import dashboardImg2 from "../assets/admin-dashboard.jpg";
import mobileAppImg from "../assets/talent_and_jobs_figma.png";
import landingPageImg from "../assets/landing_page.png";

interface WorkItem {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

const works: WorkItem[] = [
  {
    title: "Dashboard Design",
    description:
      "An admin dashboard for managing staff, tracking performance, and monitoring job categories in real time.",
    image: dashboardImg2,
    tags: ["UI Design", "Dashboard"],
  },
  {
    title: "Talent & Jobs App",
    description:
      "A mobile job platform connecting employers and candidates with listings, daily blogs, and smart filters.",
    image: dashboardImg,
    tags: ["Mobile", "React Native"],
  },
  {
    title: "Mobile App UI",
    description:
      "Figma prototype screens covering onboarding, job detail, profile, and notification flows.",
    image: mobileAppImg,
    tags: ["Figma", "Prototyping"],
  },
  {
    title: "Landing Page",
    description:
      "A clean HR management landing page with feature highlights, responsibilities, and a contact section.",
    image: landingPageImg,
    tags: ["Web Design", "Landing Page"],
  },
];

type Direction = "left" | "right" | null;

const WorkGallery: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<Direction>(null);
  const [displayed, setDisplayed] = useState(0);

  const navigate = (dir: "left" | "right") => {
    if (animating) return;

    const next =
      dir === "right"
        ? (current + 1) % works.length
        : (current - 1 + works.length) % works.length;

    setDirection(dir);
    setAnimating(true);
    setCurrent(next);
  };

  useEffect(() => {
    if (!animating) return;
    const timeout = setTimeout(() => {
      setDisplayed(current);
      setAnimating(false);
      setDirection(null);
    }, 300);
    return () => clearTimeout(timeout);
  }, [animating, current]);

  const slideOutClass =
    direction === "right" ? "-translate-x-full opacity-0" : "translate-x-full opacity-0";
  const slideInClass =
    direction === "right" ? "translate-x-full" : "-translate-x-full";

  const item = works[displayed];
  const incoming = works[current];

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-8">Selected Work</h3>

      <div className="relative flex items-center gap-4">
        {/* Left Arrow */}
        <button
          onClick={() => navigate("left")}
          disabled={animating}
          className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 hover:shadow-md transition-all disabled:opacity-40"
          aria-label="Previous"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Card Wrapper */}
        <div className="flex-1 relative overflow-hidden rounded-2xl" style={{ minHeight: "360px" }}>

          {/* Outgoing card */}
          <div
            className={`absolute inset-0 transition-all duration-300 ease-in-out ${
              animating ? slideOutClass : "translate-x-0 opacity-100"
            }`}
          >
            <CardContent item={item} />
          </div>

          {/* Incoming card */}
          {animating && (
            <div
              className={`absolute inset-0 transition-all duration-300 ease-in-out ${slideInClass} animate-slide-in`}
              style={{
                transform: slideInClass.includes("-translate-x") ? "translateX(-100%)" : "translateX(100%)",
                animation: "slideIn 300ms ease-in-out forwards",
              }}
            >
              <CardContent item={incoming} />
            </div>
          )}

          <style>{`
            @keyframes slideIn {
              from {
                transform: ${direction === "right" ? "translateX(100%)" : "translateX(-100%)"};
              }
              to {
                transform: translateX(0);
              }
            }
          `}</style>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => navigate("right")}
          disabled={animating}
          className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 hover:shadow-md transition-all disabled:opacity-40"
          aria-label="Next"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-5">
        {works.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i === current || animating) return;
              navigate(i > current ? "right" : "left");
              setCurrent(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === displayed ? "w-6 bg-teal-500" : "w-1.5 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const CardContent: React.FC<{ item: WorkItem }> = ({ item }) => (
  <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm h-full">
    <img
      src={item.image}
      alt={item.title}
      className="w-full h-56 object-cover"
    />
    <div className="p-5 flex flex-col gap-2">
      <div className="flex gap-2 flex-wrap">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-600 border border-teal-100"
          >
            {tag}
          </span>
        ))}
      </div>
      <h4 className="text-base font-semibold text-gray-900">{item.title}</h4>
      <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
    </div>
  </div>
);

export default WorkGallery;