/* IMPORT COMPONENTE */
import FormCustomListagem from "../Arquitetura/FormCustomListagem";

/* IMPORT GERAL */
import OrdenacaoEnum from "../../Geral/OrdenacaoEnum";
import Coluna from "../../Geral/Coluna/Coluna";
import Utils from "../../Geral/Utils";

/* IMPORT SERVICE */
import ConsultaService
 from "../../Service/Consulta/ConsultaService";
class ConsultasAnterioresFormListagem extends FormCustomListagem {
    constructor(props) {
        super(props, false, false, false, false, false, true);

        /* BIND */
        this.resetaModal = this.resetaModal.bind(this);
        this.show = this.show.bind(this);
        this.ordenaTabela = this.ordenaTabela.bind(this);

        this.state.dados = props.dados;
        this.state.tratamento = props.tratamento;
        this.state.colunas = [new Coluna("Consulta", "id", OrdenacaoEnum.tipo.int, true, false, OrdenacaoEnum.sentido.desc, 20),
                              new Coluna("Data", "data", OrdenacaoEnum.tipo.data, true, false, OrdenacaoEnum.sentido.desc, 20),
                              new Coluna("Hora", "hora", OrdenacaoEnum.tipo.data, false, false, OrdenacaoEnum.sentido.desc, 20),
                              new Coluna("Peso", "peso", OrdenacaoEnum.tipo.int, true, false, OrdenacaoEnum.sentido.desc, 20),
                            ];
        this.state.modal = Utils.getModal();
        this.service = ConsultaService;
    }

    show(registro) {
        this.props.setObservacao(registro.observacao)
    }

    render() {
        return(<>
                    {super.render()}
                    
        </>);
    }
}

export default ConsultasAnterioresFormListagem; 