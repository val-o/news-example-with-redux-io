export type PossibleSizes = "small" | "medium" | "large";

export const mapSize = (size: PossibleSizes) => {
  switch (size) {
    case "small":
      return "100vw";
    case "medium":
      return "33vw";
    case "large":
      return "20vw";
    default:
      return "33.3vw";
  }
};
