/*IMPORT SERVICE */
import RequestService from "../RequestService";

class LoginService extends RequestService{
    static ROTA = "";

    static async Login(parametros) {
        var endPoint = LoginService.ROTA + "Login";
        var response = await RequestService.request(endPoint, [], RequestService.POST, parametros, {}, false);
        return response;
    }
}

export default LoginService;