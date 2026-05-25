import { motion } from "framer-motion";
import aboutImg from "../../assets/about.png";

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function About() {
  return (
    <section id="about" className="py-20 sm:py-24 relative glass-section">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute -inset-4 bg-primary/15 blur-2xl rounded-full z-0" />
            <div className="relative z-10 aspect-[3/4] overflow-hidden border border-border/50 bg-card">
              <img
                src={aboutImg}
                alt="Portrait"
                loading="lazy"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-36 h-36 sm:w-48 sm:h-48 border border-secondary/50 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite] z-20 bg-background">
              <svg viewBox="0 0 100 100" className="w-28 h-28 sm:w-40 sm:h-40">
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                <text className="text-[10px] font-bold uppercase tracking-widest" fill="currentColor">
                  <textPath href="#circlePath" startOffset="0%">
                    Always Creating. Always Pushing Boundaries.{" "}
                  </textPath>
                </text>
              </svg>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-primary rounded-full" />
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-7"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase mb-6 sm:mb-8 leading-none">
              Not Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Average</span> Dev.
            </h2>

            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground font-light mb-8 sm:mb-10">
              <p>
                I bridge the gap between aggressive, boundary-pushing design and flawless technical execution.
                My work isn't just about writing code — it's about creating digital experiences that demand attention.
              </p>
              <p>
                With a background in both visual design and systems architecture, I approach every project
                holistically. I believe interfaces should be fast, accessible, and unapologetically bold.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { title: "Relentless Quality", desc: "Every pixel, every animation, every line of code matters.", color: "text-primary", border: "border-primary/20" },
                { title: "Systems Thinker", desc: "Building scalable foundations for creative expressions.", color: "text-secondary", border: "border-secondary/20" },
              ].map((card) => (
                <div key={card.title} className={`p-5 sm:p-6 border ${card.border} glass-card glow-hover`}>
                  <h3 className={`${card.color} font-bold mb-2`}>{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
