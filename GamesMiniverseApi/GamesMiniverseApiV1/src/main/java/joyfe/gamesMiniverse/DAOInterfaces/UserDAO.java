package joyfe.gamesMiniverse.DAOInterfaces;

import joyfe.gamesMiniverse.secondaryClasses.User;

public interface UserDAO {
	User getUserById(long id);
	User getUserByEmail(String email);
	boolean createUser(User user);
	boolean updateUser(long id, User user);
	boolean deleteUser(long id);
	int getUserCount();
	int getLastUserID();
}
