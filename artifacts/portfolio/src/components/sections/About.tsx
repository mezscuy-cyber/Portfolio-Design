import { motion } from "framer-motion";
import aboutImg from "../../assets/about.png";

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full z-0"></div>
            <div className="relative z-10 aspect-[3/4] overflow-hidden border border-border bg-card">
              <img src={aboutImg} alt="Portrait" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-secondary rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite] z-20 bg-background">
              <svg viewBox="0 0 100 100" className="w-40 h-40">
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                <text className="text-[10px] font-bold uppercase tracking-widest" fill="currentColor">
                  <textPath href="#circlePath" startOffset="0%">
                    Always Creating. Always Pushing Boundaries. 
                  </textPath>
                </text>
              </svg>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full"></div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7"
          >
            <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 leading-none">
              Not Your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Average</span> Dev.
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground font-light mb-10">
              <p>
                I bridge the gap between aggressive, boundary-pushing design and flawless technical execution. My work isn't just about writing code—it's about creating digital experiences that demand attention.
              </p>
              <p>
                With a background in both visual design and systems architecture, I approach every project holistically. I believe interfaces should be fast, accessible, and unapologetically bold.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 border border-border bg-card">
                <h3 className="text-primary font-bold mb-2">Relentless Quality</h3>
                <p className="text-sm text-muted-foreground">Every pixel, every animation, every line of code matters.</p>
              </div>
              <div className="p-6 border border-border bg-card">
                <h3 className="text-secondary font-bold mb-2">Systems Thinker</h3>
                <p className="text-sm text-muted-foreground">Building scalable foundations for creative expressions.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
