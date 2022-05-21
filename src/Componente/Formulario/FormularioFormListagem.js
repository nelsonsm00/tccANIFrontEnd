/* IMPORT COMPONENTE */
import FormCustomListagem from "../Arquitetura/FormCustomListagem";
import FormularioModal from "./FormularioModal";
import FormularioResposta from "./FormularioResposta";

/* IMPORT GERAL */
import OrdenacaoEnum from "../../Geral/OrdenacaoEnum";
import Coluna from "../../Geral/Coluna/Coluna";
import ColunaIncluir from "../../Geral/Coluna/ColunaIncluir";
import ModalEnum from "../../Geral/ModalEnum";
import Utils from "../../Geral/Utils";
import Cache from "../../Geral/Cache/Cache";

/* IMPORT DTO */
import FormularioDTO from "../../DTO/Formulario/FormularioDTO";

/* IMPORT SERVICE */
import FormularioService from "../../Service/Formulario/FormularioService";

class FormularioFormListagem extends FormCustomListagem {
    constructor(props) {
        super(props, 
                (props.hasOwnProperty("tratamento") ? props.tratamento : -1) <= 0, 
                false, true, false, true, true);

        /* BIND */
        this.incluir = this.incluir.bind(this);
        this.exibeModalincluir = this.exibeModalincluir.bind(this);
        this.resetaModal = this.resetaModal.bind(this);
        this.setDados = this.setDados.bind(this);
        this.ordenaTabela = this.ordenaTabela.bind(this);
        this.editar = this.editar.bind(this);
        this.deletar = this.deletar.bind(this);
        this.excluir = this.excluir.bind(this);
        this.show = this.show.bind(this);

        this.state.tratamento = props.hasOwnProperty("tratamento") ? props.tratamento : -1;
        this.state.responde = false;
        this.state.titulo = "Formulários";
        this.state.colunas = [new Coluna("Formulário", "id", OrdenacaoEnum.tipo.int, true, false, OrdenacaoEnum.sentido.desc, 10),
                              new Coluna("Descrição", "descricao", OrdenacaoEnum.tipo.string, true, false, OrdenacaoEnum.sentido.desc, 30),
                              new Coluna("Tipo", "tipoDescricao", OrdenacaoEnum.tipo.string, true, false, OrdenacaoEnum.sentido.desc, 30)
                            ];
        if (this.state.tratamento <= 0)
            this.state.colunas.push(new ColunaIncluir(this.exibeModalincluir, FormularioDTO.json()));
        this.state.propriedadesBusca = ["id", "descricao", "tipodescricao"];
        this.state.modal = Utils.getModal();
        this.service = FormularioService;       
    }

    /* REQUISICOES */
    async incluir(registro) {
        this.setRequisicaoEmAndamento(true); 
        if (registro.id <= 0)
            var response = await this.service.Post(registro);
        else
            var response = await this.service.Put(registro);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else
            this.resetaModal();
        this.setRequisicaoEmAndamento(false);
        await this.consulta();
    }

    exibeModalincluir(registro) {
        this.setState({
            modal: Utils.getModal(true, "", ModalEnum.tipo.pergunta, false, false, this.incluir),
            registro: registro,
        });
    }

    editar(registro) {
        this.exibeModalincluir(registro);
    }

    async show(registro) {
        if (this.state.tratamento <= 0) {
            Cache.formulario.set(registro.id);
            document.location.href = "/Formulario";
        }
        else {
            await this.consultaFormularioResposta(registro);  
        }        
    }

    async excluir(id) {
        this.setRequisicaoEmAndamento(true); 
        var response = await this.service.Delete(id);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else {
            this.setModalResponse("Formulário excluído com sucesso.", ModalEnum.tipo.sucesso);
            await this.consulta();
        }
        this.setRequisicaoEmAndamento(false);
    }

    deletar(registro) {
        this.setState({
            modal: Utils.getModal(true, "Tem certeza que deseja excluir o formulário? Este processo não pode ser revertido.", ModalEnum.tipo.pergunta, true, false, () => this.excluir(registro.id), this.resetaModal)
        });
    }

    async componentDidMount() {
        await this.consulta();
    }

    async consulta() {
        this.setRequisicaoEmAndamento(true);
        if (this.state.tratamento <= 0)
            var response = await this.service.Lista();
        else
            var response = await this.service.ListaAnamnese();
        this.setState({ dados: response.response, dadosBackup: response.response });
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else if(this.state.tratamento > 0 && response.response.length == 1) {
            await this.show(response.response[0]);
        }
        this.setRequisicaoEmAndamento(false);
    }

    async consultaFormularioResposta(registro) {
        this.setRequisicaoEmAndamento(true);
        var response = await this.service.GetFormularioResposta(this.state.tratamento, registro.id);
        this.setState({ dados: response.response, responde: true });
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
                return (<FormularioModal 
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
                    {!this.state.responde ? super.render() 
                    : this.state.dados != null ? 
                        <FormularioResposta 
                            dados={this.state.dados.categorias}
                            descricao={this.state.dados.descricao}
                            fechaJanela={this.props.fechaJanela}
                            tratamento={this.state.tratamento}
                            formulario={this.state.dados.id}
                        />
                        : <></>
                    }
                    
        </>);
    }
}

export default FormularioFormListagem; 