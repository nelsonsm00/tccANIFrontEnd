/* IMPORT COMPONENTE */
import FormCustomListagem from "../Arquitetura/FormCustomListagem";

/* IMPORT GERAL */
import OrdenacaoEnum from "../../Geral/OrdenacaoEnum";
import Coluna from "../../Geral/Coluna/Coluna";
import Utils from "../../Geral/Utils";

/* IMPORT SERVICE */
import MedidaService  from "../../Service/Medida/MedidaService";

class MedidaHistoricoFormListagem extends FormCustomListagem {
    constructor(props) {
        super(props, false, true, false, false, false, false);

        /* BIND */
        this.resetaModal = this.resetaModal.bind(this);
        this.ordenaTabela = this.ordenaTabela.bind(this);

        this.state.dados = [];
        this.state.tratamento = props.tratamento;
        this.state.colunas = [new Coluna("Data", "data", OrdenacaoEnum.tipo.data, true, false, OrdenacaoEnum.sentido.desc, 20),
                              new Coluna("Medida", "descricao", OrdenacaoEnum.tipo.string, true, false, OrdenacaoEnum.sentido.desc, 40),
                              new Coluna("Valor", "valor", OrdenacaoEnum.tipo.int, true, false, OrdenacaoEnum.sentido.desc, 20),
                            ];
        this.state.modal = Utils.getModal();
        this.service = MedidaService;
    }

    async componentDidMount() {
        this.setRequisicaoEmAndamento(true);
        var response = await this.service.ListaHistorico(this.state.tratamento);
        this.setState({ dados: response.response });
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        this.setRequisicaoEmAndamento(false);
    }

    render() {
        return(<>
                    {super.render()}
                    
        </>);
    }
}

export default MedidaHistoricoFormListagem; 