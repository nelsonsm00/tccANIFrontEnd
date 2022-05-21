/*IMPORT SERVICE */
import RequestService from "../RequestService";

class ConsultaService extends RequestService{
    static ROTA = "Consulta";

    static async Get(id) {
        var endPoint = ConsultaService.ROTA;
        var response = await RequestService.request(endPoint, [id], RequestService.GET, {}, {}, false);
        return response;
    }

    static async Atual(tratamento) {
        var endPoint = ConsultaService.ROTA + "/Atual";
        var response = await RequestService.request(endPoint, [tratamento], RequestService.GET, {}, {}, false);
        return response;
    }

    static async AtualLista(tratamento) {
        var endPoint = ConsultaService.ROTA + "/Atual/Lista";
        var response = await RequestService.request(endPoint, [tratamento], RequestService.GET);
        return response;
    }

    static async Realizadas(tratamento) {
        var endPoint = ConsultaService.ROTA + "/Realizadas";
        var response = await RequestService.request(endPoint, [tratamento], RequestService.GET);
        return response;
    }    

    static async Post(registro) {
        var endPoint = ConsultaService.ROTA;
        var response = await RequestService.request(endPoint, [], RequestService.POST, registro);
        return response;
    }

    static async Reagenda(registro) {
        var endPoint = ConsultaService.ROTA + "/Reagenda";
        var response = await RequestService.request(endPoint, [], RequestService.PUT, registro);
        return response;
    }

    static async Realiza(registro) {
        var endPoint = ConsultaService.ROTA + "/Realiza";
        var response = await RequestService.request(endPoint, [], RequestService.PUT, registro);
        return response;
    }

    static async Delete(id) {
        var endPoint = ConsultaService.ROTA;
        var response = await RequestService.request(endPoint, [id], RequestService.DELETE);
        return response;
    }
}

export default ConsultaService;