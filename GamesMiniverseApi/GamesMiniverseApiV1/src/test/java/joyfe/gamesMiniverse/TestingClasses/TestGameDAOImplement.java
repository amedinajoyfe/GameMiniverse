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

import joyfe.gamesMiniverse.DAOInterfaces.GameDAO;
import joyfe.gamesMiniverse.secondaryClasses.Game;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("testing")
public class TestGameDAOImplement {
	
	@Autowired
	GameDAO gameDAO;
	
	@Test
    public void testGetGameById() {
        Game game = gameDAO.getGameById(1);
        assertNotNull(game, "Not found");
        assertEquals("ShootingPractice", game.getName(), "Incorrect name");
        assertEquals(1, game.getCreatorId(), "Incorrect creator ID");
    }
	
	@Test
    public void testGetCreatorGames() {
        List<Game> gameList = gameDAO.getCreatorGames(1);
        assertNotNull(gameList, "Not found");
        assertFalse(gameList.isEmpty(), "Empty creator game list");
        assertEquals(3, gameList.size(), "Not gotten all creator games");
    }
	
	@Test
    public void testGetAllGames() {
        List<Game> gameList = gameDAO.getAllGames();
        assertNotNull(gameList, "Not found");
        assertFalse(gameList.isEmpty(), "Empty game list");
        assertEquals(gameDAO.getGameCount(), gameList.size(), "Not gotten all games");
    }
	
	@Test
	public void testCreateGame() {
		boolean result = gameDAO.createGame(new Game("Test game", 1));
		assertTrue(result, "Not created correctly");
		
		Game game = gameDAO.getGameById(gameDAO.getLastGameID());
        assertNotNull(game, "Not found created");
        assertEquals("Test game", game.getName(), "Incorrect name");
        assertEquals(1, game.getCreatorId(), "Incorrect creator ID");

        result = gameDAO.deleteGame(gameDAO.getLastGameID());
		assertTrue(result, "Not deleted correctly");
	}
	
	@Test
	public void testUpdateGame() {
		boolean result = gameDAO.updateGame(3, new Game("Test update", 1));
		assertTrue(result, "Not updated correctly");
		
		Game game = gameDAO.getGameById(3);
        assertNotNull(game, "Not found updated");
        assertEquals("Test update", game.getName(), "Incorrect name");
        assertEquals(1, game.getCreatorId(), "Incorrect creator ID");
        

		result = gameDAO.updateGame(3, new Game("HangedMan", 1));
		assertTrue(result, "Not updated back correctly");
	}
	
	@Test
	public void testDeleteGame() {
		boolean result = gameDAO.createGame(new Game("Test game", 1));
		assertTrue(result, "Not created correctly");
		
		int gamesCount = gameDAO.getGameCount();
		
        result = gameDAO.deleteGame(gameDAO.getLastGameID());
		assertTrue(result, "Not deleted correctly");
		
		assertEquals(gameDAO.getGameCount(), gamesCount - 1, "Not deleted correctly");
	}
}
