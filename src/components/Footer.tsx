const Footer = () => {
  return (
    <footer className="py-12 bg-tactical-darker border-t border-tactical-green-dim/30">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2 space-y-4">
            <h3 className="text-2xl font-bold text-tactical-green">
              KINETIC CROSSFIRE
            </h3>
            <p className="text-muted-foreground max-w-md">
              Precision-engineered tactical equipment for professionals who demand excellence.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-tactical-green transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-tactical-green transition-colors">Technical Support</a></li>
              <li><a href="#" className="hover:text-tactical-green transition-colors">Warranty</a></li>
              <li><a href="#" className="hover:text-tactical-green transition-colors">Returns</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-tactical-green transition-colors">About</a></li>
              <li><a href="#" className="hover:text-tactical-green transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-tactical-green transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-tactical-green transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-tactical-green-dim/30 text-center text-muted-foreground">
          <p>&copy; 2024 Kinetic Crossfire. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;