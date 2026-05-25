import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import heroImg from "../../assets/hero.png";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } },
  };

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center pt-24 overflow-hidden">
      {/* Background visual element */}
      <div className="absolute top-0 right-0 w-[50vw] h-[100dvh] opacity-30 md:opacity-50 z-0">
         <img src={heroImg} alt="Abstract Neon" className="w-full h-full object-cover object-left mask-image-gradient-left" style={{ maskImage: 'linear-gradient(to right, transparent, black)', WebkitMaskImage: 'linear-gradient(to right, transparent, black)' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-primary"></div>
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Portfolio 2024</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tighter mb-8">
            Creative <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Developer</span>
          </motion.h1>

          <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-8 md:items-end mb-12">
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl font-light">
              I craft bold, high-performance digital experiences that leave a lasting impact. Unapologetic design meets flawless execution.
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-all rounded-full">
                <Github size={20} />
              </a>
              <a href="#" className="w-12 h-12 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-all rounded-full">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-12 h-12 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-all rounded-full">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-12 h-12 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-all rounded-full">
                <Instagram size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-8 lg:gap-16 pt-8 border-t border-border/50">
            <div>
              <div className="text-5xl font-black text-foreground mb-2">08<span className="text-primary">+</span></div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Years Exp</div>
            </div>
            <div>
              <div className="text-5xl font-black text-foreground mb-2">125<span className="text-secondary">+</span></div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Projects</div>
            </div>
            <div>
              <div className="text-5xl font-black text-foreground mb-2">40<span className="text-primary">+</span></div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Awards</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative Star */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 right-20 text-primary opacity-50 hidden md:block"
      >
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0L53.5 46.5L100 50L53.5 53.5L50 100L46.5 53.5L0 50L46.5 46.5L50 0Z" fill="currentColor"/>
        </svg>
      </motion.div>
    </section>
  );
}
