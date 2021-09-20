export const splitAndCapitalize = (string) => string.split("_")
  .map((word) => word[0].toUpperCase() + word.slice(1))
  .join(" ")