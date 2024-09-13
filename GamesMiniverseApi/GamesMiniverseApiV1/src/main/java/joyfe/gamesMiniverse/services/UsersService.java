package joyfe.gamesMiniverse.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.rtner.security.auth.spi.SimplePBKDF2;
import joyfe.gamesMiniverse.DAOInterfaces.UserDAO;
import joyfe.gamesMiniverse.errors.CustomInvalidLogin;
import joyfe.gamesMiniverse.errors.CustomUserNotFound;
import joyfe.gamesMiniverse.secondaryClasses.LoginRequest;
import joyfe.gamesMiniverse.secondaryClasses.User;

@Service("usersService")
public class UsersService {
	
	SimplePBKDF2 passwordEncoder = new SimplePBKDF2();
	
	@Autowired
	private UserDAO userDAO;

	public User getUserById(long id) throws CustomUserNotFound {
		return userDAO.getUserById(id);
	}
	
	public boolean addUser(User newUser) {
		newUser.setPassword(passwordEncoder.deriveKeyFormatted(newUser.getPassword()));
		return userDAO.createUser(newUser);
	}


	public boolean updateUser(long id, User newUser) {
		newUser.setPassword(passwordEncoder.deriveKeyFormatted(newUser.getPassword()));
		return userDAO.updateUser(id, newUser);
	}

	public boolean deleteUser(long id) {
		return userDAO.deleteUser(id);
	}
	
	public User logIn(LoginRequest loginRequest) throws CustomInvalidLogin {
		User foundUser = userDAO.getUserByEmail(loginRequest.getEmail());
		if (passwordEncoder.verifyKeyFormatted(foundUser.getPassword(), loginRequest.getPassword()))
			return foundUser;
		else
			return null;
	}
}