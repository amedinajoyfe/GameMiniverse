class userSession{
    static loggedIn = false;
    static username = "Invitado";

    static logIn(_username){
        username = _username;
        loggedIn = false;
    }
}

export default userSession;