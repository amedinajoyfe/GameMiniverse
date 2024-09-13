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

import joyfe.gamesMiniverse.DAOInterfaces.UserDAO;
import joyfe.gamesMiniverse.secondaryClasses.User;

@Repository
@Profile("production")
public class UserDAOImplement implements UserDAO {

    @Value("${databaseUrl}")
    private String jdbcUrl;

    @Value("${databaseUsername}")
    private String username;

    @Value("${databasePassword}")
    private String password;
	
	@Override
	public User getUserById(long id) {
		User user = null;
		String query = "SELECT * FROM registeredUsers WHERE id = ?";
		
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
	             PreparedStatement pstmt = conn.prepareStatement(query)) {
	            
	            pstmt.setLong(1, id);

	            try (ResultSet rs = pstmt.executeQuery()) {
	                if (rs.next()) {
	                    user = new User(rs.getLong("id"), rs.getString("username"), rs.getString("email"), rs.getString("pass"));
	                }
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }

	        return user;
	}

	@Override
	public User getUserByEmail(String email) {
		User user = null;
		String query = "SELECT * FROM registeredUsers WHERE email LIKE ? LIMIT 1";
		
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
	             PreparedStatement pstmt = conn.prepareStatement(query)) {
	            
	            pstmt.setString(1, email);

	            try (ResultSet rs = pstmt.executeQuery()) {
	                if (rs.next()) 
	                    user = new User(rs.getLong("id"), rs.getString("username"), rs.getString("email"), rs.getString("pass"));
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }

	        return user;
	}
	
	@Override
	public int getLastUserID() {
		int lastUserID = 0;
		String query = "SELECT id FROM registeredUsers ORDER BY id DESC LIMIT 1";
		
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
	             PreparedStatement pstmt = conn.prepareStatement(query)) {

	            try (ResultSet rs = pstmt.executeQuery()) {
	                if (rs.next()) {
	                	lastUserID = rs.getInt("id");
	                }
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }

	        return lastUserID;
	}
	
	@Override
	public int getUserCount() {
		int userCount = 0;
		String query = "SELECT COUNT(*) as count FROM registeredUsers";
		
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
	             PreparedStatement pstmt = conn.prepareStatement(query)) {

	            try (ResultSet rs = pstmt.executeQuery()) {
	                if (rs.next()) {
	                	userCount = rs.getInt("count");
	                }
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }

	        return userCount;
	}

	@Override
	public boolean updateUser(long id, User user) {
		String query = "UPDATE registeredUsers SET username = ?, email = ?, pass = ? WHERE id = ?";
		
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
	             PreparedStatement pstmt = conn.prepareStatement(query)) {
	            
				pstmt.setString(1, user.getUsername());
		        pstmt.setString(2, user.getEmail());
		        pstmt.setString(3, user.getPassword());
		        pstmt.setLong(4, id);

		        pstmt.executeUpdate();
		        return true;
	        } catch (SQLException e) {
	            e.printStackTrace();
		        return false;
	        }
		
	}

	@Override
	public boolean createUser(User user) {
		String query = "INSERT INTO registeredUsers(username, email, pass) VALUES(?, ?, ?)";
		
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
	             PreparedStatement pstmt = conn.prepareStatement(query)) {

            pstmt.setString(1, user.getUsername());
            pstmt.setString(2, user.getEmail());
            pstmt.setString(3, user.getPassword());
            pstmt.executeUpdate();
	        return true;
            
	        } catch (SQLException e) {
	            e.printStackTrace();
		        return false;
	        }

	}

	@Override
	public boolean deleteUser(long id) {
		List<Long> gamesList = new ArrayList<>();
		String query1 = "SELECT id FROM games WHERE id_creator = ?";
		String query2 = "UPDATE games SET id_creator = null WHERE id = ?";
		String query3 = "DELETE FROM registeredUsers WHERE id = ?";
	
		try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
				PreparedStatement pstmt1 = conn.prepareStatement(query1);
				PreparedStatement pstmt2 = conn.prepareStatement(query2);
				PreparedStatement pstmt3 = conn.prepareStatement(query3)) {
			
			conn.setAutoCommit(false);
	        pstmt1.setLong(1, id);
	        try (ResultSet rs = pstmt1.executeQuery()) {
                while (rs.next()) {
                	gamesList.add(rs.getLong("id"));
                }
                
            for (Long currentId : gamesList) {
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
