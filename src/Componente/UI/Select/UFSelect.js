/* IMPORT PROJETO */
import Select from "./Select";

class UFSelect extends Select {
    constructor(props) {
        super(props);
    }

    getJsonDefault() {
        return { id: "", descricao: "" };
    }

    /* REQUISICOES */
    async componentDidMount() {
        var dados = [
            { id: "AC", descricao: "AC" },
            { id: "AL", descricao: "AL" },
            { id: "AP", descricao: "AP" },
            { id: "AM", descricao: "AM" },
            { id: "BA", descricao: "BA" },
            { id: "CE", descricao: "CE" },
            { id: "DF", descricao: "DF" },
            { id: "ES", descricao: "ES" },
            { id: "GO", descricao: "GO" },
            { id: "MA", descricao: "MA" },
            { id: "MT", descricao: "MT" },
            { id: "MS", descricao: "MS" },
            { id: "MG", descricao: "MG" },
            { id: "PA", descricao: "PA" },
            { id: "PB", descricao: "PB" },
            { id: "PR", descricao: "PR" },
            { id: "PE", descricao: "PE" },
            { id: "PI", descricao: "PI" },
            { id: "RJ", descricao: "RJ" },
            { id: "RN", descricao: "RN" },
            { id: "RS", descricao: "RS" },
            { id: "RO", descricao: "RO" },
            { id: "RR", descricao: "RR" },
            { id: "SC", descricao: "SC" },
            { id: "SP", descricao: "SP" },
            { id: "SE", descricao: "SE" },
            { id: "TO", descricao: "TO" },
        ];
        this.setState({ dados: dados });
    }
}

export default UFSelect;
