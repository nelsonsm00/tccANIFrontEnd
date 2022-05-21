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
import TratamentoDTO from "../../DTO/Tratamento/TratamentoDTO";

/* IMPORT SERVICE */
import TratamentoService from "../../Service/Tratamento/TratamentoService";
import TratamentoModal from "./TratamentoModal";

/* IMPORT CACHE */
import Cache from "../../Geral/Cache/Cache";

class TratamentoFormListagem extends FormCustomListagem {
    constructor(props) {
        super(props, true, true, true, false, true, true);

        /* BIND */
        this.incluir = this.incluir.bind(this);
        this.exibeModalincluir = this.exibeModalincluir.bind(this);
        this.resetaModal = this.resetaModal.bind(this);
        this.show = this.show.bind(this);
        this.deletar = this.deletar.bind(this);
        this.inativar = this.inativar.bind(this);
        this.setDados = this.setDados.bind(this);
        this.ordenaTabela = this.ordenaTabela.bind(this);

        this.state.titulo = "Tratamentos";
        this.state.colunas = [new Coluna("Tratamento", "id", OrdenacaoEnum.tipo.int, true, false, OrdenacaoEnum.sentido.desc, 10),
                              new Coluna("Paciente", "pacienteNome", OrdenacaoEnum.tipo.string, true, false, OrdenacaoEnum.sentido.desc, 25),
                              new Coluna("Última consulta", "ultimaConsultaData", OrdenacaoEnum.tipo.data, true, false, OrdenacaoEnum.sentido.desc, 20),
                              new Coluna("Próxima consulta", "proximaConsultaData", OrdenacaoEnum.tipo.data, true, false, OrdenacaoEnum.sentido.desc, 20),
                              new ColunaIncluir(this.exibeModalincluir, PacienteDTO.json())
                            ];
        this.state.propriedadesBusca = ["id", "pacienteNome"];
        this.state.modal = Utils.getModal();

        this.chave = "id";
        this.service = TratamentoService;       
    }


    async incluir(paciente) {
        this.setRequisicaoEmAndamento(true); 
        var params = TratamentoDTO.json(0, Cache.nutricionista.get, paciente);
        var response = await this.service.Post(params);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else
            this.resetaModal();
        this.setRequisicaoEmAndamento(false);
        await this.consulta();
    }

    async inativar(id) {
        this.setRequisicaoEmAndamento(true); 
        var response = await this.service.Inativar(id);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else
            this.setModalResponse("Tratamento inativado com sucesso.", ModalEnum.tipo.sucesso);
        this.setRequisicaoEmAndamento(false);
    }

    deletar(registro) {
        this.setState({
            modal: Utils.getModal(true, "Tem certeza que deseja inativar o tratamento? Este processo não pode ser revertido.", ModalEnum.tipo.pergunta, true, false, () => this.inativar(registro.id), this.resetaModal)
        });
    }

    show(registro) {
        Cache.tratamento.set(registro.id);
        document.location.href = "/Tratamento";
    }

    exibeModalincluir(registro) {
        this.setState({
            modal: Utils.getModal(true, "", ModalEnum.tipo.pergunta, false, false, this.incluir),
            registro: registro,
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
                return (<TratamentoModal 
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

export default TratamentoFormListagem; 