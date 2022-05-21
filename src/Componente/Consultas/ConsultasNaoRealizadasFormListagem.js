/* IMPORT COMPONENTE */
import FormCustomListagem from "../Arquitetura/FormCustomListagem";

/* IMPORT GERAL */
import OrdenacaoEnum from "../../Geral/OrdenacaoEnum";
import ModalEnum from "../../Geral/ModalEnum";
import Coluna from "../../Geral/Coluna/Coluna";
import Utils from "../../Geral/Utils";
import Cache from "../../Geral/Cache/Cache";
import ConsultaService from "../../Service/Consulta/ConsultaService";

class ConsultasNaoRealizadasFormListagem extends FormCustomListagem {
    constructor(props) {
        super(props, true, true, false, false, false, true);
        this.show = this.show.bind(this);
        this.deletar = this.deletar.bind(this);
        this.ordenaTabela = this.ordenaTabela.bind(this);
        this.resetaModal = this.resetaModal.bind(this);

        this.state.colunas = [new Coluna("Consulta", "id", OrdenacaoEnum.tipo.int, true, false, OrdenacaoEnum.sentido.desc, 20),
                              new Coluna("Data", "data", OrdenacaoEnum.tipo.data, true, false, OrdenacaoEnum.sentido.desc, 20),
                              new Coluna("Hora", "hora", OrdenacaoEnum.tipo.data, false, false, OrdenacaoEnum.sentido.desc, 20)
                            ];
        this.state.dados = props.dados;
        this.state.modal = Utils.getModal();
        this.service = ConsultaService;
    }

    show(registro) {
        Cache.consulta.set(registro.id);
        document.location.href = "/Tratamento";
    }

    async excluir(id) {
        this.setRequisicaoEmAndamento(true); 
        var response = await this.service.Delete(id);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else {
            document.location.href = "/Tratamento";
        }
        this.setRequisicaoEmAndamento(false);
    }

    deletar(registro) {
        this.setState({
            modal: Utils.getModal(true, "Tem certeza que deseja desmarcar a consulta? Este processo não pode ser revertido.", ModalEnum.tipo.pergunta, true, false, () => this.excluir(registro.id), this.resetaModal)
        });
    }

    render() {
        return(<>
                    {super.render()}
                    
        </>);
    }
}

export default ConsultasNaoRealizadasFormListagem; 