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

import joyfe.gamesMiniverse.DAOInterfaces.AchievementDAO;
import joyfe.gamesMiniverse.secondaryClasses.Achievement;

@Repository
@Profile("production")
public class AchievementDAOImplement implements AchievementDAO {
	
    @Value("${databaseUrl}")
    private String jdbcUrl;

    @Value("${databaseUsername}")
    private String username;

    @Value("${databasePassword}")
    private String password;
	
	@Override
	public Achievement getAchievementById(long id) {
		Achievement achievement = null;
		String query = "SELECT * FROM achievements WHERE id = ?";
		
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
	             PreparedStatement pstmt = conn.prepareStatement(query)) {
	            
	            pstmt.setLong(1, id);

	            try (ResultSet rs = pstmt.executeQuery()) {
	                if (rs.next()) {
	                	achievement = new Achievement(rs.getLong("id"), rs.getString("name"), rs.getString("description"), rs.getLong("id_game"));
	                }
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }

	        return achievement;
	}

	@Override
	public List<Achievement> getGameAchievements(long gameId) {
		List<Achievement> achievementList = new ArrayList<>();
		String query = "SELECT * FROM achievements WHERE id_game = ?";
		
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
	             PreparedStatement pstmt = conn.prepareStatement(query)) {
				
				pstmt.setLong(1, gameId);
	            try (ResultSet rs = pstmt.executeQuery()) {
	                while (rs.next()) {
	                	Achievement foundAchievement = new Achievement(rs.getLong("id"), rs.getString("name"), rs.getString("description"), rs.getLong("id_game"));
	                	achievementList.add(foundAchievement);
	                }
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }

	        return achievementList;
	}

	@Override
	public List<Achievement> getAllAchievements() {
		List<Achievement> achievementList = new ArrayList<>();
		String query = "SELECT * FROM achievements";
		
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
	             PreparedStatement pstmt = conn.prepareStatement(query)) {

	            try (ResultSet rs = pstmt.executeQuery()) {
	                while (rs.next()) {
	                	Achievement foundAchievement = new Achievement(rs.getLong("id"), rs.getString("name"), rs.getString("description"), rs.getLong("id_game"));
	                	achievementList.add(foundAchievement);
	                }
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }

	        return achievementList;
	}
	
	@Override
	public int getLastAchievementID() {
		int lastAchievementID = 0;
		String query = "SELECT id FROM achievements ORDER BY id DESC LIMIT 1";
		
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
	             PreparedStatement pstmt = conn.prepareStatement(query)) {

	            try (ResultSet rs = pstmt.executeQuery()) {
	                if (rs.next()) {
	                	lastAchievementID = rs.getInt("id");
	                }
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }

	        return lastAchievementID;
	}
	
	@Override
	public int getAchievementCount() {
		int achievementCount = 0;
		String query = "SELECT COUNT(*) as count FROM achievements";
		
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
	             PreparedStatement pstmt = conn.prepareStatement(query)) {

	            try (ResultSet rs = pstmt.executeQuery()) {
	                if (rs.next()) {
	                	achievementCount = rs.getInt("count");
	                }
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }

	        return achievementCount;
	}

	@Override
	public boolean createAchievement(Achievement newAchievement) {
		String query = "INSERT INTO achievements(name, description, id_game) VALUES(?, ?, ?)";
		
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
	             PreparedStatement pstmt = conn.prepareStatement(query)) {

            pstmt.setString(1, newAchievement.getName());
            pstmt.setString(2, newAchievement.getDescription());
            pstmt.setLong(3, newAchievement.getGameId());
            pstmt.executeUpdate();
	        return true;
            
	        } catch (SQLException e) {
	            e.printStackTrace();
		        return false;
	        }

	}

	@Override
	public boolean updateAchievement(long id, Achievement newAchievement) {
		String query = "UPDATE achievements SET name = ?, description = ? WHERE id = ?";
		
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
             PreparedStatement pstmt = conn.prepareStatement(query)) {

	        pstmt.setString(1, newAchievement.getName());
	        pstmt.setString(2, newAchievement.getDescription());
	        pstmt.setLong(3, id);
	        pstmt.executeUpdate();
	        return true;
	        
	        } catch (SQLException e) {
	            e.printStackTrace();
		        return false;
	        }

	}

	@Override
	public boolean deleteAchievement(long id) {
		String query = "DELETE FROM achievements WHERE id = ?";
		
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
	         PreparedStatement pstmt = conn.prepareStatement(query)) {
			
	        pstmt.setLong(1, id);
	        pstmt.executeUpdate();

	        return true;
	        } catch (SQLException e) {
	            e.printStackTrace();
		        return false;
	        }
	}

}
