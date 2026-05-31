export function Marquee() {
  const items = [
    "WEB DEVELOPMENT",
    "UI/UX DESIGN",
    "CREATIVE DIRECTION",
    "MOTION GRAPHICS",
    "BRAND IDENTITY",
    "FRONTEND ARCHITECTURE",
    "3D RENDERING",
  ];

  // Duplicate items to ensure smooth infinite scroll
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div className="py-8 bg-primary overflow-hidden relative rotate-[-2deg] scale-105 my-20">
      <div className="flex whitespace-nowrap animate-marquee">
        {marqueeItems.map((item, index) => (
          <div key={index} className="flex items-center mx-4">
            <span className="text-primary-foreground text-4xl font-black tracking-tighter uppercase">
              {item}
            </span>
            <span className="mx-8 text-primary-foreground/50">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" fill="currentColor"/>
              </svg>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
