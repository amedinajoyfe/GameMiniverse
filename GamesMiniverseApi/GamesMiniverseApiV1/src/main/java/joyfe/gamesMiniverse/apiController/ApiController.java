package joyfe.gamesMiniverse.apiController;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import joyfe.gamesMiniverse.secondaryClasses.Achievement;
import joyfe.gamesMiniverse.secondaryClasses.Game;
import joyfe.gamesMiniverse.secondaryClasses.LoginRequest;
import joyfe.gamesMiniverse.secondaryClasses.User;
import joyfe.gamesMiniverse.services.AchievementsService;
import joyfe.gamesMiniverse.services.GamesService;
import joyfe.gamesMiniverse.services.UsersService;

@RestController
@RequestMapping("/${api-version}/${api-name}")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT })
public class ApiController {
	@Autowired
	UsersService usersService;

	@Autowired
	GamesService gamesService;

	@Autowired
	AchievementsService achievementsService;

	@Value("${users-endpoint}")
	String usersEndpoint;
	@Value("${games-endpoint}")
	String gamesEndpoint;
	@Value("${achievements-endpoint}")
	String achievementsEndpoint;

	
	// Testing calls //

	
	@Tag(name = "Testing")
	@Operation(summary = "Comprobacion", description = "Este endpoint te comprobar si la Api está activa")
	@GetMapping(path = "/${users-endpoint}", produces = MediaType.APPLICATION_JSON_VALUE)
	public String testApi() {
		return "Hola";
	}

	@Tag(name = "Testing")
	@Operation(summary = "Comprobacion de JSON", description = "Este endpoint te comprobar si se reciben bien los JSON")
	@GetMapping(path = "/testJson", produces = MediaType.APPLICATION_JSON_VALUE)
	public Map<String, Object> getData() {
		Map<String, Object> responseData = new HashMap<>();
		responseData.put("key4", "value1");
		responseData.put("key5", "value2");

		// Maps are converted to jsons on requests
		return responseData;
	}

	
	// User api //

