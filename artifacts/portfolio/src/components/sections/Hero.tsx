import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import profileImg from "../../assets/profile-nobg.png";
import { SOCIAL_LINKS } from "../../lib/links";
import { ParticleField } from "./ParticleField";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 14 } },
};

export function Hero() {
  const socialLinks = [
    { href: SOCIAL_LINKS.github, icon: <Github size={16} />, label: "GitHub" },
    { href: SOCIAL_LINKS.linkedin, icon: <Linkedin size={16} />, label: "LinkedIn" },
    { href: SOCIAL_LINKS.twitter, icon: <Twitter size={16} />, label: "Twitter" },
    { href: SOCIAL_LINKS.instagram, icon: <Instagram size={16} />, label: "Instagram" },
  ];

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center pt-20 sm:pt-24 overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left — text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            <motion.div variants={item} className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-primary" />
              <span className="text-primary font-bold uppercase tracking-widest text-xs">Portfolio 2025</span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.88] tracking-tighter mb-5"
            >
              Creative <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Developer
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-base sm:text-lg text-muted-foreground max-w-lg font-light mb-7"
            >
              I craft bold, high-performance digital experiences that leave a lasting impact.
              Unapologetic design meets flawless execution.
            </motion.p>

            <motion.div variants={item} className="flex gap-2 sm:gap-3 mb-8">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-all glass-card glow-hover"
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>

            <motion.div
              variants={item}
              className="flex flex-wrap gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-border/40"
            >
              {[
                { num: "08", label: "Years Exp", color: "text-primary" },
                { num: "125", label: "Projects", color: "text-secondary" },
                { num: "40", label: "Awards", color: "text-primary" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-1">
                    {stat.num}<span className={stat.color}>+</span>
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — photo + geometric grid particles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="order-1 lg:order-2 relative flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full bg-primary/8 blur-3xl scale-110 pointer-events-none" />

            <div className="relative w-[260px] h-[340px] sm:w-[300px] sm:h-[390px] md:w-[350px] md:h-[450px] lg:w-[360px] lg:h-[470px]">
              <ParticleField />

              <div className="absolute inset-0 flex items-end justify-center z-10 pointer-events-none">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="h-[95%] w-auto object-contain object-bottom"
                  style={{ filter: "drop-shadow(0 0 30px rgba(50,180,90,0.3))" }}
                  loading="eager"
                />
              </div>

              {/* Frame border */}
              <div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                  border: "1px solid rgba(50,180,90,0.2)",
                  boxShadow: "inset 0 0 30px rgba(50,180,90,0.04), 0 0 50px rgba(30,120,60,0.08)",
                }}
              />

              {/* Badge top-right */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-2 sm:-right-4 glass-card px-3 py-2 z-30 border border-primary/30"
              >
                <span className="text-primary text-xs font-black uppercase tracking-widest">Available</span>
                <span className="inline-block w-2 h-2 rounded-full bg-primary ml-2 animate-pulse" />
              </motion.div>

              {/* Badge bottom-left */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-2 sm:-left-4 glass-card px-3 py-2 z-30 border border-secondary/30"
              >
                <span className="text-secondary text-xs font-black uppercase tracking-widest">Full-Stack Dev</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative spinning star — desktop only */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-16 right-12 text-primary opacity-30 hidden lg:block pointer-events-none"
      >
        <svg width="64" height="64" viewBox="0 0 100 100" fill="none">
          <path d="M50 0L53.5 46.5L100 50L53.5 53.5L50 100L46.5 53.5L0 50L46.5 46.5L50 0Z" fill="currentColor" />
        </svg>
      </motion.div>
    </section>
  );
}
