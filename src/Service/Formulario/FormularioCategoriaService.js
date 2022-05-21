/*IMPORT SERVICE */
import RequestService from "../RequestService";

class FormularioCategoriaService extends RequestService{
    static ROTA = "Formulario/Categoria";

    static async Post(registro) {
        var endPoint = FormularioCategoriaService.ROTA;
        var response = await RequestService.request(endPoint, [], RequestService.POST, registro);
        return response;
    }

    static async Put(registro) {
        var endPoint = FormularioCategoriaService.ROTA;
        var response = await RequestService.request(endPoint, [], RequestService.PUT, registro);
        return response;
    }

    static async Delete(id) {
        var endPoint = FormularioCategoriaService.ROTA;
        var response = await RequestService.request(endPoint, [id], RequestService.DELETE);
        return response;
    }
}

export default FormularioCategoriaService;