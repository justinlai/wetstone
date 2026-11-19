/*
 * Six steps of "How we do it". Titles, body copy and icons follow the
 * "How We Do It (new icons)" scroll prototype. Icons are white line SVGs in
 * public/icons/steps and sit left-aligned inside a 260 × 260 box.
 */
export type Step = { title: string; body: string; icon: string };

export const STEPS: Step[] = [
  {
    title: "Map the opportunity",
    body: "We gather global seabed data, develop proprietary models to understand mineral resources and the marine environment, and then improve those models in real time during exploration.",
    icon: "/icons/steps/step-01.svg",
  },
  {
    title: "Explore autonomously",
    body: "Autonomous vehicles gather geological and environmental data, helping us assess deposits and establish environmental baselines at lower cost.",
    icon: "/icons/steps/step-02.svg",
  },
  {
    title: "Adapt proven technology",
    body: "We adapt proven offshore engineering and existing vessels to gather, transfer, and lift metal to the surface.",
    icon: "/icons/steps/step-03.svg",
  },
  {
    title: "Optimize shipping",
    body: "Offshore flexibility lets us route material to buyers and processors based on market conditions and shipping costs.",
    icon: "/icons/steps/step-04-shipping.png",
  },
  {
    title: "Refine in allied countries",
    body: "We put existing processing facilities to work, using higher-grade ores to support mineral supply chains in allied countries.",
    icon: "/icons/steps/step-05-globe.png",
  },
  {
    title: "Trade refined materials",
    body: "A diversified portfolio gives us flexibility to respond to shifting metal prices and supply bottlenecks.",
    icon: "/icons/steps/step-06.svg",
  },
];
