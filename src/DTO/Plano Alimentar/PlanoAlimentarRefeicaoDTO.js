class PlanoAlimentarRefeicaoDTO {
    static json(id = 0, planoAlimentar = 0, refeicao = 0) {
        return {
            id: id,
            planoAlimentar: planoAlimentar,
            refeicao: refeicao
        };
    }
}

export default PlanoAlimentarRefeicaoDTO;