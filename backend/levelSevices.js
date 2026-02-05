const getXpForNextLevel = (level) => 100 * Math.pow(level, 2);
export const addExperience = async (user, amount) => {
  user.xp += amount;
  let leveledUp = false;
  while(user.xp >= getXpForNextLevel(user.level)) {
    user.level +=1;
    leveledUp = true;
  }
  await user.save();
  return {user, leveledUp}
}