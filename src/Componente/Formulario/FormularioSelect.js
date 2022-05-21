/* IMPORT PROJETO */
import Select from "../UI/Select/Select";

class FormularioSelect extends Select {
    constructor(props) {
        super(props);
    }

    getJsonDefault() {
        return { id: "", descricao: "" };
    }

    /* REQUISICOES */
    async componentDidMount() {
        var dados = [
            { id: "A", descricao: "Anamnese" },
            { id: "O", descricao: "Outros" }
        ];
        this.setState({ dados: dados });
    }
}

export default FormularioSelect;
