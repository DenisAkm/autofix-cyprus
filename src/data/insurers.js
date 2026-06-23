// Top motor-insurance companies operating in Cyprus (by market share / recognition).
// Shown as a "we handle claims with all major insurers" trust strip — a repair
// shop processes claims for whichever insurer the customer has.
//
// Sources: market-share data from Cyprus motor-insurance roundups (2025).
// Every entry carries a real logo (public/img/insurers/); the component keeps a
// text-wordmark fallback for any logo that fails to load. To add an insurer, drop
// an SVG/PNG into that folder and add `logo: "/img/insurers/<file>"` to the entry.
export const INSURERS = [
  { name: "Trust Insurance", logo: "/img/insurers/trust.svg" },
  { name: "General Insurance of Cyprus", logo: "/img/insurers/gic.png" },
  { name: "Atlantic Insurance", logo: "/img/insurers/atlantic.svg" },
  { name: "Cosmos Insurance", logo: "/img/insurers/cosmos.svg" },
  { name: "Minerva Insurance", logo: "/img/insurers/minerva.svg" },
  { name: "Anytime", logo: "/img/insurers/anytime.svg" },
  { name: "Gan Direct", logo: "/img/insurers/gandirect.png" },
  { name: "Allianz", logo: "/img/insurers/allianz.svg" },
  { name: "AIG", logo: "/img/insurers/aig.svg" },
];
