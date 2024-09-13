package joyfe.gamesMiniverse.DAOInterfaces;

import java.util.List;

import joyfe.gamesMiniverse.secondaryClasses.Achievement;

public interface AchievementDAO {
	Achievement getAchievementById(long id);
	List<Achievement> getGameAchievements(long gameId);
	List<Achievement> getAllAchievements();
	boolean createAchievement(Achievement newAchievement);
	boolean updateAchievement(long id, Achievement newAchievement);
	boolean deleteAchievement(long id);
	int getLastAchievementID();
	int getAchievementCount();
}
