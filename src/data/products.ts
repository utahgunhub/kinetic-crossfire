export interface Product {
  id: string;
  name: string;
  category: "thompson" | "ar";
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
      { src: "/thompson-frt/new-product-image.jpg", alt: "Thompson Blow-Back Trigger - Main Product View" },
      { src: "/thompson-frt/thompson-gun-2.JPG", alt: "Thompson Blow-Back Trigger - Thompson Side View" },
      { src: "/thompson-frt/thompson-gun-3.JPG", alt: "Thompson Blow-Back Trigger - Installed Detail" },
      { src: "/thompson-frt/thompson-gun-4.JPG", alt: "Thompson Blow-Back Trigger - Range Configuration" },
      { src: "/thompson-frt/thompson-gun-5.JPG", alt: "Thompson Blow-Back Trigger - Close-Up View" }
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
        "Use only .45 ACP ball ammunition; hollow points and specialty ammunition may cause feeding issues",
        "While some semi-auto chambers are loose enough, it is recommended you have your barrel reamed or replaced with GI spec chambering",
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
      { src: "/product-1.png", alt: "Slide Stock Assist - Main View" },
      { src: "/product-2.png", alt: "Slide Stock Assist - Detail View" },
      { src: "/product-3.png", alt: "Slide Stock Assist - Side View" },
      { src: "/product-4.png", alt: "Slide Stock Assist - Installation View" }
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
      { src: "/product-2-1.png", alt: "Slide Fire SSAR-15 SBS - Main View" },
      { src: "/product-2-2.png", alt: "Slide Fire SSAR-15 SBS - Side View" },
      { src: "/product-2-3.png", alt: "Slide Fire SSAR-15 SBS - Detail View" },
      { src: "/product-2-4.png", alt: "Slide Fire SSAR-15 SBS - Installation View" }
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
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
