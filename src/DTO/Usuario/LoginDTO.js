class LoginDTO {
    static json(login = null, senha = null, origem = 1) {
        return {
            login: login,
            senha: senha,
            origem: origem
        };
    }
}

export default LoginDTO;