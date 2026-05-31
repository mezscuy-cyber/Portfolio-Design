import { motion } from "framer-motion";
import { Code2, PenTool, Smartphone, Zap } from "lucide-react";

const services = [
  {
    title: "Web Architecture",
    desc: "High-performance, scalable frontend architectures using modern frameworks. React, Next.js, and complex state management.",
    icon: <Code2 size={28} />,
    accent: "primary",
  },
  {
    title: "UI/UX Design",
    desc: "Bold, systematic interface design that breaks conventions while maintaining perfect usability and accessibility.",
    icon: <PenTool size={28} />,
    accent: "secondary",
  },
  {
    title: "Mobile Experiences",
    desc: "Native-feeling progressive web apps and React Native applications that deliver impact in the palm of your hand.",
    icon: <Smartphone size={28} />,
    accent: "primary",
  },
  {
    title: "Creative Coding",
    desc: "Kinetic animations, WebGL, and complex interactions that bring static designs to life with fluid motion.",
    icon: <Zap size={28} />,
    accent: "secondary",
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 sm:py-24 relative glass-section">
      <div className="container mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-6"
        >
          <div>
            <div className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 sm:mb-4">What I Do</div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-none">Services</h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-sm sm:text-base">
            Specialized disciplines designed to elevate your brand from standard to standout.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative p-7 sm:p-10 border border-border/50 glass-card glow-hover overflow-hidden transition-all duration-500 hover:-translate-y-1"
            >
              <div
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out opacity-10 z-0"
                style={{ background: `hsl(var(--${service.accent}))` }}
              />

              <div className="relative z-10">
                <div className={`mb-6 text-muted-foreground group-hover:text-${service.accent} transition-colors duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold uppercase mb-3 sm:mb-4">{service.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8">{service.desc}</p>
                <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
