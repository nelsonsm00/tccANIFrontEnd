/*IMPORT SERVICE */
import RequestService from "../RequestService";

class FormularioItemService extends RequestService{
    static ROTA = "Formulario/Categoria/Item";

    static async Post(registro) {
        var endPoint = FormularioItemService.ROTA;
        var response = await RequestService.request(endPoint, [], RequestService.POST, registro);
        return response;
    }

    static async Put(registro) {
        var endPoint = FormularioItemService.ROTA;
        var response = await RequestService.request(endPoint, [], RequestService.PUT, registro);
        return response;
    }    

    static async Delete(id) {
        var endPoint = FormularioItemService.ROTA;
        var response = await RequestService.request(endPoint, [id], RequestService.DELETE);
        return response;
    }
}

export default FormularioItemService;