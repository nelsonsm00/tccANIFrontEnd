class PlanoAlimentarRefeicaoAlimentoDTO {
    static json(id = 0, planoAlimentarRefeicao = 0, unidade = null, quantidade = 0, alimento = {id: 0, descricao: null, codigo: null}, unidadeMedidaCaseira = null) {
        return {
            id: id,
            planoAlimentarRefeicao: planoAlimentarRefeicao,
            unidade: unidade,
            quantidade: quantidade,
            alimento: alimento,
            unidadeMedidaCaseira: unidadeMedidaCaseira
        };
    }
}

export default PlanoAlimentarRefeicaoAlimentoDTO;