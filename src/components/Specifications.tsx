const specs = [
  { label: "Weight", value: "2.3 lbs" },
  { label: "Dimensions", value: "12\" x 8\" x 3\"" },
  { label: "Material", value: "Military Grade Aluminum" },
  { label: "Operating Temp", value: "-40°F to 140°F" },
  { label: "Battery Life", value: "72+ Hours" },
  { label: "Water Rating", value: "IPX8 Waterproof" },
  { label: "Range", value: "5+ Miles" },
  { label: "Warranty", value: "5 Year Limited" }
];

const Specifications = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Technical <span className="text-tactical-green">Specifications</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Engineered to exceed military standards and professional requirements.
              </p>
            </div>
            
            <div className="space-y-4">
              {specs.map((spec, index) => (
                <div 
                  key={spec.label}
                  className="flex justify-between items-center py-3 px-4 bg-tactical-surface rounded border-l-4 border-tactical-green-dim hover:border-tactical-green transition-colors animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="text-muted-foreground font-medium">
                    {spec.label}
                  </span>
                  <span className="text-foreground font-semibold">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-tactical p-8 rounded-lg border border-tactical-green-dim">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              What's Included
            </h3>
            
            <ul className="space-y-4">
              {[
                "Kinetic Crossfire Unit",
                "Professional Carrying Case",
                "Quick Start Guide",
                "Calibration Tools",
                "Extended Warranty Card"
              ].map((item, index) => (
                <li 
                  key={item}
                  className="flex items-center gap-3 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-2 h-2 bg-tactical-green rounded-full"></div>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specifications;