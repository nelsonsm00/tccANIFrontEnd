class ConsultaDetalheDTO {
    static json() {
        return {
            id: 0,
            tratamento: 0,
            data: null,
            hora: null,
            peso: 0.0,
            pesoAnterior: 0.0,
            observacao: null,
            altura: 0,
            sexo: null
        };
    }
}

export default ConsultaDetalheDTO;