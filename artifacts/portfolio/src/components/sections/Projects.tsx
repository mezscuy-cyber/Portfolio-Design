import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import p1Img from "../../assets/project1.png";
import p2Img from "../../assets/project2.png";
import p3Img from "../../assets/project3.png";

export function Projects() {
  const projects = [
    {
      title: "Neon Nexus",
      category: "Web Application",
      image: p1Img,
      tags: ["React", "TypeScript", "Tailwind", "Zustand"]
    },
    {
      title: "Vanguard Store",
      category: "E-Commerce",
      image: p2Img,
      tags: ["Next.js", "Shopify", "Framer Motion"]
    },
    {
      title: "Aura Generative",
      category: "Creative Portfolio",
      image: p3Img,
      tags: ["Three.js", "React", "WebGL"]
    }
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <div className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Selected Work</div>
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-none">Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden border border-border mb-6">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-6 scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                    <ArrowUpRight size={24} />
                  </div>
                  <p className="text-sm font-bold tracking-widest uppercase mb-4 text-primary">View Case Study</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs px-3 py-1 bg-card border border-border text-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold uppercase mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-sm uppercase tracking-wider">{project.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-transparent border border-primary text-primary font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
