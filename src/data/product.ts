export interface Product {
  id: string;
  name: string;
  subName: string;
  price: string;
  originalPrice: string;
  description: string;
  folderPath: string;
  themeColor: string;
  accentColor: string;
  gradient: string;
  features: string[];
  techSpecs: { label: string; value: string }[];
  section1: { title: string; subtitle: string };
  section2: { title: string; subtitle: string };
  section3: { title: string; subtitle: string };
  section4: { title: string; subtitle: string };
  detailsSection: { title: string; description: string; imageAlt: string };
  performanceSection: { title: string; description: string };
  buyNowSection: {
    price: string;
    sizes: string[];
    technologies: string[];
    shippingPromise: string;
    returnPolicy: string;
  };
}

export const product: Product = {
  id: "velocity-x",
  name: "Velocity X",
  subName: "Born to Run.",
  price: "₹14,999",
  originalPrice: "₹18,999",
  description: "Nitro Foam Technology - Carbon Fiber Plate - Adaptive Mesh",
  folderPath: "/images/velocity-x",
  themeColor: "#E42A2A",
  accentColor: "#FFB300",
  gradient: "linear-gradient(135deg, #1A1A1A 0%, #E42A2A 50%, #1A1A1A 100%)",
  features: ["Nitro Foam Technology", "Carbon Fiber Plate", "Adaptive Mesh Upper"],
  techSpecs: [
    { label: "Weight", value: "198g" },
    { label: "Drop", value: "8mm" },
    { label: "Stack", value: "40mm" }
  ],
  section1: { title: "Velocity X.", subtitle: "Born to Run." },
  section2: { title: "Explosive Energy Return.", subtitle: "NITRO™ foam delivers unmatched responsiveness with every stride." },
  section3: { title: "Engineered for Champions.", subtitle: "Carbon fiber plate propels you forward with relentless momentum." },
  section4: { title: "Speed has a new definition.", subtitle: "" },
  detailsSection: {
    title: "Next-Gen Propulsion",
    description: "The Velocity X features our revolutionary NITRO™ foam technology combined with a full-length carbon fiber plate. This creates an explosive toe-off that transforms your running efficiency. The adaptive mesh upper wraps your foot like a second skin, providing breathability without sacrificing support. Every element is precision-engineered for one purpose: to make you faster.",
    imageAlt: "Velocity X Technology Details"
  },
  performanceSection: {
    title: "Laboratory Tested, Track Proven",
    description: "Developed in collaboration with Olympic athletes and tested in our biomechanics lab. The Velocity X reduces ground contact time by 12% while increasing energy return by 85%. This isn't just a shoe—it's a competitive advantage."
  },
  buyNowSection: {
    price: "₹14,999",
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
    technologies: ["NITRO™ Foam", "Carbon Plate", "PUMAGRIP"],
    shippingPromise: "Free express delivery. Ships within 24 hours. Track in real-time.",
    returnPolicy: "30-day performance guarantee. Run in them. If not satisfied, return hassle-free."
  }
};
