/* IMPORT COMPONENTE */
import FormCustomListagem from "../Arquitetura/FormCustomListagem";

/* IMPORT GERAL */
import OrdenacaoEnum from "../../Geral/OrdenacaoEnum";
import Coluna from "../../Geral/Coluna/Coluna";
import ColunaIncluir from "../../Geral/Coluna/ColunaIncluir";
import ModalEnum from "../../Geral/ModalEnum";
import Utils from "../../Geral/Utils";

/* IMPORT DTO */
import PacienteDTO from "../../DTO/Paciente/PacienteDTO";

/* IMPORT SERVICE */
import PacienteService from "../../Service/Paciente/PacienteService";
import PacienteModal from "./PacienteModal";
import ModalANI from "../UI/Modal/ModalANI";

class PacienteFormListagem extends FormCustomListagem {
    constructor(props) {
        super(props, true, false, true, false, true, false);

        /* BIND */
        this.incluir = this.incluir.bind(this);
        this.exibeModalincluir = this.exibeModalincluir.bind(this);
        this.resetaModal = this.resetaModal.bind(this);
        this.setDados = this.setDados.bind(this);
        this.ordenaTabela = this.ordenaTabela.bind(this);
        this.editar = this.editar.bind(this);
        this.deletar = this.deletar.bind(this);
        this.excluir = this.excluir.bind(this);

        this.state.titulo = "Pacientes";
        this.state.colunas = [new Coluna("Paciente", "id", OrdenacaoEnum.tipo.int, true, false, OrdenacaoEnum.sentido.desc, 10),
                              new Coluna("Nome", "pacienteNome", OrdenacaoEnum.tipo.string, true, false, OrdenacaoEnum.sentido.desc, 30),
                              new Coluna("Última consulta", "ultimaConsultaData", OrdenacaoEnum.tipo.data, true, false, OrdenacaoEnum.sentido.desc, 20),
                              new Coluna("Próxima consulta", "proximaConsultaData", OrdenacaoEnum.tipo.data, true, false, OrdenacaoEnum.sentido.desc, 20),
                              new ColunaIncluir(this.exibeModalincluir, PacienteDTO.json())
                            ];
        this.state.propriedadesBusca = ["id", "pacienteNome"];
        this.state.modal = Utils.getModal();
        this.service = PacienteService;       
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
        this.exibeModalincluir(PacienteDTO.json(registro.id, registro.nome, registro.sobrenome, registro.email));
    }

    async excluir(id) {
        this.setRequisicaoEmAndamento(true); 
        var response = await this.service.Delete(id);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else {
            this.setModalResponse("Pacinete excluído com sucesso.", ModalEnum.tipo.sucesso);
            await this.consulta();
        }
        this.setRequisicaoEmAndamento(false);
    }

    deletar(registro) {
        this.setState({
            modal: Utils.getModal(true, "Tem certeza que deseja excluir o paciente? Este processo não pode ser revertido.", ModalEnum.tipo.pergunta, true, false, () => this.excluir(registro.id), this.resetaModal)
        });
    }

    async componentDidMount() {
        await this.consulta();
    }

    async consulta() {
        this.setRequisicaoEmAndamento(true);
        var response = await this.service.Lista();
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
                return (<PacienteModal 
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

export default PacienteFormListagem; 