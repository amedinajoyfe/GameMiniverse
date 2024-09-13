package joyfe.gamesMiniverse.TestingClasses;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
@RunWith(Suite.class)
@Suite.SuiteClasses({
    TestGameDAOImplement.class,
    TestUserDAOImplement.class,
    TestAchievementDAOImplement.class
})
public class AllDAOImplementTesting {

}
