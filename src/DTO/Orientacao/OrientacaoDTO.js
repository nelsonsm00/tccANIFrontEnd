class OrientacaoDTO {
    static json(id = 0, titulo = null, texto = null, publico = false) {
        return {
            id: id,
            titulo: titulo,
            texto: texto,
            publico: publico
        };
    }
}

export default OrientacaoDTO;