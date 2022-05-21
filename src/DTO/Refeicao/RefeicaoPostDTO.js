class RefeicaoPostDTO {
    static json(id = 0, descricao = null, horario = null) {
        return {
            id: id,
            descricao: descricao,
            horariobd: horario
        };
    }
}

export default RefeicaoPostDTO;