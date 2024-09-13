package joyfe.gamesMiniverse.secondaryClasses;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class Achievement {
	private long id;
	
	@NotNull(message = "El nombre del logro no puede estar vacío")
	@Size(min = 6, max = 20, message = "El nombre del logro debe tener entre 6 y 20 caracteres")
	private String name;

	@NotNull(message = "La descripción del logro no puede estar vacía")
	private String description;
	private long gameId;
	
	public Achievement(@JsonProperty("id") long id, @JsonProperty("name") String name, @JsonProperty("description") String description, @JsonProperty("gameId") long gameId) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.gameId = gameId;
	}
	public Achievement(@JsonProperty("name") String name, @JsonProperty("description") String description, @JsonProperty("gameId") long gameId) {
		this.name = name;
		this.description = description;
		this.gameId = gameId;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public long getGameId() {
		return gameId;
	}
	public void setGameId(long id) {
		this.gameId = id;
	}
	
}
