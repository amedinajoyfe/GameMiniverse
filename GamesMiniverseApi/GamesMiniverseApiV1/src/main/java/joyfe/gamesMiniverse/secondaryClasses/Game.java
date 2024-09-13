package joyfe.gamesMiniverse.secondaryClasses;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class Game {
	long id;

	@NotNull(message = "El nombre del juego no puede estar vacío")
	@Size(min = 6, max = 20, message = "El nombre del juego debe tener entre 6 y 20 caracteres")
	String name;
	
	long creatorId;

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
	
	public long getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(long id) {
		this.creatorId = id;
	}

	public Game(@JsonProperty("id") long id, @JsonProperty("name") String name, @JsonProperty("creatorId") long creatorId) {
		this.id = id;
		this.name = name;
		this.creatorId = creatorId;
	}
	public Game(@JsonProperty("name") String name, @JsonProperty("creatorId") long creatorId) {
		this.name = name;
		this.creatorId = creatorId;
	}

}