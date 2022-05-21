class OrdenacaoEnum {

    static tipo = {
        int: 0,
        string: 1,
        data: 2,
        hora: 3
    };

    static sentido = {
        desc: 1,
        asc: -1,
        padraoDiferenca: -1
    };
}

export default OrdenacaoEnum;