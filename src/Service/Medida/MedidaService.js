/*IMPORT SERVICE */
import RequestService from "../RequestService";

class MedidaService extends RequestService{
    static ROTA = "Medida";

    static async Lista(consulta) {
        var endPoint = MedidaService.ROTA + "/Lista";
        var response = await RequestService.request(endPoint, [consulta], RequestService.GET);
        return response;
    }

    static async ListaHistorico(tratamento) {
        var endPoint = MedidaService.ROTA + "/Lista/Historico";
        var response = await RequestService.request(endPoint, [tratamento], RequestService.GET);
        return response;
    }

    static async Put(registro) {
        var endPoint = MedidaService.ROTA;
        var response = await RequestService.request(endPoint, [], RequestService.PUT, registro);
        return response;
    }    
}

export default MedidaService;