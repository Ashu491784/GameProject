export const calculateScore = (selectedItems, requirements, level) => {
  let stylePoints = 0;
  let challengeMatch = 0;
  let bonusPoints = 0;
  const comments = [];

  // ✅ Safe check for selectedItems
  if (Array.isArray(selectedItems)) {
    selectedItems.forEach(item => {
      stylePoints += item.points || 0;
    });
  } else {
    console.warn("⚠️ selectedItems is not an array:", selectedItems);
    selectedItems = []; // fallback to empty array to avoid crashes below
  }

  stylePoints = Math.min(stylePoints, 50);

  const reqsMet = {
    casual: requirements?.some(req => req.toLowerCase().includes('casual')),
    formal: requirements?.some(req => req.toLowerCase().includes('formal')),
    accessories: requirements?.some(req => req.toLowerCase().includes('accessor')),
  };

  let reqsCount = 0;
  let totalReqs = 0;

  if (reqsMet.casual) {
    totalReqs++;
    const hasCasual = selectedItems.some(item => item.style === 'casual');
    if (hasCasual) {
      reqsCount++;
      comments.push('✅ Good choice with casual items!');
    } else {
      comments.push('❌ The occasion calls for casual wear');
    }
  }

  if (reqsMet.formal) {
    totalReqs++;
    const hasFormal = selectedItems.some(item => item.type === 'formal');
    if (hasFormal) {
      reqsCount++;
      comments.push('✅ Perfect formal pieces selected!');
    } else {
      comments.push('❌ This event requires formal attire!');
    }
  }

  if (reqsMet.accessories) {
    totalReqs++;
    const accessoryCount = selectedItems.filter(item => item.type === 'accessories').length;
    if (accessoryCount > 0) {
      reqsCount++;
      comments.push(`✅ Great job with ${accessoryCount} accessories!`);
    } else {
      comments.push("❌ Don't forget accessories to complete your look");
    }
  }

  challengeMatch = totalReqs > 0 ? (reqsCount / totalReqs) * 30 : 30;
  challengeMatch = Math.round(challengeMatch);

  const colors = selectedItems.map(item => item.color);
  const uniqueColors = [...new Set(colors)];

  if (uniqueColors.length <= 2) {
    bonusPoints += 10;
    comments.push("🌟 Bonus: Great color coordinations!!");
  }

  const styles = selectedItems.map(item => item.style);
  const uniqueStyles = [...new Set(styles)];

  if (uniqueStyles.length === 1) {
    bonusPoints += 10;
    comments.push(`🌟 Bonus: Perfect ${uniqueStyles[0]} style consistency`);
  }

  const totalScore = Math.min(stylePoints + challengeMatch + bonusPoints, 100);

  return {
    score: totalScore,
    totalScore: totalScore * level,
    stylePoints,
    challengeMatch,
    bonusPoints,
    comments
  };
};
