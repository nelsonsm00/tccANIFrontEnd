/* IMPORT PROJETO */
import Select from "../UI/Select/Select";

class FormularioItemSelect extends Select {
    constructor(props) {
        super(props);
    }

    getJsonDefault() {
        return { id: "", descricao: "" };
    }

    /* REQUISICOES */
    async componentDidMount() {
        var dados = [
            { id: "T", descricao: "Texto" },
            { id: "L", descricao: "Texto longo" },
            { id: "C", descricao: "Selecionável" }
        ];
        this.setState({ dados: dados });
    }
}

export default FormularioItemSelect;
