import Utils from "../../Geral/Utils";

class FormularioItemPostDTO {
    static json(id = 0, formularioCategoria = 0, descricao = null, tipo = "T", alternativas = "") {
        return {
            id: id,
            formularioCategoria: formularioCategoria,
            descricao: descricao,
            tipo: tipo,
            alternativasBD: Utils.converteQuebraLinhaPontoVirgula(alternativas)
        };
    }
}

export default FormularioItemPostDTO;