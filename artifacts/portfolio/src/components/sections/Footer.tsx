import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { SOCIAL_LINKS, NAV_LINKS } from "../../lib/links";

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="py-12 glass-section">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <button
              onClick={() => scrollToSection("#home")}
              data-testid="link-footer-logo"
              className="text-3xl font-black tracking-tighter text-foreground uppercase flex items-center gap-1 hover:text-primary transition-colors"
            >
              <span className="text-primary">X</span>ENO.
            </button>

            <nav className="flex flex-wrap gap-x-8 gap-y-3">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  data-testid={`link-footer-nav-${link.name.toLowerCase()}`}
                  className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
                >
                  {link.name}
                </button>
              ))}
            </nav>

            <div className="flex gap-5">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                data-testid="link-footer-github"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                data-testid="link-footer-linkedin"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                data-testid="link-footer-twitter"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                data-testid="link-footer-instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              &copy; {new Date().getFullYear()} Xeno Dev. All Rights Reserved.
            </div>
            <a
              href={SOCIAL_LINKS.email}
              data-testid="link-footer-email"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              hello@xeno.dev
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
