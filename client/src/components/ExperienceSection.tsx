/* ============================================================
   DESIGN: "Collision Event" — Experience Section
   Horizontal sliding cards with timeline connector
   ============================================================ */

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    id: 1,
    role: "Research Associate",
    org: "Brookhaven National Laboratory",
    location: "Ridge, NY",
    period: "Apr 2025 – Present",
    color: "#f5c842",
    accent: "rgba(245, 200, 66, 0.1)",
    border: "rgba(245, 200, 66, 0.25)",
    tag: "Current",
    bullets: [
      "Designed and deployed AI/ML models (RAG frameworks), executing appropriate tests to ensure they work as designed and meet operational efficiency standards.",
      "Developed advanced data analysis pipelines for high-throughput experiments, researching and analyzing complex data to derive actionable facts and monitor data quality.",
      "Collaborated closely with cross-functional teams, model developers, and end-users to ensure effective model governance, system reliability, and scalability.",
      "Expanded computing infrastructure (oVirt, GlusterFS) to support large-scale statistical operations and model monitoring.",
    ],
    skills: ["RAG Frameworks", "AI/ML", "oVirt", "GlusterFS", "Data Pipelines"],
  },
  {
    id: 2,
    role: "Postdoctoral Research Associate",
    org: "University of Tennessee",
    location: "Knoxville, TN",
    period: "Aug 2023 – Feb 2025",
    color: "#4d9fff",
    accent: "rgba(77, 159, 255, 0.08)",
    border: "rgba(77, 159, 255, 0.25)",
    tag: "Postdoc",
    bullets: [
      "Validated and implemented complex machine learning models (attention-based neural networks) for multi-jet event searches, critically evaluating their conceptual soundness.",
      "Applied advanced statistical testing techniques and data-driven ML approaches to rare-event detection, successfully challenging model assumptions to improve predictive performance.",
      "Scaled quantitative analysis workflows using distributed computing (HTCondor, Slurm), ensuring models performed as expected under high-stress computational environments.",
      "Communicated complex quantitative methodologies and model results effectively through peer-reviewed publications.",
    ],
    skills: ["Attention Networks", "HTCondor", "Slurm", "Statistical Testing", "Rare-Event Detection"],
  },
  {
    id: 3,
    role: "Graduate Research Associate",
    org: "CMS, CERN & Baylor University",
    location: "Geneva, Switzerland / Waco, TX",
    period: "Aug 2017 – Aug 2023",
    color: "#a78bfa",
    accent: "rgba(167, 139, 250, 0.08)",
    border: "rgba(167, 139, 250, 0.25)",
    tag: "PhD",
    bullets: [
      "Evaluated the conceptual soundness of statistical models and evaluated alternative theories (e.g., Supersymmetry) against the Standard Model to validate high-energy physics datasets.",
      "Executed rigorous model validation using Bayesian and frequentist statistical approaches, performing hypothesis testing and uncertainty quantification.",
      "Designed GNNs for predictive modeling, designing and executing appropriate tests that improved energy prediction accuracy by 10%.",
      "Worked collaboratively with international research teams to coordinate Phase II CMS software development.",
      "Researched and analyzed multi-billion-dollar datasets using Python and C++ to derive facts, developing robust pipelines for high-throughput quantitative analysis.",
    ],
    skills: ["GNNs", "Bayesian Statistics", "Python", "C++", "CERN Grid", "SUSY Searches"],
  },
];

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function ExperienceSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollTo = (idx: number) => {
    setActiveIdx(idx);
    if (sliderRef.current) {
      const card = sliderRef.current.children[idx] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  };

  const prev = () => scrollTo(Math.max(0, activeIdx - 1));
  const next = () => scrollTo(Math.min(experiences.length - 1, activeIdx + 1));

  return (
    <section
      id="experience"
      className="py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050d1a 0%, #070f1e 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection>
          <div className="mb-12">
            <span className="section-label">// 02 — experience</span>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "#e8edf5",
                lineHeight: 1,
                marginTop: "8px",
              }}
            >
              WORK
              <br />
              <span style={{ color: "#f5c842" }}>EXPERIENCE</span>
            </h2>
            <div
              className="h-0.5 w-16 mt-4"
              style={{ background: "linear-gradient(90deg, #f5c842, transparent)" }}
            />
          </div>
        </AnimatedSection>

        {/* Navigation controls */}
        <AnimatedSection delay={0.1}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              {experiences.map((exp, i) => (
                <button
                  key={exp.id}
                  onClick={() => scrollTo(i)}
                  className="px-3 py-1.5 rounded text-xs transition-all duration-200"
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    background: activeIdx === i ? exp.color : "rgba(255,255,255,0.05)",
                    color: activeIdx === i ? "#050d1a" : "rgba(232, 237, 245, 0.5)",
                    border: `1px solid ${activeIdx === i ? exp.color : "rgba(255,255,255,0.1)"}`,
                    fontWeight: activeIdx === i ? 700 : 400,
                  }}
                >
                  {exp.tag}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                disabled={activeIdx === 0}
                className="p-2 rounded transition-all duration-200 disabled:opacity-30"
                style={{
                  border: "1px solid rgba(245, 200, 66, 0.3)",
                  color: "#f5c842",
                  background: "transparent",
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                disabled={activeIdx === experiences.length - 1}
                className="p-2 rounded transition-all duration-200 disabled:opacity-30"
                style={{
                  border: "1px solid rgba(245, 200, 66, 0.3)",
                  color: "#f5c842",
                  background: "transparent",
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Horizontal slider */}
        <AnimatedSection delay={0.2}>
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto pb-4"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(245,200,66,0.3) transparent",
            }}
          >
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                onClick={() => setActiveIdx(i)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 rounded-xl p-6 cursor-pointer transition-all duration-300"
                style={{
                  width: "min(520px, 85vw)",
                  scrollSnapAlign: "start",
                  background: activeIdx === i ? exp.accent : "rgba(255,255,255,0.02)",
                  border: `1px solid ${activeIdx === i ? exp.border : "rgba(255,255,255,0.06)"}`,
                  boxShadow: activeIdx === i
                    ? `0 0 30px ${exp.color}15, inset 0 0 30px ${exp.color}05`
                    : "none",
                }}
              >
                {/* Card header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span
                      className="inline-block px-2 py-0.5 rounded text-xs mb-2"
                      style={{
                        fontFamily: "'Fira Code', monospace",
                        background: `${exp.color}20`,
                        color: exp.color,
                        border: `1px solid ${exp.color}40`,
                      }}
                    >
                      {exp.tag}
                    </span>
                    <h3
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        color: "#e8edf5",
                        lineHeight: 1.3,
                      }}
                    >
                      {exp.role}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.9rem",
                        color: exp.color,
                        fontWeight: 600,
                        marginTop: "4px",
                      }}
                    >
                      {exp.org}
                    </p>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <span
                    className="flex items-center gap-1.5 text-xs"
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      color: "rgba(232, 237, 245, 0.45)",
                    }}
                  >
                    <Calendar size={11} />
                    {exp.period}
                  </span>
                  <span
                    className="flex items-center gap-1.5 text-xs"
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      color: "rgba(232, 237, 245, 0.45)",
                    }}
                  >
                    <MapPin size={11} />
                    {exp.location}
                  </span>
                </div>

                {/* Divider */}
                <div
                  className="h-px mb-4"
                  style={{
                    background: `linear-gradient(90deg, ${exp.color}40, transparent)`,
                  }}
                />

                {/* Bullets */}
                <ul className="space-y-2.5 mb-5">
                  {exp.bullets.map((b, bi) => (
                    <li
                      key={bi}
                      className="flex gap-2.5 text-sm"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        color: "rgba(232, 237, 245, 0.7)",
                        lineHeight: 1.6,
                      }}
                    >
                      <span
                        className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                        style={{ background: exp.color, opacity: 0.8 }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-xs"
                      style={{
                        fontFamily: "'Fira Code', monospace",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(232, 237, 245, 0.55)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {experiences.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: activeIdx === i ? "24px" : "8px",
                height: "8px",
                background: activeIdx === i ? "#f5c842" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
