/* IMPOR REACT */
import Modal from "react-bootstrap/Modal";

/* IMPORT COMPONENTE */
import FormCustomListagem from "../Arquitetura/FormCustomListagem";

/* IMPORT GERAL */
import OrdenacaoEnum from "../../Geral/OrdenacaoEnum";
import ModalEnum from "../../Geral/ModalEnum";
import Coluna from "../../Geral/Coluna/Coluna";
import Utils from "../../Geral/Utils";

/* IMPORT DTO */

/* IMPORT SERVICE */
import AlimentoService from "../../Service/Alimento/AlimentoService";
import AlimentoComponenteFormListagem from "./AlimentoComponenteFormListagem";

class AlimentoFormListagem extends FormCustomListagem {
    constructor(props) {
        super(props, false, false, false, true);

        /* BIND */
        this.resetaModal = this.resetaModal.bind(this);
        this.setDados = this.setDados.bind(this);
        this.ordenaTabela = this.ordenaTabela.bind(this);
        this.consulta = this.consulta.bind(this);
        this.funcaoPesquisa = this.funcaoPesquisa.bind(this);
        this.show = this.show.bind(this);
        this.renderModal = this.renderModal.bind(this);

        this.state.tratamento = props.tratamento;
        this.state.titulo = "Alimentos";
        this.state.colunas = [new Coluna("Alimento", "descricao", OrdenacaoEnum.tipo.string, true, false, OrdenacaoEnum.sentido.desc, 40),
                              new Coluna("Grupo", "grupo", OrdenacaoEnum.tipo.string, true, false, OrdenacaoEnum.sentido.desc, 30)
                            ];
        this.state.propriedadesBusca = ["descricao", "grupo"];
        this.state.modal = Utils.getModal();
        this.state.registro = {};
        this.service = AlimentoService;       
    }

    show(registro) {
        this.setState({
            modal: Utils.getModal(true, "", ModalEnum.tipo.janela, false, false),
            registro: registro
        });
    }

    async funcaoPesquisa(alimento) {
        await this.consulta(alimento);
    }

    /* REQUISICOES */
    async consulta(alimento) {
        this.setRequisicaoEmAndamento(true);
        var response = await this.service.ListaTBCA(alimento);
        this.setState({ dados: response.response, dadosBackup: response.response });
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        this.setRequisicaoEmAndamento(false);
    }

    renderModal() {
        if (this.state.modal.show) {
            if (this.state.modal.tipo == ModalEnum.tipo.erro || this.state.modal.salvar) {
                return super.renderModal(this.state.modal);
            }
            else {
                return (<>
                            <Modal
                                show={true}
                                backdrop="static"
                                keyboard={false}
                                fullscreen={true}
                                dialogClassName="modal-100w"
                                onHide={() => {
                                    this.resetaModal();
                                }}
                            >
                                <Modal.Header closeButton>{this.state.registro.descricao} | TBCA</Modal.Header>
                                <Modal.Body>
                                    <AlimentoComponenteFormListagem registro={this.state.registro} />
                                </Modal.Body>
                            </Modal>
                        </>);
            }
        }
        else {
            return (<></>);
        }
    }

    render() {
        return(<>
                    {super.render()}
                    
        </>);
    }
}

export default AlimentoFormListagem; 