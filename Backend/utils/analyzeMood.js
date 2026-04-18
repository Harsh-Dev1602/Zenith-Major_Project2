export const analyzeMood = (text) => {
  const lower = text.toLowerCase();
  
  if (lower.includes("happy") || lower.includes("great") || lower.includes("radiant")) 
    return { mood: "radiant", score: 8 };
  if (lower.includes("sad") || lower.includes("lonely")) 
    return { mood: "down", score: 2 };
  if (lower.includes("angry") || lower.includes("mad")) 
    return { mood: "angry", score: 1 };
  if (lower.includes("stress") || lower.includes("anxious") || lower.includes("worry")) 
    return { mood: "anxious", score: 3 };
  if (lower.includes("calm") || lower.includes("peace")) 
    return { mood: "calm", score: 6 };

  return { mood: "neutral", score: 5 };
};