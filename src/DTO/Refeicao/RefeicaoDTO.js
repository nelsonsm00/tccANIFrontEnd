class RefeicaoDTO {
    static json(id = 0, descricao = null, horario = null) {
        return {
            id: id,
            descricao: descricao,
            horario: horario
        };
    }
}

export default RefeicaoDTO;