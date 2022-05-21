class PlanoAlimentarDTO {
    static json(id = 0, descricao = null, refeicoes = []) {
        return {
            id: id,
            descricao: descricao,
            refeicoes: refeicoes
        };
    }
}

export default PlanoAlimentarDTO;