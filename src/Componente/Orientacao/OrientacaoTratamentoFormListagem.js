/* IMPOR REACT */
import Modal from "react-bootstrap/Modal";

/* IMPORT COMPONENTE */
import FormCustomListagem from "../Arquitetura/FormCustomListagem";
import OrientacaoModal from "./OrientacaoModal";
import OrientacaoFormListagem from "./OrientacaoFormListagem";

/* IMPORT GERAL */
import OrdenacaoEnum from "../../Geral/OrdenacaoEnum";
import Coluna from "../../Geral/Coluna/Coluna";
import ColunaIncluir from "../../Geral/Coluna/ColunaIncluir";
import ModalEnum from "../../Geral/ModalEnum";
import Utils from "../../Geral/Utils";

/* IMPORT DTO */
import OrientacaoDTO from "../../DTO/Orientacao/OrientacaoDTO";
import OrientacaoPostDTO from "../../DTO/Orientacao/OrientacaoPostDTO";

/* IMPORT SERVICE */
import OrientacaoService from "../../Service/Orientacao/OrientacaoService";

class OrientacaoTratamentoFormListagem extends FormCustomListagem {
    constructor(props) {
        super(props, true, false, false, false, true, false);

        /* BIND */
        this.incluir = this.incluir.bind(this);
        this.exibeModalincluir = this.exibeModalincluir.bind(this);
        this.exibeModalvincular = this.exibeModalvincular.bind(this);
        this.resetaModal = this.resetaModal.bind(this);
        this.setDados = this.setDados.bind(this);
        this.ordenaTabela = this.ordenaTabela.bind(this);
        this.editar = this.editar.bind(this);
        this.deletar = this.deletar.bind(this);
        this.excluir = this.excluir.bind(this);
        this.vincular = this.vincular.bind(this);

        this.state.tratamento = props.hasOwnProperty("tratamento") ? props.tratamento : null;
        this.state.colunas = [new Coluna("Orientação", "id", OrdenacaoEnum.tipo.int, true, false, OrdenacaoEnum.sentido.desc, 10),
                              new Coluna("Título", "titulo", OrdenacaoEnum.tipo.string, true, false, OrdenacaoEnum.sentido.desc, 40),
                              new ColunaIncluir(this.exibeModalincluir, OrientacaoDTO.json()),
                              new ColunaIncluir(this.exibeModalvincular, {}, false, true)
                            ];
        this.state.propriedadesBusca = ["id", "titulo"];
        this.state.modal = Utils.getModal();
        this.service = OrientacaoService;       
    }

    /* REQUISICOES */
    async incluir(registro) {
        this.setRequisicaoEmAndamento(true); 
        if (registro.id <= 0)
            var response = await this.service.Post(OrientacaoPostDTO.json(registro.id, registro.titulo, registro.texto, registro.publico ? 'S' : 'N'), this.state.tratamento);
        else
            var response = await OrientacaoService.Put(OrientacaoPostDTO.json(registro.id, registro.titulo, registro.texto, registro.publico ? 'S' : 'N'));
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else
            this.resetaModal();
        this.setRequisicaoEmAndamento(false);
        await this.consulta();
    }

    async vincular(registro) {
        this.setRequisicaoEmAndamento(true); 
        var response = await this.service.Vincular(registro.id, this.state.tratamento);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else {
            this.resetaModal();
            await this.consulta();
        }
        this.setRequisicaoEmAndamento(false);
    }

    exibeModalincluir(registro) {
        this.setState({
            modal: Utils.getModal(true, "", ModalEnum.tipo.pergunta, false, false, this.incluir),
            registro: registro,
        });
    }

    exibeModalvincular() {
        this.setState({
            modal: Utils.getModal(true, "", ModalEnum.tipo.janela, false, false, this.vincular)
        });
    }

    editar(registro) {
        this.exibeModalincluir(OrientacaoDTO.json(registro.id, registro.titulo, registro.texto, registro.publico));
    }

    async excluir(id) {
        this.setRequisicaoEmAndamento(true); 
        var response = await this.service.Delete(id, this.state.tratamento);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else {
            this.setModalResponse("Orientação desvinculada com sucesso.", ModalEnum.tipo.sucesso);
            await this.consulta();
        }
        this.setRequisicaoEmAndamento(false);
    }

    deletar(registro) {
        this.setState({
            modal: Utils.getModal(true, "Tem certeza que deseja desvincular esta orientação?", ModalEnum.tipo.pergunta, true, false, () => this.excluir(registro.id), this.resetaModal)
        });
    }

    async componentDidMount() {
        await this.consulta();
    }

    async consulta() {
        this.setRequisicaoEmAndamento(true);
        var response = await this.service.Lista(this.state.tratamento);
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
            else if (this.state.modal.tipo == ModalEnum.tipo.janela) {
                return (<>
                            <Modal
                                show={true}
                                backdrop="static"
                                keyboard={false}
                                dialogClassName="modal-100w"
                                onHide={() => {
                                    this.resetaModal();
                                }}
                            >
                                <Modal.Header closeButton></Modal.Header>
                                <Modal.Body>
                                    <OrientacaoFormListagem selecionaLinha={true} funcaoSelecionaLinha={this.state.modal.funcao} tratamento={this.state.tratamento}/>
                                </Modal.Body>
                            </Modal>
                        </>);
            }
            else {
                return (<OrientacaoModal 
                            show={this.state.modal.show}
                            mensagem={this.state.modal.mensagem}
                            tipoModal={this.state.modal.tipo}
                            registro={this.state.registro}
                            funcao={this.state.modal.funcao}
                            funcaoSecundaria={this.resetaModal}
                            modal100w={true}
                        />);
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

export default OrientacaoTratamentoFormListagem; 