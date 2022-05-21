class TratamentoListaDTO {
    static json(id = 0, pacienteNome = "", ultimaConsultaData = null, proximaConsultaData = null) {
        return {
            id: id,
            pacienteNome: pacienteNome,
            ultimaConsultaData: ultimaConsultaData,
            proximaConsultaData: proximaConsultaData
        };
    }
}

export default TratamentoListaDTO;