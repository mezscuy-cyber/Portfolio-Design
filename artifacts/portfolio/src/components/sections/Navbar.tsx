import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Tools", href: "#tools" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3 border-b border-primary/10"
            : "py-5 bg-transparent"
        }`}
        style={isScrolled ? {
          background: "rgba(4,10,6,0.9)",
          backdropFilter: "blur(20px)",
        } : {}}
      >
        <div className="container mx-auto px-5 flex items-center justify-between">
          <button
            onClick={() => scrollTo("#home")}
            className="text-xl sm:text-2xl font-black tracking-tighter text-foreground uppercase flex items-center gap-1 z-50 relative glow-hover"
          >
            <span className="text-primary">X</span>ENO.
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors tracking-widest uppercase relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="px-5 py-2 bg-primary text-primary-foreground text-xs font-black uppercase tracking-wider glow-hover"
            >
              Hire Me
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden z-50 relative flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-0.5 bg-primary origin-center"
            />
            <motion.span
              animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-0.5 bg-foreground origin-center"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-0.5 bg-foreground origin-center"
            />
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center px-8"
            style={{ background: "rgba(3,12,6,0.97)", backdropFilter: "blur(24px)" }}
          >
            {/* Subtle green glow orb */}
            <div
              className="absolute top-1/4 right-0 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(50,180,90,0.08) 0%, transparent 70%)" }}
            />

            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60 }}
                  transition={{ delay: i * 0.06 + 0.15, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => scrollTo(link.href)}
                  className="group text-left py-4 border-b border-primary/10 flex items-center justify-between"
                >
                  <span className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-foreground group-hover:text-primary transition-colors duration-200">
                    {link.name}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    0{i + 1}
                  </span>
                </motion.button>
              ))}
            </nav>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
              onClick={() => scrollTo("#contact")}
              className="mt-10 py-4 bg-primary text-primary-foreground text-base font-black uppercase tracking-widest glow-hover"
            >
              Hire Me
            </motion.button>

            {/* Social row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex gap-6 text-xs text-muted-foreground font-mono tracking-widest"
            >
              <span>GitHub</span>
              <span>LinkedIn</span>
              <span>Twitter</span>
              <span>Instagram</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
