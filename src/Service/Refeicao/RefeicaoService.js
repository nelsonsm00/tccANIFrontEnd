/*IMPORT SERVICE */
import RequestService from "../RequestService";

class RefeicaoService extends RequestService{
    static ROTA = "Refeicao";

    static async Lista(planoAlimentar = null) {
        var endPoint = RefeicaoService.ROTA + "/Lista" + (planoAlimentar != null ? "/" + planoAlimentar : "");
        var response = await RequestService.request(endPoint, [], RequestService.GET);
        return response;
    }

    static async Post(registro) {
        var endPoint = RefeicaoService.ROTA;
        var response = await RequestService.request(endPoint, [], RequestService.POST, registro);
        return response;
    }

    static async Put(registro) {
        var endPoint = RefeicaoService.ROTA;
        var response = await RequestService.request(endPoint, [], RequestService.PUT, registro);
        return response;
    }    

    static async Delete(id) {
        var endPoint = RefeicaoService.ROTA;
        var response = await RequestService.request(endPoint, [id], RequestService.DELETE);
        return response;
    }
}

export default RefeicaoService;