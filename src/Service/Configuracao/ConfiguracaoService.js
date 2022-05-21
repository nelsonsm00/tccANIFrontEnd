/* IMPORT GERAL */
import Cache from "../../Geral/Cache/Cache";

/*IMPORT SERVICE */
import RequestService from "../RequestService";

class ConfiguracaoService extends RequestService{
    static ROTA = "Configuracao";

    static async Get() {
        var endPoint = ConfiguracaoService.ROTA;
        var response = await RequestService.request(endPoint, [Cache.nutricionista.get], RequestService.GET, {}, {}, false); 
        return response;
    }

    static async HorarioLista() {
        var endPoint = ConfiguracaoService.ROTA + "/Horario/Lista";
        var response = await RequestService.request(endPoint, [Cache.nutricionista.get], RequestService.GET);
        return response;
    }
}

export default ConfiguracaoService;