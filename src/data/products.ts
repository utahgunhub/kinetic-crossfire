import { applySalePricing } from "@/lib/sale";

export type ProductCategory = "thompson" | "ar" | "apparel";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  description: string;
  detailedDescription: string;
  images: Array<{
    src: string;
    alt: string;
  }>;
  features: string[];
  compatibility?: {
    compatibleWith: string[];
    usageNotes: string[];
  };
  specifications?: {
    [key: string]: string;
  };
  manufacturer?: string;
  isKineticCrossfireProduct: boolean;
  inStock?: boolean;
  importantNotice?: string;
}

export const products: Product[] = [
  {
    id: "thompson-blow-back-trigger",
    name: "Thompson Blow-Back Trigger",
    category: "thompson",
    price: 275.00,
    description: "Forced reset trigger system for Thompson carbines and pistols with free shipping included.",
    detailedDescription: "The Thompson Blow-Back Trigger is an FRT designed for Thompson carbines and pistols. It delivers a blistering rate of fire true to the original Thompson submachine gun thanks to a smoothly integrated forced reset trigger principle. Made in the USA, the parts are machined from an extremely robust and durable steel alloy built for rapid fire and high heat environments. Installation is simple and straightforward with minimal tools, but fitment may require a gunsmith. Turn your Thompson into the gun it was meant to be.",
    images: [
      { src: "/thompson-frt/new-product-image.webp", alt: "Thompson Blow-Back Trigger - Main Product View" },
      { src: "/thompson-frt/thompson-gun-2.webp", alt: "Thompson Blow-Back Trigger - Thompson Side View" },
      { src: "/thompson-frt/thompson-gun-3.webp", alt: "Thompson Blow-Back Trigger - Installed Detail" },
      { src: "/thompson-frt/thompson-gun-4.webp", alt: "Thompson Blow-Back Trigger - Range Configuration" },
      { src: "/thompson-frt/thompson-gun-5.webp", alt: "Thompson Blow-Back Trigger - Close-Up View" }
    ],
    features: [
      "Designed for Thompson carbines and pistols",
      "Blistering rate of fire with a smooth forced reset trigger feel",
      "Machined from durable steel alloy for rapid fire and high heat use",
      "Simple installation with minimal tools, though fitment may require a gunsmith",
      "Made in the USA",
      "Free shipping included"
    ],
    compatibility: {
      compatibleWith: [
        "Auto Ordnance Thompson carbines",
        "Kahr Arms Thompson carbines",
        "Auto Ordnance Thompson pistols",
        "Kahr Arms Thompson pistols",
        ".45 ACP ball ammunition"
      ],
      usageNotes: [
        "Read the User's Guide before installing and operating this product",
        "Use only .45 ACP ball ammunition; hollow points and specialty ammunition may cause feeding issues",
        "Oil the bolt more than usual and prefer thicker oils",
        "Aluminum receivers require extra caution because the experience is tuned around original steel-gun behavior"
      ]
    },
    specifications: {
      "Platform": "Thompson carbine and pistol variants",
      "Compatibility": "Auto Ordnance / Kahr Arms",
      "Ammunition": ".45 ACP ball",
      "Material": "High-strength steel alloy",
      "Tools Required": "Flathead screwdriver, punch, hammer or similar",
      "Shipping": "Free shipping"
    },
    manufacturer: "Kinetic Crossfire",
    isKineticCrossfireProduct: true,
    importantNotice:
      "ATTENTION! As this kit has become more widely used we've found that some guns exhibit bolt bounce while others do not. Unfortunately, this is not kit related, and thus we cannot fix or resolve it by changing the kit. A kit which works in one gun can be installed in another and experience out of battery discharges.\n\nTherefore, I must warn more adamantly that your gun may not work with this kit. These kits are still for sale if you wish to experiment with your gun, as they work flawlessly with many of them. The primary promising solution we have discovered so far for guns with bolt bounce is a milled bolt. Going forward, I will be focusing on resolving critical and fundamental issues in the currently produced model of the Thompson semi-auto rifle."
  },
  {
    id: "thompson-charging-handle",
    name: "Extended Thompson Charging Handle",
    category: "thompson",
    price: 38,
    description: "Extended steel charging handle for the M1 Thompson Auto Ordnance rifle with black oxide finish. Free shipping included.",
    detailedDescription: "An extended charging handle for the M1 Thompson Auto Ordnance rifle. It is a tasteful upgrade that complements your weapon for anyone who finds the small stock charging handle difficult to use. Machined from steel and coated with black oxide for durability.",
    images: [
      { src: "/thompson-charging-handle/Handle1.jpg", alt: "Extended Thompson Charging Handle - Main Product View" },
      { src: "/thompson-charging-handle/Side%20Charging%20Handle%20on%20Gun.png", alt: "Extended Thompson Charging Handle - Installed on Rifle" },
      { src: "/thompson-charging-handle/side%20charging%20handle.jpg", alt: "Extended Thompson Charging Handle - Product Packaging" }
    ],
    features: [
      "Extended handle for easier operation than the small stock charging handle",
      "Machined steel construction with black oxide coating",
      "Tasteful upgrade that complements your rifle",
      "Designed for the M1 Thompson Auto Ordnance rifle",
      "Free shipping included"
    ],
    compatibility: {
      compatibleWith: [
        "M1 Thompson Auto Ordnance rifle"
      ],
      usageNotes: [
        "Intended as a tasteful replacement upgrade for the stock charging handle",
        "Confirm fitment with your rifle before installation"
      ]
    },
    specifications: {
      "Platform": "M1 Thompson Auto Ordnance rifle",
      "Material": "Steel",
      "Finish": "Black oxide",
      "Overall Length": "1 15/16 in.",
      "Handle Grip Length": "1 3/8 in.",
      "Shipping": "Free shipping"
    },
    manufacturer: "Kinetic Crossfire",
    isKineticCrossfireProduct: true
  },
  {
    id: "thompson-top-charging-handle",
    name: "Contoured Top Thompson Charging Handle",
    category: "thompson",
    price: 40,
    description: "Contoured top charging handle for the 1927A Thompson Auto Ordnance rifle with black oxide coated steel construction. Free shipping included.",
    detailedDescription: "A contoured top charging handle for the 1927A Thompson Auto Ordnance rifle. It is made from black oxide coated steel for durability and improved looks. The front edges are rounded and chamfered to provide a comfortable grip for repeated use and dependable charging of the weapon.",
    images: [
      { src: "/top-charging-handle/Top%20Charging%20Handle%20on%20Gun.png", alt: "Contoured Top Thompson Charging Handle - Installed on Rifle" },
      { src: "/top-charging-handle/top%20charging%20handle.jpg", alt: "Contoured Top Thompson Charging Handle - Product Packaging" }
    ],
    features: [
      "Contoured design with rounded, chamfered front edges for a comfortable grip",
      "Black oxide coated steel for durability and improved looks",
      "Dependable charging for repeated use",
      "Designed for the 1927A Thompson Auto Ordnance rifle",
      "Free shipping included"
    ],
    compatibility: {
      compatibleWith: [
        "1927A Thompson Auto Ordnance rifle"
      ],
      usageNotes: [
        "Intended as a replacement upgrade for the stock top charging handle",
        "Confirm fitment with your rifle before installation"
      ]
    },
    specifications: {
      "Platform": "1927A Thompson Auto Ordnance rifle",
      "Material": "Steel",
      "Finish": "Black oxide",
      "Shipping": "Free shipping"
    },
    manufacturer: "Kinetic Crossfire",
    isKineticCrossfireProduct: true
  },
  {
    id: "slide-stock-assist",
    name: "Slide Stock Assist",
    category: "ar",
    price: 19.95,
    originalPrice: 23.00,
    description: "Precision-weighted accessory that enhances Slide Fire SSAR-15 SBS stocks for rapid, consistent follow-up shots.",
    detailedDescription: "The Slide Stock Assist is a precision-weighted spring designed specifically to enhance the performance of Slide Fire Solutions SSAR-15 SBS stocks. This simple device attaches to your existing SSAR-15 SBS stock to deliver extremely rapid, consistent follow-up shots. There are no special tools or modifications required for installation, and no additional parts such as full-auto bolt carrier groups, buffer tube or trigger modifications are necessary. The Slide Assist enables all users to operate it without special technique, even one-handed. It is designed to function on all mil-spec parts. Made in the USA by Kinetic Crossfire.",
    images: [
      { src: "/product-1.webp", alt: "Slide Stock Assist - Main View" },
      { src: "/product-2.webp", alt: "Slide Stock Assist - Detail View" },
      { src: "/product-3.webp", alt: "Slide Stock Assist - Side View" },
      { src: "/product-4.webp", alt: "Slide Stock Assist - Installation View" }
    ],
    features: [
      "Simple Install - no modifications needed",
      "Rapid, consistent follow-up shots",
      "Compatible with Slide Fire SSAR-15 SBS stocks",
      "Mil-spec AR-15 compatibility",
      "One-handed operation",
      "Made in USA by Kinetic Crossfire"
    ],
    compatibility: {
      compatibleWith: [
        "Slide Fire Solutions SSAR-15 SBS Stock",
        "AR-15 rifle platform",
        ".556 ammunition (recommended)",
        "Mil-spec triggers and parts"
      ],
      usageNotes: [
        "Requires Slide Fire Solutions SSAR-15 SBS stock",
        "Run with more oil than usual",
        "Clean frequently under high rates of fire",
        "Monitor trigger retaining pins",
        "Gas block adjustment may be necessary"
      ]
    },
    manufacturer: "Kinetic Crossfire",
    isKineticCrossfireProduct: true
  },
  {
    id: "ssar-15-sbs",
    name: "Slide Fire SSAR-15 SBS",
    category: "ar",
    price: 199.00,
    description: "Premium bump stock by Slide Fire Solutions for AR-15 platforms. Works perfectly with our Slide Stock Assist accessory.",
    detailedDescription: "The SSAR-15 SBS by Slide Fire Solutions is a precision-engineered bump stock designed for AR-15 platforms with carbine-style buffer tubes. This stock delivers smooth and reliable bump-fire operation with enhanced user features. Engineered for precision and built for performance, it provides the foundation for enhanced shooting experiences. For maximum performance, pair with our Kinetic Crossfire Slide Stock Assist accessory for even more rapid, consistent follow-up shots.",
    images: [
      { src: "/product-2-1.webp", alt: "Slide Fire SSAR-15 SBS - Main View" },
      { src: "/product-2-2.webp", alt: "Slide Fire SSAR-15 SBS - Side View" },
      { src: "/product-2-3.webp", alt: "Slide Fire SSAR-15 SBS - Detail View" },
      { src: "/product-2-4.webp", alt: "Slide Fire SSAR-15 SBS - Installation View" }
    ],
    features: [
      "Built for AR-15 Platforms: Compatible with carbine-style buffer tubes for easy integration",
      "High-Strength Polymer Design: Durable construction for long-lasting performance",
      "Quick Mode Selection: Switch between bump fire and semi-auto with the simple turn of the bump fire switch",
      "Sling-Ready: Equipped with three-position mounts for nylon webbing sling attachments",
      "Easy Installation: Includes interface block for fast, secure setup",
      "Compatible with Kinetic Crossfire Slide Stock Assist for enhanced performance"
    ],
    specifications: {
      "Manufacturer": "Slide Fire Solutions",
      "Platform": "AR-15",
      "Buffer Tube": "Carbine-style",
      "Material": "High-Strength Polymer",
      "Modes": "Bump Fire / Semi-Auto",
      "Sling Mounts": "Three-position",
      "Includes": "Interface block"
    },
    manufacturer: "Slide Fire Solutions",
    isKineticCrossfireProduct: false
  },
  {
    id: "thompson-gun-mat",
    name: "Thompson Machine Carbine Gun Mat",
    category: "apparel",
    price: 36.00,
    description: "12\" x 36\" navy blue heavy-duty gun mat with a textured, oil-resistant surface for full rifle-length Thompson maintenance.",
    detailedDescription: "This is a 12\" x 36\" heavy duty gun mat in Navy Blue, with a texturized base for grip and oil resistant surface. As a full rifle length pad made from vulcanized rubber, it provides an excellent surface for maintaining your Thompson without scratching or scraping the gun, or table beneath.",
    images: [
      { src: "/gunmatfinished.JPG", alt: "Thompson Machine Carbine Gun Mat - Product View" },
      { src: "/gunmatfinished2.JPG", alt: "Thompson Machine Carbine Gun Mat - With Thompson Carbine" }
    ],
    features: [
      "12\" x 36\" full rifle-length coverage",
      "Navy blue with Thompson Machine Carbine diagram",
      "Texturized base for grip and oil-resistant surface",
      "Vulcanized rubber protects gun and work surface",
      "Made in the USA"
    ],
    specifications: {
      "Dimensions": "12\" x 36\"",
      "Color": "Navy Blue",
      "Material": "Vulcanized rubber",
      "Surface": "Texturized, oil-resistant"
    },
    manufacturer: "Kinetic Crossfire",
    isKineticCrossfireProduct: true
  },
  {
    id: "chicago-typewriter-cap",
    name: "Chicago Typewriter Ball Cap",
    category: "apparel",
    price: 32.00,
    description: "'47 classic clean up ball cap with black stitched Chicago Typewriter logo on white cotton.",
    detailedDescription: "This '47 classic clean up ball cap now represents the Chicago Typewriter in flawless form. A straightforward white cotton with a black stitched logo means it can be washed and worn hard without artwork cracking, fading or peeling like vinyl or ink. Size is adjusted via a strap and brass fitting.",
    images: [
      { src: "/hat2.jpg", alt: "Chicago Typewriter Ball Cap - Three-Quarter View" },
      { src: "/hat1.jpg", alt: "Chicago Typewriter Ball Cap - Front View" },
      { src: "/hat3.jpg", alt: "Chicago Typewriter Ball Cap - Back View" }
    ],
    features: [
      "'47 classic clean up adjustable ball cap",
      "Black stitched Typewriting 101 logo and Thompson silhouette",
      "White cotton—no vinyl or ink to crack or peel",
      "Adjustable strap with brass fitting",
      "Machine washable"
    ],
    specifications: {
      "Style": "'47 Classic Clean Up",
      "Color": "White",
      "Material": "Cotton",
      "Closure": "Adjustable strap with brass fitting",
      "Logo": "Embroidered black stitch"
    },
    manufacturer: "Kinetic Crossfire",
    isKineticCrossfireProduct: true
  },
  {
    id: "public-enemy-hat",
    name: "Public Enemy Ball Cap",
    category: "apparel",
    price: 32,
    description: "'47 classic clean up ball cap with red and black stitched Public Enemy logo. Machine washable with adjustable brass fitting.",
    detailedDescription: "Join the ranks of John Dillinger, Baby Face Nelson, and Pretty Boy Floyd as a Public Enemy. Red and black stitching of the logo means it won't fade, peel, or crack like ink or vinyl. This '47 classic clean up is machine washable and has an adjustable brass fitting.",
    images: [
      { src: "/public-enemy-hat/PE1.jpg", alt: "Public Enemy Ball Cap - Main Product View" },
      { src: "/public-enemy-hat/PE2.jpg", alt: "Public Enemy Ball Cap - Side View" },
      { src: "/public-enemy-hat/PE3.jpg", alt: "Public Enemy Ball Cap - Detail View" }
    ],
    features: [
      "'47 classic clean up adjustable ball cap",
      "Red and black stitched Public Enemy logo",
      "Won't fade, peel, or crack like ink or vinyl",
      "Machine washable",
      "Adjustable strap with brass fitting"
    ],
    specifications: {
      "Style": "'47 Classic Clean Up",
      "Material": "Cotton",
      "Closure": "Adjustable strap with brass fitting",
      "Logo": "Red and black stitch"
    },
    manufacturer: "Kinetic Crossfire",
    isKineticCrossfireProduct: true
  }
];

export const getProductById = (id: string): Product | undefined => {
  const product = products.find((product) => product.id === id);
  if (!product) return undefined;
  return applySalePricing(product);
};

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products
    .filter((product) => product.category === category)
    .map(applySalePricing);
};

export const hasRestrictedShipping = (product: Product): boolean => {
  return product.category !== "apparel";
};
