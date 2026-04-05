export const PALETTE = [
  { bg: "#fef3e2", border: "#d4923a", text: "#7a4e10" },
  { bg: "#e8f5ee", border: "#3aac6e", text: "#165e36" },
  { bg: "#eeeffe", border: "#6c74d4", text: "#2d3480" },
  { bg: "#fde8e8", border: "#d44040", text: "#7a1010" },
  { bg: "#e8f2fe", border: "#3a80d4", text: "#0d3e7a" },
  { bg: "#f0f8e8", border: "#7ab43a", text: "#3a5e10" },
  { bg: "#fde8f8", border: "#c43ab4", text: "#6e0d64" },
  { bg: "#e8fdf8", border: "#3ab4a0", text: "#0d5e52" },
];

export const hex2rgba = (hex, a) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
};
