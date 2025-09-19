import categoryPrimary from "@/assets/category-primary.jpg";
import categoryAccessories from "@/assets/category-accessories.jpg";
import categorySupport from "@/assets/category-support.jpg";

const features = [
  {
    title: "NO TOOLS",
    subtitle: "REQUIRED",
    image: categoryPrimary,
    alt: "Easy Installation",
    description: "Simple attachment to your Slide Fire SSAR-15 SBS Stock with no modifications or special tools needed."
  },
  {
    title: "RAPID",
    subtitle: "FOLLOW-UP SHOTS",
    image: categoryAccessories,
    alt: "Rapid Fire Capability",
    description: "Enables extremely rapid, consistent follow-up shots for enhanced performance and control."
  },
  {
    title: "MIL-SPEC",
    subtitle: "COMPATIBLE",
    image: categorySupport,
    alt: "Military Specification",
    description: "Designed to function with all mil-spec AR-15 parts. Made in USA with quality materials."
  }
];

const CategorySection = () => {
  return (
    <section className="py-24 bg-tactical-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 tracking-wider">
            KEY FEATURES
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The Slide Stock Assist delivers superior performance with simple installation
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="relative group overflow-hidden rounded-lg animate-fade-in-up bg-tactical-surface border border-tactical-green-dim/30 hover:border-tactical-green/50 transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Background Image */}
              <div className="aspect-[4/3] relative">
                <img
                  src={feature.image}
                  alt={feature.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Green diagonal overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-tactical-green/10 via-transparent to-tactical-green/20"></div>
                <div className="absolute inset-0 bg-tactical-dark/60 group-hover:bg-tactical-dark/40 transition-colors duration-300"></div>
                
                {/* Diagonal green stripe */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-0 left-0 w-1/4 h-full bg-tactical-green transform -skew-x-12 origin-top-left opacity-60"></div>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center p-6">
                <div className="text-center z-10">
                  <h3 className="text-2xl font-bold text-foreground mb-1 tracking-wider">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-tactical-green font-semibold tracking-wide mb-4">
                    {feature.subtitle}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;