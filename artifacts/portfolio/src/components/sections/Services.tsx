import { motion } from "framer-motion";
import { Code2, PenTool, Smartphone, Zap } from "lucide-react";

export function Services() {
  const services = [
    {
      title: "Web Architecture",
      desc: "High-performance, scalable frontend architectures using modern frameworks. React, Next.js, and complex state management.",
      icon: <Code2 size={32} />,
      color: "group-hover:bg-primary"
    },
    {
      title: "UI/UX Design",
      desc: "Bold, systematic interface design that breaks conventions while maintaining perfect usability and accessibility.",
      icon: <PenTool size={32} />,
      color: "group-hover:bg-secondary"
    },
    {
      title: "Mobile Experiences",
      desc: "Native-feeling progressive web apps and React Native applications that deliver impact in the palm of your hand.",
      icon: <Smartphone size={32} />,
      color: "group-hover:bg-primary"
    },
    {
      title: "Creative Coding",
      desc: "Kinetic animations, WebGL, and complex interactions that bring static designs to life with fluid motion.",
      icon: <Zap size={32} />,
      color: "group-hover:bg-secondary"
    }
  ];

  return (
    <section id="services" className="py-24 bg-card relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="text-primary font-bold uppercase tracking-widest text-sm mb-4">What I Do</div>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none">Services</h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Specialized disciplines designed to elevate your brand from standard to standout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 md:p-12 border border-border bg-background overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_hsl(var(--primary))]"
            >
              {/* Hover Background Fill */}
              <div className={`absolute inset-0 translate-y-[100%] transition-transform duration-500 ease-out group-hover:translate-y-0 ${service.color} opacity-10 z-0`}></div>
              
              <div className="relative z-10">
                <div className="mb-8 text-muted-foreground group-hover:text-foreground transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold uppercase mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-8">
                  {service.desc}
                </p>
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
