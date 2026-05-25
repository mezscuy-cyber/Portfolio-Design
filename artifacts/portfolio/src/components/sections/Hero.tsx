import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import profileImg from "../../assets/profile-nobg.png";
import { SOCIAL_LINKS } from "../../lib/links";
import { ParticleField } from "./ParticleField";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } },
  };

  const socialLinks = [
    { href: SOCIAL_LINKS.github, icon: <Github size={18} />, label: "GitHub" },
    { href: SOCIAL_LINKS.linkedin, icon: <Linkedin size={18} />, label: "LinkedIn" },
    { href: SOCIAL_LINKS.twitter, icon: <Twitter size={18} />, label: "Twitter" },
    { href: SOCIAL_LINKS.instagram, icon: <Instagram size={18} />, label: "Instagram" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center pt-24 overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Text Content ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-primary" />
              <span className="text-primary font-bold uppercase tracking-widest text-sm">Portfolio 2025</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.85] tracking-tighter mb-6"
            >
              Creative <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Developer
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-lg font-light mb-8"
            >
              I craft bold, high-performance digital experiences that leave a lasting impact.
              Unapologetic design meets flawless execution.
            </motion.p>

            <motion.div variants={itemVariants} className="flex gap-3 mb-10">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  data-testid={`link-social-${link.label.toLowerCase()}`}
                  className="w-11 h-11 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-all glass-card"
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-8 pt-8 border-t border-border/40"
            >
              {[
                { num: "08", label: "Years Exp", color: "text-primary" },
                { num: "125", label: "Projects", color: "text-secondary" },
                { num: "40", label: "Awards", color: "text-primary" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className={`text-4xl md:text-5xl font-black text-foreground mb-1`}>
                    {stat.num}<span className={stat.color}>+</span>
                  </div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Profile photo + particles ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="order-1 lg:order-2 relative flex items-center justify-center"
          >
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl scale-110 pointer-events-none" />
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "conic-gradient(from 0deg, hsl(72,100%,50%,0.15), hsl(215,100%,45%,0.1), hsl(72,100%,50%,0.15))",
                animation: "spin 8s linear infinite",
              }}
            />

            {/* Particle canvas wrapper */}
            <div className="relative w-[320px] h-[420px] md:w-[380px] md:h-[490px]">
              {/* Particles behind photo */}
              <ParticleField />

              {/* Profile image — no background */}
              <div className="absolute inset-0 flex items-end justify-center z-10 pointer-events-none">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="h-[95%] w-auto object-contain object-bottom drop-shadow-[0_0_40px_rgba(204,255,0,0.35)]"
                />
              </div>

              {/* Holographic frame border */}
              <div
                className="absolute inset-0 rounded-lg pointer-events-none z-20"
                style={{
                  border: "1px solid rgba(204,255,0,0.2)",
                  boxShadow:
                    "inset 0 0 40px rgba(204,255,0,0.05), 0 0 60px rgba(0,102,255,0.1)",
                  background:
                    "linear-gradient(135deg, rgba(204,255,0,0.04) 0%, rgba(0,102,255,0.04) 100%)",
                }}
              />

              {/* Floating badge — top right */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 glass-card px-3 py-2 z-30 border border-primary/30"
              >
                <span className="text-primary text-xs font-black uppercase tracking-widest">
                  Available
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-primary ml-2 animate-pulse" />
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-4 glass-card px-3 py-2 z-30 border border-secondary/30"
              >
                <span className="text-secondary text-xs font-black uppercase tracking-widest">
                  Full-Stack Dev
                </span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Decorative spinning star */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-16 right-12 text-primary opacity-40 hidden lg:block pointer-events-none"
      >
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
          <path d="M50 0L53.5 46.5L100 50L53.5 53.5L50 100L46.5 53.5L0 50L46.5 46.5L50 0Z" fill="currentColor" />
        </svg>
      </motion.div>
    </section>
  );
}
