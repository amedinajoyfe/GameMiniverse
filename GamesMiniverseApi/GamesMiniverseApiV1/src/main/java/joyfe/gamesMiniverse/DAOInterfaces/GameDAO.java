package joyfe.gamesMiniverse.DAOInterfaces;

import java.util.List;

import joyfe.gamesMiniverse.secondaryClasses.Game;

public interface GameDAO {
	Game getGameById(long id);
	List<Game> getCreatorGames(long creatorId);
	List<Game> getAllGames();
	boolean createGame(Game newGame);
	boolean updateGame(long id, Game newGame);
	boolean deleteGame(long id);
	int getLastGameID();
	int getGameCount();
}