	@Tag(name = "${users-api-title}", description = "${users-api-description}")
	@Operation(summary = "${get-user-title}", description = "${get-user-description}")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "${get-user-ok-response}"),
			@ApiResponse(responseCode = "400", description = "${unexpected-error}"),
			@ApiResponse(responseCode = "404", description = "${user-not-found}") })
	@GetMapping(path = "/${users-endpoint}/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> getUserById(@PathVariable long id) {
		return ResponseEntity.ok().body(usersService.getUserById(id));
	}

	@Tag(name = "${users-api-title}")
	@Operation(summary = "${post-user-title}", description = "${post-user-description}")
	@ApiResponses(value = { @ApiResponse(responseCode = "201", description = "${post-user-ok-response}"),
			@ApiResponse(responseCode = "400", description = "${unexpected-error}") })
	@PostMapping(path = "/${users-endpoint}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> addUser(@RequestBody @Valid User newUser) throws URISyntaxException {
		if (usersService.addUser(newUser))
			return ResponseEntity.created(new URI(usersEndpoint + "/" + newUser.getId())).body(newUser);
		return ResponseEntity.status(HttpStatus.CONFLICT).build();
	}

	@Tag(name = "${users-api-title}")
	@Operation(summary = "${put-user-title}", description = "${put-user-description}")
	@ApiResponses(value = { @ApiResponse(responseCode = "201", description = "${put-user-ok-response}"),
			@ApiResponse(responseCode = "400", description = "${unexpected-error}"),
			@ApiResponse(responseCode = "404", description = "${user-not-found}") })
	@PutMapping(path = "/${users-endpoint}/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> updateUser(@PathVariable long id, @RequestBody @Valid User newUser)
			throws URISyntaxException {
		return usersService.updateUser(id, newUser)
				? ResponseEntity.created(new URI(usersEndpoint + "/" + id)).body(newUser)
				: ResponseEntity.notFound().build();
	}

	@Tag(name = "${users-api-title}")
	@Operation(summary = "${delete-user-title}", description = "${delete-user-description}")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "${delete-user-ok-response}"),
			@ApiResponse(responseCode = "400", description = "${unexpected-error}"),
			@ApiResponse(responseCode = "403", description = "${permission-denied}"),
			@ApiResponse(responseCode = "404", description = "${user-not-found}") })
	@DeleteMapping(path = "/${users-endpoint}/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> deleteUser(@PathVariable long id) {
		return usersService.deleteUser(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
	}

	
	// Game api //

	
	@Tag(name = "${games-api-title}", description = "${games-api-description}")
	@Operation(summary = "${get-game-title}", description = "${get-game-description}")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "${get-game-ok-response}"),
			@ApiResponse(responseCode = "400", description = "${unexpected-error}"),
			@ApiResponse(responseCode = "404", description = "${game-not-found}") })
	@GetMapping(path = "/${games-endpoint}/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Game> getGameById(@PathVariable long id) {
		return ResponseEntity.ok().body(gamesService.getGameById(id));
	}
	
	@Tag(name = "${games-api-title}")
	@Operation(summary = "${get-games-title}", description = "${get-games-description}")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "${get-games-ok-response}"),
			@ApiResponse(responseCode = "400", description = "${unexpected-error}"),
			@ApiResponse(responseCode = "404", description = "${games-not-found}") })
	@GetMapping(path = "/${games-endpoint}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Game>> getAllGames() {
		return ResponseEntity.ok().body(gamesService.getGameList());
	}	
	
	@Tag(name = "${games-api-title}")
	@Operation(summary = "${get-creator-games-title}", description = "${get-creator-games-description}")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "${get-creator-games-ok-response}"),
			@ApiResponse(responseCode = "400", description = "${unexpected-error}"),
			@ApiResponse(responseCode = "404", description = "${games-not-found}") })
	@GetMapping(path = "/${users-endpoint}/{id}/${games-endpoint}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Game>> getCreatorGames(@PathVariable long id) {
		return ResponseEntity.ok().body(gamesService.getCreatorGames(id));
	}
	

	@Tag(name = "${games-api-title}")
	@Operation(summary = "${post-game-title}", description = "${post-game-description}")
	@ApiResponses(value = { @ApiResponse(responseCode = "201", description = "${post-game-ok-response}"),
			@ApiResponse(responseCode = "400", description = "${unexpected-error}") })

	@PostMapping(path = "/${games-endpoint}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Game> addGame(@RequestBody @Valid Game newGame) throws URISyntaxException {
		gamesService.addGame(newGame);
		return ResponseEntity.created(new URI(gamesEndpoint + "/" + newGame.getId())).body(newGame);
	}

	@Tag(name = "${games-api-title}")
	@Operation(summary = "${put-game-title}", description = "${put-game-description}")
	@ApiResponses(value = { @ApiResponse(responseCode = "201", description = "${put-game-ok-response}"),
			@ApiResponse(responseCode = "400", description = "${unexpected-error}"),
			@ApiResponse(responseCode = "404", description = "${game-not-found}") })
	@PutMapping(path = "/${games-endpoint}/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Game> updateGame(@PathVariable long id, @RequestBody @Valid Game newGame)
			throws URISyntaxException {
		return gamesService.updateGame(id, newGame)
				? ResponseEntity.ok().location(new URI(gamesEndpoint + "/" + id)).body(newGame)
				: ResponseEntity.notFound().build();
	}

	@Tag(name = "${games-api-title}")
	@Operation(summary = "${delete-game-title}", description = "${delete-game-description}")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "${delete-game-ok-response}"),
			@ApiResponse(responseCode = "400", description = "${unexpected-error}"),
			@ApiResponse(responseCode = "403", description = "${permission-denied}"),
			@ApiResponse(responseCode = "404", description = "${game-not-found}") })
	@DeleteMapping(path = "/${games-endpoint}/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Game> deleteGame(@PathVariable long id) {
		return gamesService.deleteGame(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
	}

	
	// Achievement api //

	
	@Tag(name = "${achievements-api-title}", description = "${achievements-api-description}")
	@Operation(summary = "${get-achievement-title}", description = "${get-achievement-description}")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "${get-achievement-ok-response}"),
			@ApiResponse(responseCode = "400", description = "${unexpected-error}"),
			@ApiResponse(responseCode = "404", description = "${achievement-not-found}") })
	@GetMapping(path = "/${achievements-endpoint}/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Achievement> getAchievementById(@PathVariable long id) {
		return ResponseEntity.ok().body(achievementsService.getAchievementById(id));
	}	
	
	@Tag(name = "${achievements-api-title}")
	@Operation(summary = "${get-achievements-title}", description = "${get-achievements-description}")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "${get-achievements-ok-response}"),
			@ApiResponse(responseCode = "400", description = "${unexpected-error}"),
			@ApiResponse(responseCode = "404", description = "${achievements-not-found}") })
	@GetMapping(path = "/${achievements-endpoint}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Achievement>> getAllAchievements() {
		return ResponseEntity.ok().body(achievementsService.getAchievementList());
	}	
	
	@Tag(name = "${achievements-api-title}")
	@Operation(summary = "${get-game-achievement-title}", description = "${get-game-achievement-description}")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "${get-game-achievements-ok-response}"),
			@ApiResponse(responseCode = "400", description = "${unexpected-error}"),
			@ApiResponse(responseCode = "404", description = "${achievements-not-found}") })
	@GetMapping(path = "/${games-endpoint}/{id}/${achievements-endpoint}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Achievement>> getGameAchievements(@PathVariable long id) {
		return ResponseEntity.ok().body(achievementsService.getGameAchievements(id));
	}

	@Tag(name = "${achievements-api-title}")
	@Operation(summary = "${post-achievement-title}", description = "${post-achievement-description}")
	@ApiResponses(value = { @ApiResponse(responseCode = "201", description = "${post-achievement-ok-response}"),
			@ApiResponse(responseCode = "400", description = "${unexpected-error}") })

	@PostMapping(path = "/${achievements-endpoint}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Achievement> addAchievement(@RequestBody @Valid Achievement newAchievement)
			throws URISyntaxException {
		achievementsService.addAchievement(newAchievement);
		return ResponseEntity.created(new URI(achievementsEndpoint + "/" + newAchievement.getId()))
				.body(newAchievement);
	}

	@Tag(name = "${achievements-api-title}")
	@Operation(summary = "${put-achievement-title}", description = "${put-achievement-description}")
	@ApiResponses(value = { @ApiResponse(responseCode = "201", description = "${put-achievement-ok-response}"),
			@ApiResponse(responseCode = "400", description = "${unexpected-error}"),
			@ApiResponse(responseCode = "404", description = "${achievement-not-found}") })
	@PutMapping(path = "/${achievements-endpoint}/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Achievement> updateAchievement(@PathVariable long id,
			@RequestBody @Valid Achievement newAchievement) throws URISyntaxException {
		return achievementsService.updateAchievement(id, newAchievement)
				? ResponseEntity.created(new URI(achievementsEndpoint + "/" + id)).body(newAchievement)
				: ResponseEntity.notFound().build();
	}

	@Tag(name = "${achievements-api-title}")
	@Operation(summary = "${delete-achievement-title}", description = "${delete-achievement-description}")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "${delete-achievement-ok-response}"),
			@ApiResponse(responseCode = "400", description = "${unexpected-error}"),
			@ApiResponse(responseCode = "403", description = "${permission-denied}"),
			@ApiResponse(responseCode = "404", description = "${achievement-not-found}") })
	@DeleteMapping(path = "/${achievements-endpoint}/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Achievement> deleteAchievement(@PathVariable long id) {
		return achievementsService.deleteAchievement(id) ? ResponseEntity.ok().build()
				: ResponseEntity.notFound().build();
	}

	
	// Login api //

	
	@Tag(name = "${login-api-title}", description = "${login-api-description}")
	@Operation(summary = "${login-title}", description = "${login-description}")
	@ApiResponses(value = { @ApiResponse(responseCode = "201", description = "${login-ok-response}"),
			@ApiResponse(responseCode = "404", description = "${user-not-found}"),
			@ApiResponse(responseCode = "400", description = "${unexpected-error}") })
	@PostMapping(path = "/${login-endpoint}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> makeLogin(@RequestBody @Valid LoginRequest loginRequest) throws URISyntaxException {
		User loggedUser = usersService.logIn(loginRequest);
		if (loggedUser != null)
			return ResponseEntity.ok().body(loggedUser);
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}
}