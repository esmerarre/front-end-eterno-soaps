// src/data/soaps.ts

export interface Soap {
  id: number;
  name: string;
  description: string;
  price: number;
  category: "facial" | "body";
  image?: string;
}

export const soaps: Soap[] = [
  {
    id: 1,
    name: "Eternas Caricias",
    description: "A soothing blend of natural herbs for gentle cleansing.",
    price: 10,
    category: "body",
  },
  {
    id: 2,
    name: "Nopal Eterno",
    description: "Hydrating cactus soap infused with honey and Vitamin E.",
    price: 10,
    category: "facial",
  },
  // ...add the rest of your soaps here
];

// export const soaps: Soap[] = [
//   {
//     name: "Eternas Caricias",
//     ingredients: ["Cottonwood Leaves", "Clove", "Cinnamon", "Bay Leaves", "Rosemary"],
//     price: "$10",
//     description: "A soothing blend of natural herbs for gentle cleansing."
//   },
//   {
//     name: "Nopal Eterno",
//     ingredients: ["Cactus", "Honey", "Vitamin E", "Essential oils"],
//     price: "$10",
//     description: "Hydrating cactus soap infused with honey and Vitamin E."
//   },
//   {
//     name: "Eterno de Saffron",
//     ingredients: ["Saffron", "Oats", "Tapioca", "Vitamin E", "Essential oils"],
//     price: "$12",
//     description: "Luxurious saffron and oats soap for radiant skin."
//   },
//   {
//     name: "Serenidad Eterna",
//     ingredients: ["Lavender", "Turmeric", "Aloe Vera", "Calendula"],
//     price: "$11",
//     description: "Relaxing lavender and aloe blend for sensitive skin."
//   },
//   {
//     name: "Eterno de Spirulina",
//     ingredients: ["Spirulina", "Aloe Vera", "Chamomile", "Essential oils"],
//     price: "$12",
//     description: "Nourishing spirulina soap for soft, balanced skin."
//   },
//   {
//     name: "Brillo Eterno",
//     ingredients: ["Kojic Acid", "Turmeric", "Rice Powder"],
//     price: "$11",
//     description: "Brightening, fragrance-free soap with natural exfoliants."
//   },
//   {
//     name: "Noches Eternas",
//     ingredients: ["Activated Charcoal", "Tea Tree Oil", "Essential Oils"],
//     price: "$12",
//     description: "Detoxifying charcoal soap for deep cleansing."
//   },
//   {
//     name: "Noches Eternas con Turmeric",
//     ingredients: ["Activated Charcoal", "Turmeric", "Essential Oils"],
//     price: "$12",
//     description: "Charcoal and turmeric soap for a gentle detox."
//   },
//   {
//     name: "Miel Eterna",
//     ingredients: ["Oats", "Honey", "Turmeric"],
//     price: "$10",
//     description: "Moisturizing honey and oats soap for soft skin."
//   },
//   {
//     name: "Eterna Intimidad",
//     category: "intimate",
//     ingredients: ["Calendula", "Turmeric", "Chamomile"],
//     price: "$12",
//     description: "Fragrance-free intimate soap for delicate areas."
//   },
//   {
//     name: "Amor Eterno",
//     ingredients: ["Rose petals", "Aloe Vera", "Essential Oils", "Vitamin E"],
//     price: "$11",
//     description: "Romantic rose-infused soap for daily pampering."
//   },
//   {
//     name: "Eterno de Arnica",
//     ingredients: ["Arnica", "Aloe Vera", "Rosemary", "Calendula", "Turmeric", "Lavender"],
//     price: "$12",
//     description: "Healing arnica soap for sore and tired skin."
//   },
//   {
//     name: "Suavidad Eterna",
//     ingredients: ["Chamomile", "Turmeric"],
//     price: "$10",
//     description: "Gentle fragrance-free soap for sensitive skin."
//   },
// ];
