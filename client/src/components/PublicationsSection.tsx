/* ============================================================
   DESIGN: "Collision Event" — Publications & Conferences Section
   Horizontal sliding publication cards + conference list
   ============================================================ */

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Mic, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

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

const publications = [
  {
    id: 1,
    title: "Combined search for electroweak production of winos, binos, higgsinos, and sleptons in proton-proton collisions at √s = 13 TeV",
    journal: "Physical Review D (Submitted)",
    arxiv: "arXiv:2402.01888",
    year: "Feb 2024",
    link: "https://arxiv.org/abs/2402.01888",
    type: "Journal Article",
    color: "#f5c842",
  },
  {
    id: 2,
    title: "Search for electroweak production of charginos and neutralinos at √s = 13 TeV in final states containing hadronic decays of WW, WZ, or WH and missing transverse momentum",
    journal: "Physics Letters B",
    arxiv: "arXiv:2205.09597",
    year: "July 2023",
    link: "https://arxiv.org/abs/2205.09597",
    type: "Journal Article",
    color: "#4d9fff",
  },
  {
    id: 3,
    title: "Searches for supersymmetry in hadronic and photonic final states with the CMS experiment",
    journal: "ICHEP 2022 Conference Report",
    arxiv: "CMS-CR-2022-147",
    year: "Sept 2022",
    link: "#",
    type: "Conference Report",
    color: "#a78bfa",
  },
  {
    id: 4,
    title: "Search for electroweak production of charginos and neutralinos in all hadronic final states at the CMS experiment",
    journal: "Moriond 2022 EW Conference Report",
    arxiv: "arXiv:2205.15711",
    year: "May 2022",
    link: "https://arxiv.org/abs/2205.15711",
    type: "Conference Report",
    color: "#34d399",
  },
  {
    id: 5,
    title: "Reconstruction and Charge ID efficiency of a muon",
    journal: "IIT Madras Summer Project Report",
    arxiv: "",
    year: "July 2015",
    link: "#",
    type: "Technical Report",
    color: "#ff6b6b",
  },
];

const conferences = [
  {
    name: "TSAPS Fall Meeting",
    location: "Houston, TX",
    year: "Oct 2022",
    talk: "Search for production of charginos and neutralinos in hadronic final states with the CMS experiment",
  },
  {
    name: "ICHEP 2022",
    location: "Bologna, Italy",
    year: "June 2022",
    talk: "Searches for supersymmetry in hadronic and photonic final states with the CMS experiment",
  },
  {
    name: "Rencontres de Moriond",
    location: "La Thuile, Italy",
    year: "March 2022",
    talk: "Search for electroweak production of charginos and neutralinos in hadronic final states",
  },
  {
    name: "CMS Week Plenary Talk",
    location: "CERN",
    year: "Sept 2021",
    talk: "EWK SUSY production in W+X hadronic final states",
  },
  {
    name: "APS 2021",
    location: "Virtual",
    year: "April 2021",
    talk: "Search for electroweak production of charginos and neutralinos in hadronic WH, WZ, and WW final states",
  },
  {
    name: "CMSDAS",
    location: "Fermilab, Chicago",
    year: "Jan 2018",
    talk: "CMS Data Analysis School",
  },
];

