/*IMPORT SERVICE */
import RequestService from "../RequestService";

class PlanoAlimentarRefeicaoService extends RequestService{
    static ROTA = "PlanoAlimentar/Refeicao";

    static async Post(registro) {
        var endPoint = PlanoAlimentarRefeicaoService.ROTA;
        var response = await RequestService.request(endPoint, [], RequestService.POST, registro);
        return response;
    }

    static async Delete(planoAlimentar, refeicao) {
        var endPoint = PlanoAlimentarRefeicaoService.ROTA;
        var response = await RequestService.request(endPoint, [planoAlimentar, refeicao], RequestService.DELETE);
        return response;
    }
}

export default PlanoAlimentarRefeicaoService;