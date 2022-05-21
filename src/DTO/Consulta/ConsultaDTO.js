class ConsultaDTO {
    static json(tratamento, data) {
        return {
            tratamento: tratamento,
            databd: data
        };
    }
}

export default ConsultaDTO;