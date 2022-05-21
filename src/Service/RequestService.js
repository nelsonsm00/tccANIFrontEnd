/*IMPORT REACT */
import axios from "axios";

/* IMPORT GERAL */
import Cache from "../Geral/Cache/Cache";

class RequestService {

    static GET = "GET";
    static POST = "POST";
    static PUT = "PUT";
    static DELETE = "DELETE";

    static getHeaders(headers = {}) {
        headers["Access-Control-Allow-Origin"] = "*";
        headers.Conta = Cache.conta.get;
        headers.Authorization = "Bearer " + Cache.token.get;
        return headers;
    }

    static getEndPoint(endPoint, params = []) {
        params.map((p) => {endPoint += "/" + p});
        return "https://tccanibackend.azurewebsites.net/" + endPoint;
    }

    static async request(endPoint, paramsEndPoint = [], method, params = {}, headers = {}, converteResponseJson = true) {
        endPoint = RequestService.getEndPoint(endPoint, paramsEndPoint);
        headers = RequestService.getHeaders(headers);
        var response = null;
        try {
            if (method == RequestService.GET) {
                response = await axios({ headers: headers, method: RequestService.GET, url: endPoint });
            }
            else if (method == RequestService.POST) {
                response = await axios.post(endPoint, params, {headers: headers});
            }
            else if (method == RequestService.PUT) {
                response = await axios.put(endPoint, params, {headers: headers});
            }
            else if (method == RequestService.DELETE) {
                response = await axios.delete(endPoint, {headers: headers})
            }

            if (response.hasOwnProperty("data"))
                    return RequestService.getResponseRequestJson(response.data, null, converteResponseJson);
            else
                return RequestService.getResponseRequestJson(null, null, converteResponseJson);
        }
        catch(erro){
            return RequestService.getResponseRequestJson(null, erro, converteResponseJson);
        }
    } 

    static getResponseRequestJson(response, erro = null, converteResponseJson = true) {
        if (converteResponseJson) {
            if (response != null)
                response = RequestService.converteResponseJson(response);
            else
                response = [];
        }

        if (erro != null) {
            if (erro.hasOwnProperty("response") && erro.response != undefined) {
                erro = erro.response;
                if (erro.hasOwnProperty("data") && erro.data != undefined && erro.data != "") {
                    erro = erro.data;
                    if (erro.hasOwnProperty("mensagemDeErro"))
                        erro = erro.mensagemDeErro;
                    else if(erro.hasOwnProperty("mensagem")) {
                        erro = erro.mensagem;
                    }
                }
            }
            
            if (erro.hasOwnProperty("message") && erro.message != undefined)
                erro = erro.message;
            else if (erro.hasOwnProperty("status")) {
                if (erro.status == 415 || erro.status == 400) {
                    erro = erro.title;
                }
                //Token inválido, redireciona para a tela de login
                else if (erro.status == 401) {
                    Cache.reseta();
                    document.location.href = "/";
                }
            } 
        }

        return {
            response: response,
            erro: erro
        };
    }

    static converteResponseJson(response) {
        return Object.keys(response).map((i) => response[Number(i)]);
    }

    static verificaErro(response) {
        return response.erro != null;
    }
}

export default RequestService;