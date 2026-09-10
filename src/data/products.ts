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
  /** Custom builds sold via contact form—not checkout */
  contactOnly?: boolean;
  buildProposalPdf?: string;
}

export const products: Product[] = [
  {
    id: "thompson-blow-back-trigger",
    name: "Thompson Blow Back Trigger Gen II",
    category: "thompson",
    price: 275.00,
    description: "Gen II two-position forced reset trigger for Thompson and Annihilator carbines and pistols with an oversized firing pin. Free shipping included.",
    detailedDescription: "The Thompson Blow Back Trigger Gen II is a two position forced reset trigger for the Thompson and the Annihilator carbines and pistols. This is the second generation of the kit with an oversized firing pin. This oversized firing pin must be fitted to the gun, and provides a long trigger pull that slows the rate of fire and eliminates bolt bounce. Made in the USA, the parts are machined from an extremely robust and durable steel alloy built for rapid fire and high heat environments. Installation is simple and straightforward with minimal tools, but fitment may require a gunsmith.",
    images: [
      { src: "/new-firing-pin/kit1.JPG", alt: "Thompson Blow Back Trigger Gen II - Kit View" },
      { src: "/new-firing-pin/kit2.JPG", alt: "Thompson Blow Back Trigger Gen II - Kit Components" },
      { src: "/new-firing-pin/firingpin.JPG", alt: "Thompson Blow Back Trigger Gen II - Firing Pin" },
      { src: "/new-firing-pin/disconnect.JPG", alt: "Thompson Blow Back Trigger Gen II - Disconnect" },
      { src: "/new-firing-pin/fpvgun.jpg", alt: "Thompson Blow Back Trigger Gen II - Installed on Firearm" },
      { src: "/new-firing-pin/1927%20pic.jpg", alt: "Thompson Blow Back Trigger Gen II - 1927 Thompson" }
    ],
    features: [
      "Second generation (Gen II) kit with oversized firing pin",
      "Long trigger pull slows rate of fire and eliminates bolt bounce; firing pin must be fitted to the gun",
      "Designed for Thompson and Annihilator carbines and pistols",
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
        "Annihilator carbines and pistols",
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
      "Platform": "Thompson and Annihilator carbine and pistol variants",
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
    description: "Extended steel charging handle for the M1 Thompson Auto Ordnance rifle with black oxide finish.",
    detailedDescription: "An extended charging handle for the M1 Thompson Auto Ordnance rifle. It is a tasteful upgrade that complements your weapon for anyone who finds the small stock charging handle difficult to use. Machined from steel and coated with black oxide for durability.",
    images: [
      { src: "/thompson-charging-handle/Handle1.webp", alt: "Extended Thompson Side Charging Handle - Main Product View", objectPosition: "center 12%" },
      { src: "/thompson-charging-handle/side-charging-handle-on-gun.webp", alt: "Extended Thompson Side Charging Handle - Installed on Rifle" },
      { src: "/thompson-charging-handle/sidecharge1.webp", alt: "Extended Thompson Side Charging Handle - Product Packaging" },
      { src: "/thompson-charging-handle/sidecharge2.webp", alt: "Extended Thompson Side Charging Handle - Close-Up View" }
    ],
    features: [
      "Extended handle for easier operation than the small stock charging handle",
      "Machined steel construction with black oxide coating",
      "Tasteful upgrade that complements your rifle",
      "Designed for the M1 Thompson Auto Ordnance rifle"
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
      "Handle Grip Length": "1 3/8 in."
    },
    manufacturer: "Kinetic Crossfire",
    isKineticCrossfireProduct: true
  },
  {
    id: "thompson-top-charging-handle",
    name: "Contoured Top Thompson Charging Handle",
    category: "thompson",
    price: 40,
    description: "Contoured top charging handle for the 1927A Thompson Auto Ordnance rifle with black oxide coated steel construction.",
    detailedDescription: "A contoured top charging handle for the 1927A Thompson Auto Ordnance rifle. It is made from black oxide coated steel for durability and improved looks. The front edges are rounded and chamfered to provide a comfortable grip for repeated use and dependable charging of the weapon.",
    images: [
      { src: "/top-charging-handle/top-charging-handle-on-gun.webp", alt: "Contoured Top Thompson Charging Handle - Installed on Rifle" },
      { src: "/top-charging-handle/topcharge1.webp", alt: "Contoured Top Thompson Charging Handle - Product Packaging" },
      { src: "/top-charging-handle/topcharge2.webp", alt: "Contoured Top Thompson Charging Handle - Close-Up View" }
    ],
    features: [
      "Contoured design with rounded, chamfered front edges for a comfortable grip",
      "Black oxide coated steel for durability and improved looks",
      "Dependable charging for repeated use",
      "Designed for the 1927A Thompson Auto Ordnance rifle"
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
      "Finish": "Black oxide"
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
      { src: "/gunmatfinished.webp", alt: "Thompson Machine Carbine Gun Mat - Product View" },
      { src: "/gunmatfinished2.webp", alt: "Thompson Machine Carbine Gun Mat - With Thompson Carbine" }
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
      { src: "/whitehat1.webp", alt: "Chicago Typewriter Ball Cap - Front View" },
      { src: "/whitehat2.webp", alt: "Chicago Typewriter Ball Cap - Three-Quarter View" },
      { src: "/whitehat3.webp", alt: "Chicago Typewriter Ball Cap - Back View" }
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
      { src: "/public-enemy-hat/blackhat1.webp", alt: "Public Enemy Ball Cap - Front View" },
      { src: "/public-enemy-hat/blackhat2.webp", alt: "Public Enemy Ball Cap - Three-Quarter View" },
      { src: "/public-enemy-hat/blackhat3.webp", alt: "Public Enemy Ball Cap - Back View" }
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
  },
  {
    id: "annihilator",
    name: "The Annihilator",
    category: "thompson",
    price: 0,
    description:
      "John Thompson's original submachine gun design, custom built to order as a steel frame pistol with three position FRT fire control.",
    detailedDescription:
      "The Annihilator was designed by John Thompson as the world's first true submachine gun. Intended for the trenches of the First World War, it entered production on the civilian market rebranded as the more mild \"Thompson\". Identical in all respects to the more docile Thompson, the Annihilator now tears itself from the pages of history to reclaim its throne as the original and ultimate weapon of war.\n\nAs it wakes to the 21st Century, the civilian model of the Annihilator is sold from the factory with a three position FRT fire control group, featuring safe, semi, and forced reset positions. With a frame made entirely from steel, it is only offered as a pistol with a 10.5\" barrel. It comes from the factory with a walnut pistol brace. As designed by John Thompson and his engineers, it accepts all drum magazines on the market as well as stick magazines. Unlike the modern reproduction 1927A1 Thompsons which are of nearly identical design, the Annihilator retains its original magazine catch configuration that allows it to function with what are commonly called \"GI Thompson\" magazines. This means users will have access to a larger selection of better performing magazines, at a lower cost, and will not need to modify the magazine or the gun to use them. This does mean that users must source their own GI magazines according to their preferred distributor.\n\nOther features that will be appreciated by gun enthusiasts, are the original spherical top cocking handle, and lower receiver that is unnotched where it meets the handgrip. The grip tang which has been noted to break easily on GI Thompsons and reproduction semi automatic Thompsons has been altered on the Annihilator so that it is held in place with a screw. This also makes it removable, greatly easing the process for doing barrel changes. Left in its \"Trench Broom\" configuration, the Annihilator does not come with a compensator, but \"press fit\" models fit on the barrel should the user choose to install one.\n\nIf you are looking to upgrade your arsenal to include what is possibly the most iconic and aggressive handheld weapon ever designed, the Annihilator is the final choice. Guns are custom built to order for the time being. Please send a contact form to request pricing and further details.",
    images: [
      {
        src: "/The%20Annihilator.jpg",
        alt: "The Annihilator, John Thompson with the original prototype",
        objectPosition: "center 20%",
      },
    ],
    features: [
      "Three position FRT fire control: safe, semi, and forced reset",
      "Steel frame pistol with 10.5\" finned barrel and walnut pistol brace",
      "Accepts drum magazines and GI Thompson stick magazines without modification",
      "Original spherical top cocking handle and unnotched lower receiver at the handgrip",
      "Screw retained grip tang for durability and easier barrel changes",
      "Trench Broom configuration without compensator; press fit compensators optional",
      "Custom built to order, contact us for pricing and details",
      "Made in the USA",
    ],
    specifications: {
      Caliber: ".45 ACP",
      Frame: "Steel",
      Furniture: "Walnut, including pistol brace",
      Barrel: '10.5" finned barrel',
      Magazines: "Drums and 20/30 round GI stick magazines (user sourced)",
    },
    manufacturer: "Kinetic Crossfire",
    isKineticCrossfireProduct: true,
    contactOnly: true,
    buildProposalPdf: "/Annihilator%20Customer%20Build%20Proposal.pdf",
    importantNotice: "Custom Built to Order",
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

export const hasFreeShippingIncluded = (product: Product): boolean => {
  return product.id === RESTRICTED_SHIPPING_PRODUCT_ID;
};

export const isContactOnlyProduct = (product: Product): boolean => {
  return product.contactOnly === true;
};
