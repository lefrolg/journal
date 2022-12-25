export const getLevelNameById = (level, levels) => {
  const levelItem = levels.find((item) => level === item.id);
  return levelItem?.name || level;
};
