package joyfe.gamesMiniverse.errors;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

public class CustomErrorMessage {
	private HttpStatus state;
	private LocalDateTime date;
	private String message;

	public HttpStatus getState() {
		return state;
	}

	public void setState(HttpStatus state) {
		this.state = state;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public CustomErrorMessage(HttpStatus state, String message) {
		this.state = state;
		this.message = message;
		this.date = LocalDateTime.now();
	}
}
