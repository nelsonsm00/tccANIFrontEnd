/*IMPORT SERVICE */
import RequestService from "../RequestService";

class PlanoAlimentarRefeicaoAlimentoService extends RequestService{
    static ROTA = "PlanoAlimentar/Refeicao/Alimento";

    static async Post(registro) {
        var endPoint = PlanoAlimentarRefeicaoAlimentoService.ROTA;
        var response = await RequestService.request(endPoint, [], RequestService.POST, registro);
        return response;
    }

    static async Put(registro) {
        var endPoint = PlanoAlimentarRefeicaoAlimentoService.ROTA;
        var response = await RequestService.request(endPoint, [], RequestService.PUT, registro);
        return response;
    }

    static async Delete(id) {
        var endPoint = PlanoAlimentarRefeicaoAlimentoService.ROTA;
        var response = await RequestService.request(endPoint, [id], RequestService.DELETE);
        return response;
    }
}

export default PlanoAlimentarRefeicaoAlimentoService;