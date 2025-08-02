export interface Colors {
  primary: string;
  light: string;
  lighter: string;
  dark: string;
  text: string;
  textLight: string;
}

// Helper function to lighten a hex color
const lightenColor = (hex: string, percent: number) => {
  // Remove # if present
  hex = hex.replace("#", "");

  // Parse RGB values
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate adjustment
  const factor = percent / 100;

  // Lighten or darken based on factor
  const newR = Math.round(Math.min(255, Math.max(0, r + (255 - r) * factor)));
  const newG = Math.round(Math.min(255, Math.max(0, g + (255 - g) * factor)));
  const newB = Math.round(Math.min(255, Math.max(0, b + (255 - b) * factor)));

  // Convert back to hex
  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
};

// Create color variants
export const getColors = (cardColor: string): Colors => {
  return {
    primary: cardColor,
    light: lightenColor(cardColor, 80),
    lighter: lightenColor(cardColor, 95),
    dark: lightenColor(cardColor, -30),
    text: lightenColor(cardColor, -60),
    textLight: lightenColor(cardColor, -40),
  };
};
