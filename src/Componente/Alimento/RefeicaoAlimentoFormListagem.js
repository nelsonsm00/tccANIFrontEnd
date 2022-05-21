/* IMPOR REACT */
import Modal from "react-bootstrap/Modal";

/* IMPORT COMPONENTE */
import FormCustomListagem from "../Arquitetura/FormCustomListagem";
import AlimentoFormListagem from "./AlimentoFormListagem";
import AlimentoComponenteFormListagem from "./AlimentoComponenteFormListagem";

/* IMPORT GERAL */
import OrdenacaoEnum from "../../Geral/OrdenacaoEnum";
import Coluna from "../../Geral/Coluna/Coluna";
import ColunaIncluir from "../../Geral/Coluna/ColunaIncluir";
import Utils from "../../Geral/Utils";
import ModalEnum from "../../Geral/ModalEnum";
import AlimentoModal from "./AlimentoModal";

/* IMPORT DTO */
import PlanoAlimentarRefeicaoAlimentoDTO from "../../DTO/Plano Alimentar/PlanoAlimentarRefeicaoAlimentoDTO";
import AlimentoDTO from "../../DTO/Alimento/AlimentoDTO";

/* IMPORT SERVICE */
import AlimentoService from "../../Service/Alimento/AlimentoService";
import PlanoAlimentarRefeicaoAlimentoService from "../../Service/Plano Alimentar/PlanoAlimentarRefeicaoAlimentoService";

class RefeicaoAlimentoFormListagem extends FormCustomListagem {
    constructor(props) {
        super(props, true, false, false, false, true, true);

        /* BIND */
        this.resetaModal = this.resetaModal.bind(this);
        this.setDados = this.setDados.bind(this);
        this.ordenaTabela = this.ordenaTabela.bind(this);
        this.exibeModalincluir = this.exibeModalincluir.bind(this);
        this.exibeModalIncluirAlimento = this.exibeModalIncluirAlimento.bind(this);
        this.incluir = this.incluir.bind(this);
        this.editar = this.editar.bind(this);
        this.deletar = this.deletar.bind(this);
        this.show = this.show.bind(this);

        this.state.colunas = [new Coluna("Descrição", "descricao", OrdenacaoEnum.tipo.string, true, false, OrdenacaoEnum.sentido.desc, 30),
                              new Coluna("Quantidade", "quantidade", OrdenacaoEnum.tipo.int, true, false, OrdenacaoEnum.sentido.desc, 15),
                              new Coluna("Unidade", "unidade", OrdenacaoEnum.tipo.string, true, false, OrdenacaoEnum.sentido.desc, 25),
                              new ColunaIncluir(this.exibeModalincluir)
                            ];
        this.state.propriedadesBusca = ["descricao", "quantidade", "unidade"];
        this.state.modal = Utils.getModal();

        this.service = AlimentoService;
    }

    setDadosProps() {
        if (this.props.idRefeicao != this.props.idRefeicaoAnterior) {
            this.setState({dados: [], dadosBackup: []});
            this.props.funcaoRefeicaoAnterior();
        }
        else if (this.state.dados.length == 0 && this.props.dados.length > 0) {
            this.setState({dados: this.props.dados, dadosBackup: this.props.dados});
        }
    }


    exibeModalincluir() {
        this.setState({
            modal: Utils.getModal(true, "", ModalEnum.tipo.janela, false, false, this.exibeModalIncluirAlimento)
        });
    }

    show(registro) {
        console.log(registro);
        this.setState({
            modal: Utils.getModal(true, "", ModalEnum.tipo.janelaConsulta, false, false),
            registro: registro
        });
    }

    editar(registro) {
        this.exibeModalIncluirAlimento(registro);
    }

    async excluir(id) {
        this.setRequisicaoEmAndamento(true); 
        var response = await PlanoAlimentarRefeicaoAlimentoService.Delete(id);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else {
            await this.props.funcaoRefeicaoAnterior(true);    
        }
        this.setRequisicaoEmAndamento(false);
    }

    deletar(registro) {
        this.setState({
            modal: Utils.getModal(true, "Tem certeza que deseja excluir o alimento? Este processo não pode ser revertido.", ModalEnum.tipo.pergunta, true, false, () => this.excluir(registro.id), this.resetaModal)
        });
    }

    async exibeModalIncluirAlimento(registro) {
        var alimentoExiste = registro.id > 0;
        this.setRequisicaoEmAndamento(true);
        var response = await this.service.GetTBCA(registro.codigo);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else {
            var response = response.response[0].unidadeMedidaCaseira;
            this.setState({
                modal: Utils.getModal(true, "", ModalEnum.tipo.pergunta, false, false, this.incluir),
                registro: PlanoAlimentarRefeicaoAlimentoDTO.json(alimentoExiste ? registro.id : 0, 
                                                                 this.props.planoAlimentarRefeicaoId, 
                                                                 alimentoExiste ? registro.unidade : null, 
                                                                 alimentoExiste ? registro.quantidade : 0, 
                                                                 AlimentoDTO.json(alimentoExiste ? registro.alimento : 0, registro.descricao, registro.codigo), response)
            });
        }     
        this.setRequisicaoEmAndamento(false);   
    }

    async incluir(registro) {
        this.setRequisicaoEmAndamento(true); 
        if (registro.id <= 0)
            var response = await PlanoAlimentarRefeicaoAlimentoService.Post(registro);
        else
            var response = await PlanoAlimentarRefeicaoAlimentoService.Put(registro);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else {
            await this.props.funcaoRefeicaoAnterior(true);    
            this.resetaModal();      
        }
        this.setRequisicaoEmAndamento(false);
        
    }

    /* RENDER */
    renderModal() {
        if (this.state.modal.show) {
            if (this.state.modal.tipo == ModalEnum.tipo.erro || this.state.modal.salvar) {
                return super.renderModal(this.state.modal);
            }
            else if (this.state.modal.tipo == ModalEnum.tipo.pergunta) {
                return (<>
                            <AlimentoModal 
                                show={this.state.modal.show}
                                mensagem={this.state.modal.mensagem}
                                tipoModal={this.state.modal.tipo}
                                registro={this.state.registro}
                                funcao={this.state.modal.funcao}
                                funcaoSecundaria={this.resetaModal}
                            />
                        </>);
            }
            else if (this.state.modal.tipo == ModalEnum.tipo.janela) {
                return (<>
                            <Modal
                                show={true}
                                backdrop="static"
                                keyboard={false}
                                dialogClassName="modal-90w"
                                onHide={() => {
                                    this.resetaModal();
                                }}
                            >
                                <Modal.Header closeButton>Alimentos | TBCA</Modal.Header>
                                <Modal.Body>
                                    <AlimentoFormListagem selecionaLinha={true} funcaoSelecionaLinha={this.state.modal.funcao}/>
                                </Modal.Body>
                            </Modal>
                        </>);
            }
            else {
                return(<>
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
                                <Modal.Header closeButton>{this.state.registro.descricao} | TBCA | {this.state.registro.codigo}</Modal.Header>
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
        this.setDadosProps();
        return(<>
                    {super.render()}
                    
        </>);
    }
}

export default RefeicaoAlimentoFormListagem; 