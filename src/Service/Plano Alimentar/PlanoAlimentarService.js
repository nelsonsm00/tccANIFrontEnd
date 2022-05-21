/*IMPORT SERVICE */
import RequestService from "../RequestService";

class PlanoAlimentarService extends RequestService{
    static ROTA = "PlanoAlimentar";

    static async Get(id) {
        var endPoint = PlanoAlimentarService.ROTA;
        var response = await RequestService.request(endPoint, [id], RequestService.GET, {}, {}, false);
        return response;
    }

    static async Lista(tratamento) {
        var endPoint = PlanoAlimentarService.ROTA + "/Lista";
        var response = await RequestService.request(endPoint, [tratamento], RequestService.GET);
        return response;
    }  

    static async ListaNaoVinculadas(tratamento) {
        var endPoint = PlanoAlimentarService.ROTA + "/Lista/NaoVinculadas";
        var response = await RequestService.request(endPoint, [tratamento], RequestService.GET);
        return response;
    } 

    static async Post(registro, tratamento) {
        var endPoint = PlanoAlimentarService.ROTA;
        var response = await RequestService.request(endPoint, [tratamento], RequestService.POST, registro, {}, false);
        return response;
    }

    static async Importar(id, tratamento) {
        var endPoint = PlanoAlimentarService.ROTA;
        var response = await RequestService.request(endPoint, [id, tratamento], RequestService.POST, {}, {}, false);
        return response;
    }

    static async Put(registro) {
        var endPoint = PlanoAlimentarService.ROTA;
        var response = await RequestService.request(endPoint, [], RequestService.PUT, registro);
        return response;
    }

    static async Delete(id) {
        var endPoint = PlanoAlimentarService.ROTA;
        var response = await RequestService.request(endPoint, [id], RequestService.DELETE);
        return response;
    }
}

export default PlanoAlimentarService;