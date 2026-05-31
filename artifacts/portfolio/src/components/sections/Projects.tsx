import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import p1Img from "../../assets/project1.png";
import p2Img from "../../assets/project2.png";
import p3Img from "../../assets/project3.png";

const projects = [
  {
    title: "Neon Nexus",
    category: "Web Application",
    image: p1Img,
    tags: ["React", "TypeScript", "Tailwind", "Zustand"],
    url: "https://github.com/xenodev/neon-nexus",
  },
  {
    title: "Vanguard Store",
    category: "E-Commerce",
    image: p2Img,
    tags: ["Next.js", "Shopify", "Framer Motion"],
    url: "https://github.com/xenodev/vanguard-store",
  },
  {
    title: "Aura Generative",
    category: "Creative Portfolio",
    image: p3Img,
    tags: ["Three.js", "React", "WebGL"],
    url: "https://github.com/xenodev/aura-generative",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-24 relative glass-section">
      <div className="container mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <div className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 sm:mb-4">Selected Work</div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-none">Projects</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`link-project-${index}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-pointer block glow-hover"
            >
              <div className="relative aspect-[4/5] overflow-hidden border border-border/50 mb-4 sm:mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-background/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-5 text-center backdrop-blur-sm">
                  <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-5 scale-0 group-hover:scale-100 transition-transform duration-400 delay-75">
                    <ArrowUpRight size={20} />
                  </div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-3 text-primary">View Case Study</p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 bg-card border border-border/50 text-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase mb-1 group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider">{project.category}</p>
                </div>
                <ArrowUpRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <a
            href="https://github.com/xenodev"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-all-projects"
            className="inline-block px-7 py-3.5 sm:px-8 sm:py-4 border border-primary text-primary text-sm font-bold uppercase tracking-widest glow-hover hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
          >
            View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
}
