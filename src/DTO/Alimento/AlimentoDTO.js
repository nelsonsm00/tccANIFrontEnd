class AlimentoDTO {
    static json(id = 0, descricao = null, codigo = null) {
        return {
            id: id,
            descricao: descricao,
            codigo: codigo
        };
    }
}

export default AlimentoDTO;