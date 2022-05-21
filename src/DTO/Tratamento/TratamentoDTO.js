class TratamentoDTO {
    static json(id = 0, nutricionista = 0, paciente = 0, observacao = null, motivo = null, objetivo = null) {
        return {
            id: 0,
            observacao: null,
            motivo: null,
            objetivo: null,
            nutricionista: nutricionista,
            paciente: paciente
        };
    }
}

export default TratamentoDTO;