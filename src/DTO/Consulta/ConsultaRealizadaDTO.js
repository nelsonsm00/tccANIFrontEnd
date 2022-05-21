class ConsultaRealizadaDTO {
    static json(id, peso, observacao, altura) {
        return {
            id: id,
            peso: peso,
            observacao: observacao,
            altura: altura
        };
    }
}

export default ConsultaRealizadaDTO;