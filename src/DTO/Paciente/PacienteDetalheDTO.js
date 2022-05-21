class PacienteDetalheDTO {
    static json(id = 0, nome = null, sobrenome = null, email = null, sexoDescricao = null, cpf = null, uf = null, cidade = null, bairro = null, rua = null, numero = null, 
        complemento = null, ddd = null, telefone = null, datanascimento = null, profissao = null, cargahoraria = null, estadocivil = null) {
        return {
            id: id,
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            sexoDescricao: sexoDescricao,
            cpf: cpf,
            uf: uf,
            cidade: cidade,
            bairro: bairro, 
            rua: rua,
            numero: numero,
            complemento: complemento,
            ddd: ddd,
            telefone: telefone,
            datanascimento: datanascimento,
            profissao: profissao,
            cargahoraria: cargahoraria,
            estadocivil: estadocivil
        };
    }
}

export default PacienteDetalheDTO;