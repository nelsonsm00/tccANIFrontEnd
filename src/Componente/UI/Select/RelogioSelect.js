/* IMPORT UI */
import Select from "./Select";

class RelogioSelect extends Select {
    constructor(props) {
        super(props);

        props.horarios.map((h) => (this.state.dados.push({id: h, descricao: h})));
    }
}

export default RelogioSelect;
