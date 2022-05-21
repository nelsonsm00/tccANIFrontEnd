class PacienteDTO {
    static json(id = 0, nome = null, sobrenome = null, sexo = null, cpf = null) {
        return {
            id: id,
            nome: nome,
            sobrenome: sobrenome,
            sexo: sexo,
            cpf: cpf
        };
    }
}

export default PacienteDTO;