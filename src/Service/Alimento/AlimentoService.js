/*IMPORT SERVICE */
import RequestService from "../RequestService";

class AlimentoService extends RequestService{
    static ROTA = "Alimento";

    static async ListaTBCA(alimento) {
        var endPoint = AlimentoService.ROTA + "/TBCA/Lista?pProduto="+alimento;
        var response = await RequestService.request(endPoint, [], RequestService.GET);
        return response;
    }

    static async GetTBCA(codigo) {
        var endPoint = AlimentoService.ROTA + "/TBCA";
        var response = await RequestService.request(endPoint, [codigo], RequestService.GET);
        return response;
    }
}

export default AlimentoService;