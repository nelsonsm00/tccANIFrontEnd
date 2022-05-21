/* IMPORT GERAL */
import Cache from "../../Geral/Cache/Cache";

/*IMPORT SERVICE */
import RequestService from "../RequestService";

class PacienteService extends RequestService{
    static ROTA = "Paciente";

    static async Get(id = null, tratamento = null) {
        var endPoint = PacienteService.ROTA + (tratamento != null ? "/Tratamento" : "");
        var response = await RequestService.request(endPoint, [id == null ? tratamento : id], RequestService.GET, {}, {}, false);
        return response;
    }

    static async Lista() {
        var endPoint = PacienteService.ROTA + "/Lista";
        var response = await RequestService.request(endPoint, [Cache.nutricionista.get], RequestService.GET);
        return response;
    }

    static async Post(registro) {
        var endPoint = PacienteService.ROTA;
        var response = await RequestService.request(endPoint, [], RequestService.POST, registro);
        return response;
    }

    static async Put(registro) {
        var endPoint = PacienteService.ROTA;
        var response = await RequestService.request(endPoint, [], RequestService.PUT, registro);
        return response;
    }

    static async Delete(id) {
        var endPoint = PacienteService.ROTA;
        var response = await RequestService.request(endPoint, [id], RequestService.DELETE);
        return response;
    }
}

export default PacienteService;