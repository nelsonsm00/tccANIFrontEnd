class ConsultaReagendaDTO {
    static json(tratamento, data) {
        return {
            id: tratamento,
            data: data
        };
    }
}

export default ConsultaReagendaDTO;