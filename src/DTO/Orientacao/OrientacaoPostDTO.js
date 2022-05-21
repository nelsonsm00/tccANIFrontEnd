class OrientacaoPostDTO {
    static json(id = 0, titulo = null, texto = null, publico = 'N') {
        return {
            id: id,
            titulo: titulo,
            texto: texto,
            publicoBD: publico
        };
    }
}

export default OrientacaoPostDTO;