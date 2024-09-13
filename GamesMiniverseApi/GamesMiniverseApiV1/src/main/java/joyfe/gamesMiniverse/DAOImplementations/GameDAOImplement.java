package joyfe.gamesMiniverse.DAOImplementations;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import joyfe.gamesMiniverse.DAOInterfaces.GameDAO;
import joyfe.gamesMiniverse.secondaryClasses.Game;

@Repository
@Profile("production")
public class GameDAOImplement implements GameDAO {

    @Value("${databaseUrl}")
    private String jdbcUrl;

    @Value("${databaseUsername}")
    private String username;

    @Value("${databasePassword}")
    private String password;
	
	@Override
	public Game getGameById(long id) {
		Game game = null;
		String query = "SELECT * FROM games WHERE id = ?";
		
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
	             PreparedStatement pstmt = conn.prepareStatement(query)) {
	            
	            pstmt.setLong(1, id);

	            try (ResultSet rs = pstmt.executeQuery()) {
	                if (rs.next()) {
	                	game = new Game(rs.getLong("id"), rs.getString("name"), rs.getLong("id_creator"));
	                }
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }

	        return game;
	}

	@Override
	public List<Game> getCreatorGames(long creatorId) {
		List<Game> gameList = new ArrayList<>();
		String query = "SELECT * FROM games WHERE id_creator = ?";
		
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
	             PreparedStatement pstmt = conn.prepareStatement(query)) {
	            
	            pstmt.setLong(1, creatorId);

	            try (ResultSet rs = pstmt.executeQuery()) {
	                while (rs.next()) {
	                	Game foundGame = new Game(rs.getLong("id"), rs.getString("name"), rs.getLong("id_creator"));
	                	
	                	gameList.add(foundGame);
	                }
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }

	        return gameList;
	}

	@Override
	public List<Game> getAllGames() {
		List<Game> gameList = new ArrayList<>();
		String query = "SELECT * FROM games";
		
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
	             PreparedStatement pstmt = conn.prepareStatement(query)) {

	            try (ResultSet rs = pstmt.executeQuery()) {
	                while (rs.next()) {
	                	Game foundGame = new Game(rs.getLong("id"), rs.getString("name"), rs.getLong("id_creator"));
	                	
	                	gameList.add(foundGame);
	                }
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }

	        return gameList;
	}
	
	@Override
	public int getLastGameID() {
		int lastGameID = 0;
		String query = "SELECT id FROM games ORDER BY id DESC LIMIT 1";
		
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
	             PreparedStatement pstmt = conn.prepareStatement(query)) {

	            try (ResultSet rs = pstmt.executeQuery()) {
	                if (rs.next()) {
	                	lastGameID = rs.getInt("id");
	                }
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }

	        return lastGameID;
	}
	
	@Override
	public int getGameCount() {
		int gameCount = 0;
		String query = "SELECT COUNT(*) as count FROM games";
		
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
	             PreparedStatement pstmt = conn.prepareStatement(query)) {

	            try (ResultSet rs = pstmt.executeQuery()) {
	                if (rs.next()) {
	                	gameCount = rs.getInt("count");
	                }
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }

	        return gameCount;
	}

	@Override
	public boolean createGame(Game newGame) {
		String query = "INSERT INTO games(name, id_creator) VALUES(?, ?)";
		
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
	             PreparedStatement pstmt = conn.prepareStatement(query)) {

            pstmt.setString(1, newGame.getName());
            pstmt.setLong(2, newGame.getCreatorId());
            pstmt.executeUpdate();
	        return true;
	        } catch (SQLException e) {
	            e.printStackTrace();
		        return false;
	        }
	}

	@Override
	public boolean updateGame(long id, Game newGame) {
		String query = "UPDATE games SET name = ? WHERE id = ?";
	
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
             PreparedStatement pstmt = conn.prepareStatement(query)) {

	        pstmt.setString(1, newGame.getName());
	        pstmt.setLong(2, id);
	        pstmt.executeUpdate();

	        return true;
	        } catch (SQLException e) {
	            e.printStackTrace();
		        return false;
	        }

	}

	@Override
	public boolean deleteGame(long id) {
		
		List<Long> achievementList = new ArrayList<>();
		String query1 = "SELECT id FROM achievements WHERE id_game = ?";
		String query2 = "UPDATE achievements SET id_game = null WHERE id = ?";
		String query3 = "DELETE FROM games WHERE id = ?";
	
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
				PreparedStatement pstmt1 = conn.prepareStatement(query1);
				PreparedStatement pstmt2 = conn.prepareStatement(query2);
				PreparedStatement pstmt3 = conn.prepareStatement(query3)) {
			
			conn.setAutoCommit(false);
	        pstmt1.setLong(1, id);
	        try (ResultSet rs = pstmt1.executeQuery()) {
                while (rs.next()) {
                	achievementList.add(rs.getLong("id"));
                }
                
            for (Long currentId : achievementList) {
    	        pstmt2.setLong(1, currentId);
    	        pstmt2.executeUpdate();
			}
	        pstmt3.setLong(1, id);
	        pstmt3.executeUpdate();
            
	        conn.commit();
	        return true;
	        
	        } catch (SQLException e) {
	            e.printStackTrace();
		        return false;
	        }
		} catch (SQLException e1) {
			e1.printStackTrace();
	        return false;
		}
	}
}
