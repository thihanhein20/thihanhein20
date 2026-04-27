import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ExperienceCard from "./components/Experience";
import WorkGallery from "./components/WorkGallery";
import SkillsCloud from "./components/SkillsCloud";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />

      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Working experience</h3>

            <ExperienceCard
              title="FullStack Engineer"
              company="Neptune Technology"
              period="April 2021 – May 2023"
              skills={[
                "React",
                "Node.js",
                "Java",
                "Hibernate",
                "Springboot",
                "JPA",
                "MongoDB",
                "REST API",
                "MYSQL",
                "React Native",
                "Tailwind CSS",
              ]}
            />

            <ExperienceCard
              title="Software Engineering Internship"
              company="BizLeap Technology"
              period="February 2019 – May 2019"
              skills={[
                "Java",
                "Spring Boot",
                "Maven",
                "MySQL",
                "JavaScript",
                "API Integration",
              ]}
            />

            {/* New skills section */}
            <SkillsCloud />
          </div>

          {/* Work gallery */}
          <WorkGallery />
        </div>
      </section>
    </>
  );
};

export default App;
