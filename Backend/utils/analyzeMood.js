
export const analyzeMood = (text) => {
  const lower = text.toLowerCase();

  if (lower.includes("happy")) return { mood: "happy", score: 5 };
  if (lower.includes("sad")) return { mood: "sad", score: 2 };
  if (lower.includes("angry")) return { mood: "angry", score: 1 };
  if (lower.includes("stress")) return { mood: "anxious", score: 2 };

  return { mood: "neutral", score: 3 };
};