-- Seed current catalog
insert into public.products (
  id, name, category, price, description, detailed_description, features, compatibility, specifications,
  manufacturer, is_kinetic_crossfire_product, quantity_on_hand, stock_status_label, important_notice,
  contact_only, build_proposal_pdf, sort_order, featured, is_published
)
select
  id, name, category, price, description, detailed_description, features, compatibility, specifications,
  manufacturer, is_kinetic_crossfire_product, quantity_on_hand, stock_status_label, important_notice,
  contact_only, build_proposal_pdf, sort_order, featured, is_published
from jsonb_to_recordset($catalog$
[
  {
    "id": "thompson-blow-back-trigger",
    "name": "Thompson Blow Back Trigger Gen II",
    "category": "thompson",
    "price": 275,
    "description": "Gen II two-position forced reset trigger for Thompson and Annihilator carbines and pistols with an oversized firing pin. Free shipping included.",
    "detailed_description": "The Thompson Blow Back Trigger Gen II is a two position forced reset trigger for the Thompson and the Annihilator carbines and pistols. This is the second generation of the kit with an oversized firing pin. This oversized firing pin must be fitted to the gun, and provides a long trigger pull that slows the rate of fire and eliminates bolt bounce. Made in the USA, the parts are machined from an extremely robust and durable steel alloy built for rapid fire and high heat environments. Installation is simple and straightforward with minimal tools, but fitment may require a gunsmith.",
    "features": [
      "Second generation (Gen II) kit with oversized firing pin",
      "Long trigger pull slows rate of fire and eliminates bolt bounce; firing pin must be fitted to the gun",
      "Designed for Thompson and Annihilator carbines and pistols",
      "Machined from durable steel alloy for rapid fire and high heat use",
      "Simple installation with minimal tools, though fitment may require a gunsmith",
      "Made in the USA",
      "Free shipping included"
    ],
    "compatibility": {
      "compatibleWith": [
        "Auto Ordnance Thompson carbines",
        "Kahr Arms Thompson carbines",
        "Auto Ordnance Thompson pistols",
        "Kahr Arms Thompson pistols",
        "Annihilator carbines and pistols",
        ".45 ACP ball ammunition"
      ],
      "usageNotes": [
        "Read the User's Guide before installing and operating this product",
        "Use only ball .45 ACP ammunition from a reputable American brand",
        "Oil the bolt more than usual",
        "This FRT kit must be fitted to the gun and will not drop in"
      ]
    },
    "specifications": {
      "Platform": "Thompson and Annihilator carbine and pistol variants",
      "Compatibility": "Auto Ordnance / Kahr Arms",
      "Ammunition": ".45 ACP ball",
      "Material": "High-strength steel alloy",
      "Tools Required": "Flathead screwdriver, punch, hammer or similar",
      "Shipping": "Free shipping"
    },
    "manufacturer": "Kinetic Crossfire",
    "is_kinetic_crossfire_product": true,
    "quantity_on_hand": 100,
    "stock_status_label": null,
    "important_notice": "Bolt Bounce Solved",
    "contact_only": false,
    "build_proposal_pdf": null,
    "sort_order": 10,
    "featured": true,
    "is_published": true
  },
  {
    "id": "thompson-charging-handle",
    "name": "Extended Thompson Side Charging Handle",
    "category": "thompson",
    "price": 38,
    "description": "Extended steel charging handle for the M1 Thompson Auto Ordnance rifle with black oxide finish.",
    "detailed_description": "An extended charging handle for the M1 Thompson Auto Ordnance rifle. It is a tasteful upgrade that complements your weapon for anyone who finds the small stock charging handle difficult to use. Machined from steel and coated with black oxide for durability.",
    "features": [
      "Extended handle for easier operation than the small stock charging handle",
      "Machined steel construction with black oxide coating",
      "Tasteful upgrade that complements your rifle",
      "Designed for the M1 Thompson Auto Ordnance rifle"
    ],
    "compatibility": {
      "compatibleWith": [
        "M1 Thompson Auto Ordnance rifle"
      ],
      "usageNotes": [
        "Intended as a tasteful replacement upgrade for the stock charging handle",
        "Confirm fitment with your rifle before installation"
      ]
    },
    "specifications": {
      "Platform": "M1 Thompson Auto Ordnance rifle",
      "Material": "Steel",
      "Finish": "Black oxide",
      "Overall Length": "1 15/16 in.",
      "Handle Grip Length": "1 3/8 in."
    },
    "manufacturer": "Kinetic Crossfire",
    "is_kinetic_crossfire_product": true,
    "quantity_on_hand": 0,
    "stock_status_label": "Temporarily Out of Stock",
    "important_notice": null,
    "contact_only": false,
    "build_proposal_pdf": null,
    "sort_order": 20,
    "featured": true,
    "is_published": true
  },
  {
    "id": "thompson-top-charging-handle",
    "name": "Contoured Top Thompson Charging Handle",
    "category": "thompson",
    "price": 40,
    "description": "Contoured top charging handle for the 1927A Thompson Auto Ordnance rifle with black oxide coated steel construction.",
    "detailed_description": "A contoured top charging handle for the 1927A Thompson Auto Ordnance rifle. It is made from black oxide coated steel for durability and improved looks. The front edges are rounded and chamfered to provide a comfortable grip for repeated use and dependable charging of the weapon.",
    "features": [
      "Contoured design with rounded, chamfered front edges for a comfortable grip",
      "Black oxide coated steel for durability and improved looks",
      "Dependable charging for repeated use",
      "Designed for the 1927A Thompson Auto Ordnance rifle"
    ],
    "compatibility": {
      "compatibleWith": [
        "1927A Thompson Auto Ordnance rifle"
      ],
      "usageNotes": [
        "Intended as a replacement upgrade for the stock top charging handle",
        "Confirm fitment with your rifle before installation"
      ]
    },
    "specifications": {
      "Platform": "1927A Thompson Auto Ordnance rifle",
      "Material": "Steel",
      "Finish": "Black oxide"
    },
    "manufacturer": "Kinetic Crossfire",
    "is_kinetic_crossfire_product": true,
    "quantity_on_hand": 100,
    "stock_status_label": null,
    "important_notice": null,
    "contact_only": false,
    "build_proposal_pdf": null,
    "sort_order": 30,
    "featured": true,
    "is_published": true
  },
  {
    "id": "thompson-gun-mat",
    "name": "Thompson Machine Carbine Gun Mat",
    "category": "apparel",
    "price": 36,
    "description": "12\" x 36\" navy blue heavy-duty gun mat with a textured, oil-resistant surface for full rifle-length Thompson maintenance.",
    "detailed_description": "This is a 12\" x 36\" heavy duty gun mat in Navy Blue, with a texturized base for grip and oil resistant surface. As a full rifle length pad made from vulcanized rubber, it provides an excellent surface for maintaining your Thompson without scratching or scraping the gun, or table beneath.",
    "features": [
      "12\" x 36\" full rifle-length coverage",
      "Navy blue with Thompson Machine Carbine diagram",
      "Texturized base for grip and oil-resistant surface",
      "Vulcanized rubber protects gun and work surface",
      "Made in the USA"
    ],
    "compatibility": null,
    "specifications": {
      "Dimensions": "12\" x 36\"",
      "Color": "Navy Blue",
      "Material": "Vulcanized rubber",
      "Surface": "Texturized, oil-resistant"
    },
    "manufacturer": "Kinetic Crossfire",
    "is_kinetic_crossfire_product": true,
    "quantity_on_hand": 100,
    "stock_status_label": null,
    "important_notice": null,
    "contact_only": false,
    "build_proposal_pdf": null,
    "sort_order": 40,
    "featured": false,
    "is_published": true
  },
  {
    "id": "chicago-typewriter-cap",
    "name": "Chicago Typewriter Ball Cap",
    "category": "apparel",
    "price": 32,
    "description": "'47 classic clean up ball cap with black stitched Chicago Typewriter logo on white cotton.",
    "detailed_description": "This '47 classic clean up ball cap now represents the Chicago Typewriter in flawless form. A straightforward white cotton with a black stitched logo means it can be washed and worn hard without artwork cracking, fading or peeling like vinyl or ink. Size is adjusted via a strap and brass fitting.",
    "features": [
      "'47 classic clean up adjustable ball cap",
      "Black stitched Typewriting 101 logo and Thompson silhouette",
      "White cotton—no vinyl or ink to crack or peel",
      "Adjustable strap with brass fitting",
      "Machine washable"
    ],
    "compatibility": null,
    "specifications": {
      "Style": "'47 Classic Clean Up",
      "Color": "White",
      "Material": "Cotton",
      "Closure": "Adjustable strap with brass fitting",
      "Logo": "Embroidered black stitch"
    },
    "manufacturer": "Kinetic Crossfire",
    "is_kinetic_crossfire_product": true,
    "quantity_on_hand": 100,
    "stock_status_label": null,
    "important_notice": null,
    "contact_only": false,
    "build_proposal_pdf": null,
    "sort_order": 50,
    "featured": false,
    "is_published": true
  },
  {
    "id": "public-enemy-hat",
    "name": "Public Enemy Ball Cap",
    "category": "apparel",
    "price": 32,
    "description": "'47 classic clean up ball cap with red and black stitched Public Enemy logo. Machine washable with adjustable brass fitting.",
    "detailed_description": "Join the ranks of John Dillinger, Baby Face Nelson, and Pretty Boy Floyd as a Public Enemy. Red and black stitching of the logo means it won't fade, peel, or crack like ink or vinyl. This '47 classic clean up is machine washable and has an adjustable brass fitting.",
    "features": [
      "'47 classic clean up adjustable ball cap",
      "Red and black stitched Public Enemy logo",
      "Won't fade, peel, or crack like ink or vinyl",
      "Machine washable",
      "Adjustable strap with brass fitting"
    ],
    "compatibility": null,
    "specifications": {
      "Style": "'47 Classic Clean Up",
      "Material": "Cotton",
      "Closure": "Adjustable strap with brass fitting",
      "Logo": "Red and black stitch"
    },
    "manufacturer": "Kinetic Crossfire",
    "is_kinetic_crossfire_product": true,
    "quantity_on_hand": 100,
    "stock_status_label": null,
    "important_notice": null,
    "contact_only": false,
    "build_proposal_pdf": null,
    "sort_order": 60,
    "featured": true,
    "is_published": true
  },
  {
    "id": "annihilator",
    "name": "The Annihilator",
    "category": "thompson",
    "price": 0,
    "description": "John Thompson's original submachine gun design, custom built to order as a steel frame pistol with three position FRT fire control.",
    "detailed_description": "The Annihilator was designed by John Thompson as the world's first true submachine gun. Intended for the trenches of the First World War, it entered production on the civilian market rebranded as the more mild \"Thompson\". Identical in all respects to the more docile Thompson, the Annihilator now tears itself from the pages of history to reclaim its throne as the original and ultimate weapon of war.\n\nAs it wakes to the 21st Century, the civilian model of the Annihilator is sold from the factory with a three position FRT fire control group, featuring safe, semi, and forced reset positions. With a frame made entirely from steel, it is only offered as a pistol with a 10.5\" barrel. It comes from the factory with a walnut pistol brace. As designed by John Thompson and his engineers, it accepts all drum magazines on the market as well as stick magazines. Unlike the modern reproduction 1927A1 Thompsons which are of nearly identical design, the Annihilator retains its original magazine catch configuration that allows it to function with what are commonly called \"GI Thompson\" magazines. This means users will have access to a larger selection of better performing magazines, at a lower cost, and will not need to modify the magazine or the gun to use them. This does mean that users must source their own GI magazines according to their preferred distributor.\n\nOther features that will be appreciated by gun enthusiasts, are the original spherical top cocking handle, and lower receiver that is unnotched where it meets the handgrip. The grip tang which has been noted to break easily on GI Thompsons and reproduction semi automatic Thompsons has been altered on the Annihilator so that it is held in place with a screw. This also makes it removable, greatly easing the process for doing barrel changes. Left in its \"Trench Broom\" configuration, the Annihilator does not come with a compensator, but \"press fit\" models fit on the barrel should the user choose to install one.\n\nIf you are looking to upgrade your arsenal to include what is possibly the most iconic and aggressive handheld weapon ever designed, the Annihilator is the final choice. Guns are custom built to order for the time being. Please send a contact form to request pricing and further details.",
    "features": [
      "Three position FRT fire control: safe, semi, and forced reset",
      "Steel frame pistol with 10.5\" finned barrel and walnut pistol brace",
      "Accepts drum magazines and GI Thompson stick magazines without modification",
      "Original spherical top cocking handle and unnotched lower receiver at the handgrip",
      "Screw retained grip tang for durability and easier barrel changes",
      "Trench Broom configuration without compensator; press fit compensators optional",
      "Custom built to order, contact us for pricing and details",
      "Made in the USA"
    ],
    "compatibility": null,
    "specifications": {
      "Caliber": ".45 ACP",
      "Frame": "Steel",
      "Furniture": "Walnut, including pistol brace",
      "Barrel": "10.5\" finned barrel",
      "Magazines": "Drums and 20/30 round GI stick magazines (user sourced)"
    },
    "manufacturer": "Kinetic Crossfire",
    "is_kinetic_crossfire_product": true,
    "quantity_on_hand": 0,
    "stock_status_label": null,
    "important_notice": "Custom Built to Order",
    "contact_only": true,
    "build_proposal_pdf": "/Annihilator%20Customer%20Build%20Proposal.pdf",
    "sort_order": 70,
    "featured": true,
    "is_published": true
  }
]
$catalog$::jsonb) as x(
  id text,
  name text,
  category text,
  price numeric,
  description text,
  detailed_description text,
  features jsonb,
  compatibility jsonb,
  specifications jsonb,
  manufacturer text,
  is_kinetic_crossfire_product boolean,
  quantity_on_hand integer,
  stock_status_label text,
  important_notice text,
  contact_only boolean,
  build_proposal_pdf text,
  sort_order integer,
  featured boolean,
  is_published boolean
)
on conflict (id) do nothing;

