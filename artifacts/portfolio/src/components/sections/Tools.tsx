import { motion } from "framer-motion";
import { SiReact, SiTypescript, SiFigma, SiNodedotjs, SiNextdotjs, SiTailwindcss, SiFramer, SiVite } from "react-icons/si";

const tools = [
  { name: "React", icon: SiReact },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Figma", icon: SiFigma },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Framer", icon: SiFramer },
  { name: "Vite", icon: SiVite },
];

export function Tools() {
  return (
    <section id="tools" className="py-20 sm:py-24 glass-section">
      <div className="container mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-3">Tech Stack</div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase">The Arsenal</h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 sm:gap-8">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.05 }}
                className="flex flex-col items-center justify-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer group glow-hover p-4"
              >
                <Icon size={36} className="sm:w-12 sm:h-12 transition-colors duration-300" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">{tool.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
