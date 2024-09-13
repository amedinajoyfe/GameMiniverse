package joyfe.gamesMiniverse.TestingClasses;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import joyfe.gamesMiniverse.DAOInterfaces.AchievementDAO;
import joyfe.gamesMiniverse.secondaryClasses.Achievement;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("testing")
public class TestAchievementDAOImplement {
	@Autowired
	AchievementDAO achievementDAO;
	
	@Test
    public void testGetAchievementById() {
        Achievement achievement = achievementDAO.getAchievementById(1);
        assertNotNull(achievement, "Not found");
        assertEquals("10 disparos", achievement.getName(), "Incorrect name");
        assertEquals("Consigue 10 disparos en \"Shooting practice\"", achievement.getDescription(), "Incorrect description");
        assertEquals(1, achievement.getGameId(), "Incorrect game ID");
    }
	
	@Test
    public void testGetAllAchievements() {
        List<Achievement> achievementList = achievementDAO.getAllAchievements();
        assertNotNull(achievementList, "Not found");
        assertFalse(achievementList.isEmpty(), "Empty achievement list");
        assertEquals(6, achievementList.size(), "Not gotten all achievements");
    }
	
	@Test
    public void testGetGameAchievements() {
		List<Achievement> achievementList = achievementDAO.getGameAchievements(1);
        assertNotNull(achievementList, "Not found");
        assertFalse(achievementList.isEmpty(), "Empty game achievement list");
        assertEquals(4, achievementList.size(), "Not gotten all game achievements");
    }
	
	@Test
	public void testCreateAchievement() {
		boolean result = achievementDAO.createAchievement(new Achievement("Aprendiz del 3 en raya", "Gana una partida al juego 'TicTacToe'", 3));
		assertTrue(result, "Not created correctly");
		
		Achievement achievement = achievementDAO.getAchievementById(achievementDAO.getLastAchievementID());
        assertNotNull(achievement, "Not found new");
        assertEquals("Aprendiz del 3 en raya", achievement.getName(), "Name not created correctly");
        assertEquals("Gana una partida al juego 'TicTacToe'", achievement.getDescription(), "Description not created correctly");
        assertEquals(3, achievement.getGameId(), "GameId not created correctly");

        result = achievementDAO.deleteAchievement(achievementDAO.getLastAchievementID());
		assertTrue(result, "Not deleted correctly");
	}
	
	@Test
	public void testUpdateAchievement() {
		boolean result = achievementDAO.updateAchievement(2, new Achievement("25 disparos", "Consigue 25 disparos en 'Shooting practice'", 1));
		assertTrue(result, "Not updated correctly");
		
		Achievement achievement = achievementDAO.getAchievementById(2);
        assertNotNull(achievement, "Not found updated");
        assertEquals("25 disparos", achievement.getName(), "Name not updated correctly");
        assertEquals("Consigue 25 disparos en 'Shooting practice'", achievement.getDescription(), "Description not updated correctly");
        assertEquals(1, achievement.getGameId(), "GameId not updated correctly");

		result = achievementDAO.updateAchievement(2, new Achievement("20 disparos", "Consigue 20 disparos en 'Shooting practice'", 1));
		assertTrue(result, "Not updated back correctly");
	}
	
	@Test
	public void testDeleteAchievement() {
		boolean result = achievementDAO.createAchievement(new Achievement("Aprendiz del 3 en raya", "Gana una partida al juego 'TicTacToe'", 3));
		assertTrue(result, "Not created correctly");
		
		int gamesCount = achievementDAO.getAchievementCount();
		
        result = achievementDAO.deleteAchievement(achievementDAO.getLastAchievementID());
		assertTrue(result, "Not deleted correctly");
		
		assertEquals(achievementDAO.getAchievementCount(), gamesCount - 1, "Not deleted correctly");
	}
}
