/* IMPOR REACT */
import Modal from "react-bootstrap/Modal";

/* IMPORT COMPONENTE */
import FormCustomListagem from "../Arquitetura/FormCustomListagem";
import PlanoAlimentarModal from "./PlanoAlimentarModal";
import PlanoAlimentarOutrosFormListagem from "./PlanoAlimentarOutrosFormListagem";

/* IMPORT GERAL */
import OrdenacaoEnum from "../../Geral/OrdenacaoEnum";
import Coluna from "../../Geral/Coluna/Coluna";
import ColunaIncluir from "../../Geral/Coluna/ColunaIncluir";
import ModalEnum from "../../Geral/ModalEnum";
import Utils from "../../Geral/Utils";
import Cache from "../../Geral/Cache/Cache";

/* IMPORT DTO */
import PlanoAlimentarDTO from "../../DTO/Plano Alimentar/PlanoAlimentarDTO";
import PlanoAlimentarRefeicaoDTO from "../../DTO/Plano Alimentar/PlanoAlimentarRefeicaoDTO";

/* IMPORT SERVICE */
import PlanoAlimentarService from "../../Service/Plano Alimentar/PlanoAlimentarService";
import PlanoAlimentarRefeicaoService from "../../Service/Plano Alimentar/PlanoAlimentarRefeicaoService";


class PlanoAlimentarFormListagem extends FormCustomListagem {
    constructor(props) {
        super(props, true, false, false, false, true, true);

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
        this.show = this.show.bind(this);
        this.vincular = this.vincular.bind(this);

        this.state.tratamento = props.tratamento;
        this.state.titulo = "Planos alimentares";
        this.state.colunas = [new Coluna("Plano alimentar", "id", OrdenacaoEnum.tipo.int, true, false, OrdenacaoEnum.sentido.desc, 10),
                              new Coluna("Descrição", "descricao", OrdenacaoEnum.tipo.string, true, false, OrdenacaoEnum.sentido.desc, 50),
                              new ColunaIncluir(this.exibeModalincluir, PlanoAlimentarDTO.json()),
                              new ColunaIncluir(this.exibeModalvincular, {}, false, true, true)
                            ];
        this.state.propriedadesBusca = ["id", "descricao"];
        this.state.modal = Utils.getModal();
        this.service = PlanoAlimentarService;       
    }

    /* REQUISICOES */
    async incluir(registro) {
        this.setRequisicaoEmAndamento(true); 
        if (registro.id <= 0)
            var response = await this.service.Post(registro, this.state.tratamento);
        else
            var response = await this.service.Put(registro);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else {
            registro.refeicoes.map((r) => {
                if (r.selecionado)
                    PlanoAlimentarRefeicaoService.Post(PlanoAlimentarRefeicaoDTO.json(0, registro.id > 0 ? registro.id : response.response, r.id))
                else
                    PlanoAlimentarRefeicaoService.Delete(registro.id, r.id);
            });
            this.resetaModal();            
        }
        this.setRequisicaoEmAndamento(false);
        await this.consulta();
    }

    async vincular(registro) {
        this.setRequisicaoEmAndamento(true); 
        var response = await this.service.Importar(registro.id, this.state.tratamento);
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
        this.exibeModalincluir(registro);
    }

    show(registro) {
        Cache.planoAlimentar.set(registro.id);
        document.location.href = "/PlanoAlimentar";
    }

    async excluir(id) {
        this.setRequisicaoEmAndamento(true); 
        var response = await this.service.Delete(id);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else {
            this.setModalResponse("Plano alimentar excluído com sucesso.", ModalEnum.tipo.sucesso);
            await this.consulta();
        }
        this.setRequisicaoEmAndamento(false);
    }

    deletar(registro) {
        this.setState({
            modal: Utils.getModal(true, "Tem certeza que deseja excluir o plano alimentar? Este processo não pode ser revertido.", ModalEnum.tipo.pergunta, true, false, () => this.excluir(registro.id), this.resetaModal)
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
                                    <PlanoAlimentarOutrosFormListagem selecionaLinha={true} funcaoSelecionaLinha={this.state.modal.funcao} tratamento={this.state.tratamento}/>
                                </Modal.Body>
                            </Modal>
                        </>);
            }
            else {
                return (<PlanoAlimentarModal 
                            show={this.state.modal.show}
                            mensagem={this.state.modal.mensagem}
                            tipoModal={this.state.modal.tipo}
                            registro={this.state.registro}
                            funcao={this.state.modal.funcao}
                            funcaoSecundaria={this.resetaModal}
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

export default PlanoAlimentarFormListagem; 