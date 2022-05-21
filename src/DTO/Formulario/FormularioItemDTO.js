class FormularioItemDTO {
    static json(id = 0, formularioCategoria = 0, descricao = null, tipo = "T", alternativas = "") {
        if (Array.isArray(alternativas))
            alternativas = alternativas.join('\r\n')

        return {
            id: id,
            formularioCategoria: formularioCategoria,
            descricao: descricao,
            tipo: tipo,
            alternativas: alternativas
        };
    }
}

export default FormularioItemDTO;