insert into public.product_images (product_id, src, alt, object_position, sort_order)
select product_id, src, alt, object_position, sort_order
from jsonb_to_recordset($images$
[
  {
    "product_id": "thompson-blow-back-trigger",
    "src": "/new-firing-pin/kit1.JPG",
    "alt": "Thompson Blow Back Trigger Gen II - Kit View",
    "object_position": null,
    "sort_order": 0
  },
  {
    "product_id": "thompson-blow-back-trigger",
    "src": "/new-firing-pin/kit2.JPG",
    "alt": "Thompson Blow Back Trigger Gen II - Kit Components",
    "object_position": null,
    "sort_order": 1
  },
  {
    "product_id": "thompson-blow-back-trigger",
    "src": "/new-firing-pin/firingpin.JPG",
    "alt": "Thompson Blow Back Trigger Gen II - Firing Pin",
    "object_position": null,
    "sort_order": 2
  },
  {
    "product_id": "thompson-blow-back-trigger",
    "src": "/new-firing-pin/disconnect.JPG",
    "alt": "Thompson Blow Back Trigger Gen II - Disconnect",
    "object_position": null,
    "sort_order": 3
  },
  {
    "product_id": "thompson-blow-back-trigger",
    "src": "/new-firing-pin/fpvgun.jpg",
    "alt": "Thompson Blow Back Trigger Gen II - Installed on Firearm",
    "object_position": null,
    "sort_order": 4
  },
  {
    "product_id": "thompson-blow-back-trigger",
    "src": "/new-firing-pin/1927%20pic.jpg",
    "alt": "Thompson Blow Back Trigger Gen II - 1927 Thompson",
    "object_position": null,
    "sort_order": 5
  },
  {
    "product_id": "thompson-charging-handle",
    "src": "/thompson-charging-handle/Handle1.webp",
    "alt": "Extended Thompson Side Charging Handle - Main Product View",
    "object_position": "center 12%",
    "sort_order": 0
  },
  {
    "product_id": "thompson-charging-handle",
    "src": "/thompson-charging-handle/side-charging-handle-on-gun.webp",
    "alt": "Extended Thompson Side Charging Handle - Installed on Rifle",
    "object_position": null,
    "sort_order": 1
  },
  {
    "product_id": "thompson-charging-handle",
    "src": "/thompson-charging-handle/sidecharge1.webp",
    "alt": "Extended Thompson Side Charging Handle - Product Packaging",
    "object_position": null,
    "sort_order": 2
  },
  {
    "product_id": "thompson-charging-handle",
    "src": "/thompson-charging-handle/sidecharge2.webp",
    "alt": "Extended Thompson Side Charging Handle - Close-Up View",
    "object_position": null,
    "sort_order": 3
  },
  {
    "product_id": "thompson-top-charging-handle",
    "src": "/top-charging-handle/top-charging-handle-on-gun.webp",
    "alt": "Contoured Top Thompson Charging Handle - Installed on Rifle",
    "object_position": null,
    "sort_order": 0
  },
  {
    "product_id": "thompson-top-charging-handle",
    "src": "/top-charging-handle/topcharge1.webp",
    "alt": "Contoured Top Thompson Charging Handle - Product Packaging",
    "object_position": null,
    "sort_order": 1
  },
  {
    "product_id": "thompson-top-charging-handle",
    "src": "/top-charging-handle/topcharge2.webp",
    "alt": "Contoured Top Thompson Charging Handle - Close-Up View",
    "object_position": null,
    "sort_order": 2
  },
  {
    "product_id": "thompson-gun-mat",
    "src": "/gunmatfinished.webp",
    "alt": "Thompson Machine Carbine Gun Mat - Product View",
    "object_position": null,
    "sort_order": 0
  },
  {
    "product_id": "thompson-gun-mat",
    "src": "/gunmatfinished2.webp",
    "alt": "Thompson Machine Carbine Gun Mat - With Thompson Carbine",
    "object_position": null,
    "sort_order": 1
  },
  {
    "product_id": "chicago-typewriter-cap",
    "src": "/whitehat1.webp",
    "alt": "Chicago Typewriter Ball Cap - Front View",
    "object_position": null,
    "sort_order": 0
  },
  {
    "product_id": "chicago-typewriter-cap",
    "src": "/whitehat2.webp",
    "alt": "Chicago Typewriter Ball Cap - Three-Quarter View",
    "object_position": null,
    "sort_order": 1
  },
  {
    "product_id": "chicago-typewriter-cap",
    "src": "/whitehat3.webp",
    "alt": "Chicago Typewriter Ball Cap - Back View",
    "object_position": null,
    "sort_order": 2
  },
  {
    "product_id": "public-enemy-hat",
    "src": "/public-enemy-hat/blackhat1.webp",
    "alt": "Public Enemy Ball Cap - Front View",
    "object_position": null,
    "sort_order": 0
  },
  {
    "product_id": "public-enemy-hat",
    "src": "/public-enemy-hat/blackhat2.webp",
    "alt": "Public Enemy Ball Cap - Three-Quarter View",
    "object_position": null,
    "sort_order": 1
  },
  {
    "product_id": "public-enemy-hat",
    "src": "/public-enemy-hat/blackhat3.webp",
    "alt": "Public Enemy Ball Cap - Back View",
    "object_position": null,
    "sort_order": 2
  },
  {
    "product_id": "annihilator",
    "src": "/The%20Annihilator.jpg",
    "alt": "The Annihilator, John Thompson with the original prototype",
    "object_position": "center 20%",
    "sort_order": 0
  }
]
$images$::jsonb) as x(
  product_id text,
  src text,
  alt text,
  object_position text,
  sort_order integer
)
where not exists (
  select 1 from public.product_images existing
  where existing.product_id = x.product_id and existing.src = x.src
);
