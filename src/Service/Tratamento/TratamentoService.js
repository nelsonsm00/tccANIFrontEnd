/* IMPORT GERAL */
import Cache from "../../Geral/Cache/Cache";

/*IMPORT SERVICE */
import RequestService from "../RequestService";

class TratamentoService extends RequestService{
    static ROTA = "Tratamento";

    static async Get(id) {
        var endPoint = TratamentoService.ROTA;
        var response = await RequestService.request(endPoint, [id], RequestService.GET, {}, {}, false);
        return response;
    }

    static async Lista() {
        var endPoint = TratamentoService.ROTA + "/Lista";
        var response = await RequestService.request(endPoint, [Cache.nutricionista.get], RequestService.GET); 
        return response;
    }

    static async GetNomePaciente(id) {
        var endPoint = TratamentoService.ROTA + "/Paciente/Nome";
        var response = await RequestService.request(endPoint, [id], RequestService.GET, {}, {}, false); 
        return response;
    }

    static async AnamnesePreenchida(id) {
        var endPoint = TratamentoService.ROTA + "/AnamnesePreenchida";
        var response = await RequestService.request(endPoint, [id], RequestService.GET, {}, {}, false); 
        return response;
    }

    static async Post(registro) {
        var endPoint = TratamentoService.ROTA;
        var response = await RequestService.request(endPoint, [], RequestService.POST, registro);
        return response;
    }

    static async Inativar(id) {
        var endPoint = TratamentoService.ROTA + "/Inativar";
        var response = await RequestService.request(endPoint, [id], RequestService.POST);
        return response;
    }

    static async Put(registro) {
        var endPoint = TratamentoService.ROTA;
        var response = await RequestService.request(endPoint, [], RequestService.PUT, registro);
        return response;
    }    
}

export default TratamentoService;