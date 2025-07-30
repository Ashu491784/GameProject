export const CalculateScoreMinigame = (selectedItems, challenge, level, elapsedTime) => {
  const requiredItems = challenge.requiredItems;
  const avoidItems = challenge.avoidItems || [];

  let correctCount = 0;
  let penaltyCount = 0;
  let comments = [];

  requiredItems.forEach(req => {
    if (req === "any-3-compatible") {
      if (selectedItems.length >= 3) {
        correctCount += 3;
        comments.push("✅ You selected 3 ingredients, good try!");
      } else {
        comments.push("❌ You need at least 3 ingredients.");
      }
    } else if (selectedItems.includes(req)) {
      correctCount++;
      comments.push(`✅ ${req} was correctly selected!`);
    } else {
      comments.push(`❌ Missing required item: ${req}`);
    }
  });

  avoidItems.forEach(bad => {
    if (selectedItems.includes(bad)) {
      penaltyCount++;
      comments.push(`⚠ Avoided item used: ${bad}`);
    }
  });

  const maxIngredientScore = 50;
  const ingredientScore = Math.round((correctCount / requiredItems.length) * maxIngredientScore);

  const penalty = penaltyCount * 5;
  const baseScore = Math.max(ingredientScore - penalty, 0);


  let bonus = 0;
  if (penaltyCount === 0 && correctCount === requiredItems.length) {
    bonus += 10;
    comments.push("🌟 Bonus: Perfect ingredient match!");
  }


  const maxTimeBonus = 20;
  const timeBonus = Math.max(maxTimeBonus - level * 2, 5);

 
  let speedBonus = 0;
  if (elapsedTime <= 3) {
    speedBonus = 2;
    bonus += speedBonus;
    comments.push("⚡ Speed Bonus: Finished in under 3 seconds!");
  }

  const total = Math.min(baseScore + bonus + timeBonus, 100);

  return {
    score: total,
    totalScore: total * level,
    ingredientScore: baseScore,
    bonus,
    speedBonus,
    timeBonus,
    comments
  };
};