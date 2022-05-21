/* IMPORT REACT */
import Modal from "react-bootstrap/Modal";

/* IMPORT PROJETO */
import Select from "../UI/Select/Select";
import PacienteFormListagem from "./PacienteFormListagem";

/* IMPORT DTO */
import PacienteDTO from "../../DTO/Paciente/PacienteDTO";

/* IMPORT GERAL */

/* IMPORT SERVICE */
import PacienteService from "../../Service/Paciente/PacienteService";

class PacienteSelect extends Select {
    constructor(props) {
        super(props, true);

        this.key = {
            id: "id",
            descricao: "pacienteNome",
        };

        this.service = PacienteService;

        //REALIZA O BIND DAS FUNCOES
        this.abreOpcao = this.abreOpcao.bind(this);
        this.fechaOpcao = this.fechaOpcao.bind(this);
        this.executaFuncaoOpcao = this.executaFuncaoOpcao.bind(this);
    }

    getJsonDefault() {
        return PacienteDTO.json();
    }

    async executaFuncaoOpcao(valor) {
        await this.fechaOpcao();
        this.funcao(valor);        
    }

    async consulta() {
        this.setRequisicaoEmAndamento(true);
        var response = await this.service.Lista();
        this.setState({ dados: response.response, dadosBackup: response.response });
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        this.setRequisicaoEmAndamento(false);
    }

    /* REQUISICOES */
    async componentDidMount() {
        await this.consulta();
    }

    renderJanelaOpcao() {
        if (this.state.renderizaOpcao) {
            return (
                <>
                    <Modal
                        show={true}
                        backdrop="static"
                        keyboard={false}
                        dialogClassName="modal-90w"
                        onHide={() => {
                            this.fechaOpcao();
                        }}
                    >
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>
                            <PacienteFormListagem
                                selecionaLinha={true}
                                funcaoSelecionaLinha={this.executaFuncaoOpcao}
                            />
                        </Modal.Body>
                    </Modal>
                </>
            );
        } else {
            return <></>;
        }
    }
}

export default PacienteSelect;
