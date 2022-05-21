/*IMPORT SERVICE */
import RequestService from "../RequestService";

class FormularioService extends RequestService{
    static ROTA = "Formulario";

    static async Lista() {
        var endPoint = FormularioService.ROTA + "/Lista";
        var response = await RequestService.request(endPoint, [], RequestService.GET);
        return response;
    }

    static async ListaAnamnese() {
        var endPoint = FormularioService.ROTA + "/Lista/Anamnese";
        var response = await RequestService.request(endPoint, [], RequestService.GET);
        return response;
    }

    static async Get(id) {
        var endPoint = FormularioService.ROTA;
        var response = await RequestService.request(endPoint, [id], RequestService.GET, {}, {}, false);
        return response;
    }

    static async GetFormularioResposta(tratamento, id) {
        var endPoint = FormularioService.ROTA;
        var response = await RequestService.request(endPoint, [tratamento, id], RequestService.GET, {}, {}, false);
        return response;
    }

    static async Post(registro) {
        var endPoint = FormularioService.ROTA;
        var response = await RequestService.request(endPoint, [], RequestService.POST, registro);
        return response;
    }

    static async AlteraOrdem(registro) {
        var endPoint = FormularioService.ROTA + "/AlteraOrdem";
        var response = await RequestService.request(endPoint, [], RequestService.POST, registro);
        return response;
    }

    static async Responde(registro, tratamento, id) {
        var endPoint = FormularioService.ROTA + "/Responde";
        var response = await RequestService.request(endPoint, [tratamento, id], RequestService.POST, registro);
        return response;
    }

    static async Put(registro) {
        var endPoint = FormularioService.ROTA;
        var response = await RequestService.request(endPoint, [], RequestService.PUT, registro);
        return response;
    }    

    static async Delete(id) {
        var endPoint = FormularioService.ROTA;
        var response = await RequestService.request(endPoint, [id], RequestService.DELETE);
        return response;
    }
}

export default FormularioService;