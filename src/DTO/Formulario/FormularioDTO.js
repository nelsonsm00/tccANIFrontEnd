class FormularioDTO {
    static json(id = 0, descricao = null, tipo = 'O') {
        return {
            id: id,
            descricao: descricao,
            tipo: tipo
        };
    }
}

export default FormularioDTO;