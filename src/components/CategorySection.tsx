import categoryPrimary from "@/assets/category-primary.jpg";
import categoryAccessories from "@/assets/category-accessories.jpg";
import categorySupport from "@/assets/category-support.jpg";

const categories = [
  {
    title: "PRIMARY",
    subtitle: "SYSTEMS",
    image: categoryPrimary,
    alt: "Primary Systems"
  },
  {
    title: "TACTICAL",
    subtitle: "ACCESSORIES",
    image: categoryAccessories,
    alt: "Tactical Accessories"
  },
  {
    title: "SUPPORT",
    subtitle: "EQUIPMENT",
    image: categorySupport,
    alt: "Support Equipment"
  }
];

const CategorySection = () => {
  return (
    <section className="py-24 bg-tactical-dark">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-foreground mb-16 tracking-wider">
          SHOP BY CATEGORY
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div 
              key={category.title}
              className="relative group cursor-pointer overflow-hidden rounded-lg animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Background Image */}
              <div className="aspect-[4/3] relative">
                <img
                  src={category.image}
                  alt={category.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Green diagonal overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-tactical-green/20 via-transparent to-tactical-green/40"></div>
                <div className="absolute inset-0 bg-tactical-dark/40 group-hover:bg-tactical-dark/20 transition-colors duration-300"></div>
                
                {/* Diagonal green stripe */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-0 left-0 w-1/3 h-full bg-tactical-green transform -skew-x-12 origin-top-left opacity-80"></div>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center z-10">
                  <h3 className="text-3xl font-bold text-foreground mb-2 tracking-wider">
                    {category.title}
                  </h3>
                  <p className="text-lg text-tactical-green font-semibold tracking-wide">
                    {category.subtitle}
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