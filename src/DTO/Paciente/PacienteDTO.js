class PacienteDTO {
    static json(id = 0, nome = null, sobrenome = null, email = null) {
        return {
            id: id,
            nome: nome,
            sobrenome: sobrenome,
            email: email
        };
    }
}

export default PacienteDTO;