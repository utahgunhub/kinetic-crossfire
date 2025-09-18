import { Shield, Zap, Target, Lock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Military Grade",
    description: "Built to withstand extreme conditions and rigorous field use."
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "Advanced technology delivering superior results every time."
  },
  {
    icon: Target,
    title: "Precision Engineered",
    description: "Manufactured to exact specifications for professional use."
  },
  {
    icon: Lock,
    title: "Secure & Reliable",
    description: "Trusted by professionals worldwide for critical operations."
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-tactical-surface">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Professional Grade <span className="text-tactical-green">Performance</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every component is engineered for excellence, tested under extreme conditions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-card p-8 rounded-lg border border-border hover:border-tactical-green-dim transition-all duration-300 group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-tactical-green/10 rounded-lg flex items-center justify-center group-hover:bg-tactical-green/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-tactical-green" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;