import { applySalePricing } from "@/lib/sale";

export type ProductCategory = "thompson" | "apparel";

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
    objectPosition?: string;
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
    description: "Two position forced reset trigger for Thompson carbines and pistols with free shipping included.",
    detailedDescription: "The Thompson Blow-Back Trigger is a two position forced reset trigger for Thompson carbines and pistols. It delivers a blistering rate of fire true to the original Thompson submachine gun thanks to a smoothly integrated forced reset trigger principle. Made in the USA, the parts are machined from an extremely robust and durable steel alloy built for rapid fire and high heat environments. Installation is simple and straightforward with minimal tools, but fitment may require a gunsmith. Turn your Thompson into the gun it was meant to be.",
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
        "Use only ball .45 ACP ammunition from a reputable American brand",
        "Oil the bolt more than usual",
        "This FRT kit must be fitted to the gun and will not drop in"
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
    importantNotice: "Bolt Bounce Solved"
  },
  {
    id: "thompson-charging-handle",
    name: "Extended Thompson Side Charging Handle",
    category: "thompson",
    price: 38,
    description: "Extended steel charging handle for the M1 Thompson Auto Ordnance rifle with black oxide finish. Free shipping included.",
    detailedDescription: "An extended charging handle for the M1 Thompson Auto Ordnance rifle. It is a tasteful upgrade that complements your weapon for anyone who finds the small stock charging handle difficult to use. Machined from steel and coated with black oxide for durability.",
    images: [
      { src: "/thompson-charging-handle/Handle1.jpg", alt: "Extended Thompson Side Charging Handle - Main Product View", objectPosition: "center 25%" },
      { src: "/thompson-charging-handle/Side%20Charging%20Handle%20on%20Gun.png", alt: "Extended Thompson Side Charging Handle - Installed on Rifle" },
      { src: "/thompson-charging-handle/sidecharge1.JPG", alt: "Extended Thompson Side Charging Handle - Product Packaging" },
      { src: "/thompson-charging-handle/sidecharge2.JPG", alt: "Extended Thompson Side Charging Handle - Close-Up View" }
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
      { src: "/top-charging-handle/topcharge1%20(2).JPG", alt: "Contoured Top Thompson Charging Handle - Product Packaging" },
      { src: "/top-charging-handle/topcharge2.JPG", alt: "Contoured Top Thompson Charging Handle - Close-Up View" }
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
      { src: "/whitehat1.JPG", alt: "Chicago Typewriter Ball Cap - Front View" },
      { src: "/whitehat2.JPG", alt: "Chicago Typewriter Ball Cap - Three-Quarter View" },
      { src: "/whitehat3.JPG", alt: "Chicago Typewriter Ball Cap - Back View" }
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
      { src: "/public-enemy-hat/blackhat1.JPG", alt: "Public Enemy Ball Cap - Front View" },
      { src: "/public-enemy-hat/blackhat2.JPG", alt: "Public Enemy Ball Cap - Three-Quarter View" },
      { src: "/public-enemy-hat/blackhat3.JPG", alt: "Public Enemy Ball Cap - Back View" }
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

export const RESTRICTED_SHIPPING_PRODUCT_ID = "thompson-blow-back-trigger";

export const hasRestrictedShipping = (product: Product): boolean => {
  return product.id === RESTRICTED_SHIPPING_PRODUCT_ID;
};
