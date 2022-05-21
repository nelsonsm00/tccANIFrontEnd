/* IMPORT COMPONENTE */
import FormCustomListagem from "../Arquitetura/FormCustomListagem";
import RefeicaoModal from "./RefeicaoModal";

/* IMPORT GERAL */
import OrdenacaoEnum from "../../Geral/OrdenacaoEnum";
import Coluna from "../../Geral/Coluna/Coluna";
import ColunaIncluir from "../../Geral/Coluna/ColunaIncluir";
import ModalEnum from "../../Geral/ModalEnum";
import Utils from "../../Geral/Utils";
import Data from "../../Geral/Data";

/* IMPORT DTO */
import RefeicaoDTO from "../../DTO/Refeicao/RefeicaoDTO";
import RefeicaoPostDTO from "../../DTO/Refeicao/RefeicaoPostDTO";

/* IMPORT SERVICE */
import RefeicaoService from "../../Service/Refeicao/RefeicaoService";

class RefeicaoFormListagem extends FormCustomListagem {
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

        this.state.titulo = "Refeições";
        this.state.colunas = [new Coluna("Refeição", "id", OrdenacaoEnum.tipo.int, true, false, OrdenacaoEnum.sentido.desc, 10),
                              new Coluna("Descrição", "descricao", OrdenacaoEnum.tipo.string, true, false, OrdenacaoEnum.sentido.desc, 30),
                              new Coluna("Horário", "horario", OrdenacaoEnum.tipo.hora, true, false, OrdenacaoEnum.sentido.desc, 30),
                              new ColunaIncluir(this.exibeModalincluir, RefeicaoDTO.json())
                            ];
        this.state.propriedadesBusca = ["id", "descricao"];
        this.state.modal = Utils.getModal();
        this.service = RefeicaoService;       
    }

    /* REQUISICOES */
    async incluir(registro) {
        this.setRequisicaoEmAndamento(true); 
        if (registro.id <= 0)
            var response = await this.service.Post(RefeicaoPostDTO.json(registro.id, registro.descricao, Data.converteStringDataHora('2022-01-01', registro.horario)));
        else
            var response = await this.service.Put(RefeicaoPostDTO.json(registro.id, registro.descricao, Data.converteStringDataHora('2022-01-01', registro.horario)));
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
        this.exibeModalincluir(RefeicaoDTO.json(registro.id, registro.descricao, registro.horario));
    }

    async excluir(id) {
        this.setRequisicaoEmAndamento(true); 
        var response = await this.service.Delete(id);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else {
            this.setModalResponse("Refeição excluída com sucesso.", ModalEnum.tipo.sucesso);
            await this.consulta();
        }
        this.setRequisicaoEmAndamento(false);
    }

    deletar(registro) {
        this.setState({
            modal: Utils.getModal(true, "Tem certeza que deseja excluir a refeição? Este processo não pode ser revertido.", ModalEnum.tipo.pergunta, true, false, () => this.excluir(registro.id), this.resetaModal)
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
                return (<RefeicaoModal 
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

export default RefeicaoFormListagem; 