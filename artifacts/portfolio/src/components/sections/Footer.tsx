import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-3xl font-black tracking-tighter text-foreground uppercase flex items-center gap-1">
            <span className="text-primary">X</span>ENO.
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram size={20} />
            </a>
          </div>
          
          <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            &copy; {new Date().getFullYear()} Xeno Dev. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
