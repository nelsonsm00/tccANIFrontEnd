/*IMPORT SERVICE */
import RequestService from "../RequestService";

class OrientacaoService extends RequestService{
    static ROTA = "Orientacao";

    static async Get(id) {
        var endPoint = OrientacaoService.ROTA;
        var response = await RequestService.request(endPoint, [id], RequestService.GET, {}, {}, false);
        return response;
    }

    static async Lista(tratamento = null) {
        var endPoint = OrientacaoService.ROTA + "/Lista";
        var response = await RequestService.request(endPoint, [tratamento != null ? tratamento : ""], RequestService.GET);
        return response;
    }

    static async ListaNaoVinculada(tratamento) {
        var endPoint = OrientacaoService.ROTA + "/Lista/NaoVinculadas";
        var response = await RequestService.request(endPoint, [tratamento], RequestService.GET);
        return response;
    }    

    static async Post(registro, tratamento = null) {
        var endPoint = OrientacaoService.ROTA;
        var response = await RequestService.request(endPoint, [tratamento != null ? tratamento : ""], RequestService.POST, registro);
        return response;
    }

    static async Vincular(id, tratamento) {
        var endPoint = OrientacaoService.ROTA + "/Vincular";
        var response = await RequestService.request(endPoint, [id, tratamento], RequestService.POST);
        return response;
    }

    static async Put(registro) {
        var endPoint = OrientacaoService.ROTA;
        var response = await RequestService.request(endPoint, [], RequestService.PUT, registro);
        return response;
    }    

    static async Delete(id, tratamento = null) {
        var endPoint = OrientacaoService.ROTA;
        var response = await RequestService.request(endPoint, [id, tratamento != null ? tratamento : ""], RequestService.DELETE);
        return response;
    }
}

export default OrientacaoService;