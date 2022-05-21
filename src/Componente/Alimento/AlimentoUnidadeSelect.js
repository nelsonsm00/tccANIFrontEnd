/* IMPORT REACT */
import Modal from "react-bootstrap/Modal";

/* IMPORT PROJETO */
import Select from "../UI/Select/Select";
import PacienteService from "../../Service/Paciente/PacienteService";

/* IMPORT GERAL */

class AlimentoUnidadeSelect extends Select {
    constructor(props) {
        super(props);
        this.state.dados = props.dados;
        //REALIZA O BIND DAS FUNCOES

    }
}

export default AlimentoUnidadeSelect;
