package joyfe.gamesMiniverse.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import joyfe.gamesMiniverse.DAOInterfaces.AchievementDAO;
import joyfe.gamesMiniverse.errors.CustomAchievementNotFound;
import joyfe.gamesMiniverse.secondaryClasses.Achievement;

@Service("achievementsService")
public class AchievementsService {
	
	@Autowired
	AchievementDAO achievementDAO;
	
	public List<Achievement> getAchievementList() {
		return achievementDAO.getAllAchievements();
	}
	public List<Achievement> getGameAchievements(long id) {
		return achievementDAO.getGameAchievements(id);
	}

	public Achievement getAchievementById(long id) throws CustomAchievementNotFound {
		return achievementDAO.getAchievementById(id);
	}

	public boolean addAchievement(Achievement newAchievement) {
		return achievementDAO.createAchievement(newAchievement);
	}
	
	public boolean updateAchievement(long id, Achievement newAchievement) {
		return achievementDAO.updateAchievement(id, newAchievement);
	}

	public boolean deleteAchievement(long id) {
		return achievementDAO.deleteAchievement(id);
	}
}
