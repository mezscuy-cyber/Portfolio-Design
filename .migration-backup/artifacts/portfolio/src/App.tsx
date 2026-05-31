import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AnimatedBackground } from "./components/sections/AnimatedBackground";
import { Navbar } from "./components/sections/Navbar";
import { Hero } from "./components/sections/Hero";
import { Marquee } from "./components/sections/Marquee";
import { About } from "./components/sections/About";
import { Services } from "./components/sections/Services";
import { Projects } from "./components/sections/Projects";
import { Tools } from "./components/sections/Tools";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";

function App() {
  return (
    <TooltipProvider>
      <div className="relative min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground font-sans">
        {/* Full-page animated background */}
        <AnimatedBackground />

        {/* Subtle dark green tint overlay */}
        <div className="fixed inset-0 pointer-events-none z-[1]"
          style={{
            background: "linear-gradient(160deg, rgba(5,25,12,0.3) 0%, rgba(3,15,8,0.2) 50%, rgba(6,20,10,0.3) 100%)",
          }}
        />

        {/* Scrollable content sits above background */}
        <div className="relative z-[2]">
          <Navbar />
          <main>
            <Hero />
            <Marquee />
            <About />
            <Services />
            <Projects />
            <Tools />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
