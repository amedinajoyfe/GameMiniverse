package joyfe.gamesMiniverse.secondaryClasses;

import jakarta.validation.constraints.NotNull;

public class LoginRequest {
	@NotNull(message = "El correo no puede estar vacío")
    private String email;
	@NotNull(message = "La contraseña no puede estar vacía")
    private String password;
    
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public LoginRequest(String email, String password) {
		this.email = email;
		this.password = password;
	}
}
