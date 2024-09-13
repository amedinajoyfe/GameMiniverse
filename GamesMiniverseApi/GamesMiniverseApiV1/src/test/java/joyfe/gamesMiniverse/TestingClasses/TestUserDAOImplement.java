package joyfe.gamesMiniverse.TestingClasses;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import de.rtner.security.auth.spi.SimplePBKDF2;
import joyfe.gamesMiniverse.DAOInterfaces.UserDAO;
import joyfe.gamesMiniverse.secondaryClasses.User;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("testing")
public class TestUserDAOImplement {

	SimplePBKDF2 passwordEncoder = new SimplePBKDF2();
	
	@Autowired
	UserDAO userDAO;
	
	@Test
    public void testGetUserById() {
        User user = userDAO.getUserById(1);
        assertNotNull(user, "Not found");
        assertEquals("Medina", user.getUsername(), "Incorrect name");
        assertEquals("medina@correo.es", user.getEmail(), "Incorrect email");
    }
	
	@Test
    public void testGetUserByEmail() {
        User user = userDAO.getUserByEmail("medina@correo.es");
        assertNotNull(user, "Not found");
        assertEquals("Medina", user.getUsername(), "Incorrect name");
    }
	
	@Test
	public void testCreateUser() {
		boolean result = userDAO.createUser(new User("Medina2", "medina2@correo.es", "123456"));
		assertTrue(result, "Not created correctly");
		
		User user = userDAO.getUserById(userDAO.getLastUserID());
        assertNotNull(user, "Not found created");
        assertEquals("Medina2", user.getUsername(), "Incorrect name");
        assertEquals("medina2@correo.es", user.getEmail(), "Incorrect email");

        result = userDAO.deleteUser(userDAO.getLastUserID());
		assertTrue(result, "Not deleted correctly");
	}
	
	@Test
	public void testUpdateUser() {
		boolean result = userDAO.updateUser(1, new User("MedinaUpdate", "medina@correo.es", "123456"));
		assertTrue(result, "Not updated correctly");
		
		User user = userDAO.getUserById(1);
        assertNotNull(user, "Not found updated");
        assertEquals("MedinaUpdate", user.getUsername(), "Incorrect name");
        assertEquals("medina@correo.es", user.getEmail(), "Incorrect email");

		result = userDAO.updateUser(1, new User("Medina", "medina@correo.es", "123456"));
		assertTrue(result, "Not updated back correctly");
	}
	
	@Test
	public void testDeleteUser() {
		boolean result = userDAO.createUser(new User("Medina2", "medina2@correo.es", "123456"));
		assertTrue(result, "Not created correctly");
		
		int gamesCount = userDAO.getUserCount();
		
        result = userDAO.deleteUser(userDAO.getLastUserID());
		assertTrue(result, "Not deleted correctly");
		
		assertEquals(userDAO.getUserCount(), gamesCount - 1, "Not deleted correctly");
	}
}
