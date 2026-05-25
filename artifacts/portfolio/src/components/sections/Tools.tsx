import { motion } from "framer-motion";
import { SiReact, SiTypescript, SiFigma, SiNodedotjs, SiNextdotjs, SiTailwindcss, SiFramer, SiVite } from "react-icons/si";

export function Tools() {
  const tools = [
    { name: "React", icon: <SiReact size={48} /> },
    { name: "TypeScript", icon: <SiTypescript size={48} /> },
    { name: "Figma", icon: <SiFigma size={48} /> },
    { name: "Node.js", icon: <SiNodedotjs size={48} /> },
    { name: "Next.js", icon: <SiNextdotjs size={48} /> },
    { name: "Tailwind", icon: <SiTailwindcss size={48} /> },
    { name: "Framer", icon: <SiFramer size={48} /> },
    { name: "Vite", icon: <SiVite size={48} /> },
  ];

  return (
    <section id="tools" className="py-24 glass-section">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-black uppercase mb-16">The Arsenal</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center justify-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              {tool.icon}
              <span className="text-xs font-bold uppercase tracking-widest">{tool.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
