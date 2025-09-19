const images = [
  {
    src: "/1.png",
    alt: "Slide Stock Assist in action",
    link: "https://www.instagram.com/p/DOM4XcMjKyk/"
  },
  {
    src: "/2.png", 
    alt: "Desert landscape with rifle",
    link: "https://www.instagram.com/p/DOKHkMsjyF8/"
  },
  {
    src: "/3.png",
    alt: "Rifle with badlands background",
    link: "https://www.instagram.com/p/DN_pyVlEg6f/"
  },
  {
    src: "/4.png",
    alt: "Shooting range environment",
    link: "https://www.instagram.com/p/DNt5HmzXv75/"
  },
  {
    src: "/5.png",
    alt: "Tactical gear in field",
    link: "https://www.instagram.com/p/DNrQ2im3rdf/"
  },
  {
    src: "/6.png",
    alt: "Outdoor shooting setup",
    link: "https://www.instagram.com/p/DNo6mD_M0Fo/"
  }
];

const Gallery = () => {
  return (
    <section className="py-24 bg-tactical-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground tracking-wider">In The Field</h2>
          <p className="text-muted-foreground mt-3">A look at Slide Stock Assist in its element.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, i) => (
            <a 
              key={i} 
              href={image.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden rounded-lg border border-tactical-green-dim/30 hover:border-tactical-green/60 transition-all group cursor-pointer"
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-tactical-green/90 text-tactical-dark px-4 py-2 rounded-lg font-semibold text-sm">
                  View on Instagram
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;


