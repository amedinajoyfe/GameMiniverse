package joyfe.gamesMiniverse.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import joyfe.gamesMiniverse.DAOInterfaces.GameDAO;
import joyfe.gamesMiniverse.errors.CustomGameNotFound;
import joyfe.gamesMiniverse.secondaryClasses.Game;

@Service("gamesService")
public class GamesService {

	@Autowired
	GameDAO gameDAO;
	
	public List<Game> getGameList() {
		return gameDAO.getAllGames();
	}
	
	public List<Game> getCreatorGames(long id) {
		return gameDAO.getCreatorGames(id);
	}

	public Game getGameById(long id) throws CustomGameNotFound {
		return gameDAO.getGameById(id);
	}

	public boolean addGame(Game newGame) {
		return gameDAO.createGame(newGame);
	}
	
	public boolean updateGame(long id, Game newGame) {

		return gameDAO.updateGame(id, newGame);
	}

	public boolean deleteGame(long id) {

		return gameDAO.deleteGame(id);
	}
}