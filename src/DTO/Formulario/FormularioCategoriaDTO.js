class FormularioCategoriaDTO {
    static json(id = 0, descricao = null, formulario = 0) {
        return {
            id: id,
            descricao: descricao,
            formulario: formulario
        };
    }
}

export default FormularioCategoriaDTO;