export default function PublicationsSection() {
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
  const next = () => scrollTo(Math.min(publications.length - 1, activeIdx + 1));

  return (
    <section
      id="publications"
      className="py-24 overflow-hidden"
      style={{ background: "#070f1e" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection>
          <div className="mb-12">
            <span className="section-label">// 05 — publications</span>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "#e8edf5",
                lineHeight: 1,
                marginTop: "8px",
              }}
            >
              PUBLICATIONS
              <br />
              <span style={{ color: "#4d9fff" }}>& CONFERENCES</span>
            </h2>
            <div
              className="h-0.5 w-16 mt-4"
              style={{ background: "linear-gradient(90deg, #4d9fff, transparent)" }}
            />
          </div>
        </AnimatedSection>

        {/* Publications slider */}
        <AnimatedSection delay={0.1}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen size={16} style={{ color: "#f5c842" }} />
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.3rem",
                  color: "#e8edf5",
                  letterSpacing: "0.05em",
                }}
              >
                Publications & Reports
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                disabled={activeIdx === 0}
                className="p-2 rounded transition-all duration-200 disabled:opacity-30"
                style={{ border: "1px solid rgba(245, 200, 66, 0.3)", color: "#f5c842" }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                disabled={activeIdx === publications.length - 1}
                className="p-2 rounded transition-all duration-200 disabled:opacity-30"
                style={{ border: "1px solid rgba(245, 200, 66, 0.3)", color: "#f5c842" }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto pb-4 mb-4"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(77,159,255,0.3) transparent",
            }}
          >
            {publications.map((pub, i) => (
              <motion.div
                key={pub.id}
                onClick={() => setActiveIdx(i)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 rounded-xl p-5 cursor-pointer"
                style={{
                  width: "min(400px, 82vw)",
                  scrollSnapAlign: "start",
                  background: activeIdx === i
                    ? `${pub.color}08`
                    : "rgba(255,255,255,0.02)",
                  border: `1px solid ${activeIdx === i ? pub.color + "30" : "rgba(255,255,255,0.06)"}`,
                  borderTop: `2px solid ${pub.color}`,
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <span
                    className="px-2 py-0.5 rounded text-xs"
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      background: `${pub.color}15`,
                      color: pub.color,
                      border: `1px solid ${pub.color}30`,
                    }}
                  >
                    {pub.type}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: "0.7rem",
                      color: "rgba(232, 237, 245, 0.35)",
                    }}
                  >
                    {pub.year}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: "#e8edf5",
                    lineHeight: 1.5,
                    marginBottom: "10px",
                  }}
                >
                  {pub.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    color: pub.color,
                    marginBottom: "8px",
                    fontWeight: 500,
                  }}
                >
                  {pub.journal}
                </p>

                {pub.arxiv && (
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        fontFamily: "'Fira Code', monospace",
                        fontSize: "0.7rem",
                        color: "rgba(232, 237, 245, 0.35)",
                      }}
                    >
                      {pub.arxiv}
                    </span>
                    {pub.link !== "#" && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-xs transition-colors"
                        style={{ color: pub.color, opacity: 0.7 }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.opacity = "1";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.opacity = "0.7";
                        }}
                      >
                        <ExternalLink size={11} />
                        arXiv
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mb-12">
            {publications.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: activeIdx === i ? "20px" : "7px",
                  height: "7px",
                  background: activeIdx === i ? "#4d9fff" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </AnimatedSection>

        {/* Conferences */}
        <AnimatedSection delay={0.3}>
          <div className="flex items-center gap-2 mb-6">
            <Mic size={16} style={{ color: "#a78bfa" }} />
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.3rem",
                color: "#e8edf5",
                letterSpacing: "0.05em",
              }}
            >
              Conference Presentations
            </span>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {conferences.map((conf, i) => (
            <AnimatedSection key={conf.name + conf.year} delay={0.35 + i * 0.05}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="p-4 rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(167, 139, 250, 0.12)",
                  borderLeft: "2px solid rgba(167, 139, 250, 0.5)",
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      color: "#a78bfa",
                    }}
                  >
                    {conf.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: "0.65rem",
                      color: "rgba(232, 237, 245, 0.35)",
                      flexShrink: 0,
                      marginLeft: "8px",
                    }}
                  >
                    {conf.year}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    fontSize: "0.68rem",
                    color: "rgba(232, 237, 245, 0.4)",
                    marginBottom: "6px",
                  }}
                >
                  {conf.location}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.78rem",
                    color: "rgba(232, 237, 245, 0.6)",
                    lineHeight: 1.5,
                  }}
                >
                  {conf.talk}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
