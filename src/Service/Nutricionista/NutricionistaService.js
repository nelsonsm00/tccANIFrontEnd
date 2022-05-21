/* IMPORT GERAL */
import Cache from "../../Geral/Cache/Cache";

/*IMPORT SERVICE */
import RequestService from "../RequestService";

class NutricionistaService extends RequestService{
    static ROTA = "Paciente";

    static async Get() {
        var endPoint = NutricionistaService.ROTA;
        var response = await RequestService.request(endPoint, [Cache.nutricionista.get], RequestService.GET, {}, {}, false);
        return response;
    }

    static async Put(registro) {
        var endPoint = NutricionistaService.ROTA;
        var response = await RequestService.request(endPoint, [], RequestService.PUT, registro);
        return response;
    }
}

export default NutricionistaService;