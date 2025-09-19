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
              Recreational firearm accessories designed for AR-15 platforms. Made in USA.
            </p>
            <div className="bg-tactical-surface border border-tactical-green-dim/50 rounded p-4 max-w-md">
              <h4 className="font-semibold text-tactical-green text-sm mb-2 uppercase tracking-wide">Important Disclaimer</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This product is a recreational firearm accessory. The user assumes all responsibility for safe use and operation of the firearm and accessories. Kinetic Crossfire assumes no responsibility for misuse. Ensure compliance with all local, state, and federal laws.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Navigation</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/" className="hover:text-tactical-green transition-colors">Home</a></li>
              <li><a href="/videos" className="hover:text-tactical-green transition-colors">Videos</a></li>
              <li><a href="/purchase" className="hover:text-tactical-green transition-colors">Purchase</a></li>
              <li><a href="/contact" className="hover:text-tactical-green transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Follow Us</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a 
                    href="https://www.youtube.com/channel/UCIXCfRaswceIBW404CCfuyQ" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-tactical-green transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    YouTube
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.instagram.com/kinetic_crossfire/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-tactical-green transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Logo */}
            <div className="pt-4">
              <img 
                src="/kinetic-crossfire-logo-full.png" 
                alt="Kinetic Crossfire Logo" 
                className="h-16 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
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