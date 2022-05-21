/* IMPORT COMPONENTE */
import FormCustomListagem from "../Arquitetura/FormCustomListagem";

/* IMPORT GERAL */
import OrdenacaoEnum from "../../Geral/OrdenacaoEnum";
import Coluna from "../../Geral/Coluna/Coluna";
import Utils from "../../Geral/Utils";

/* IMPORT SERVICE */
import PlanoAlimentarService from "../../Service/Plano Alimentar/PlanoAlimentarService";


class PlanoAlimentarOutrosFormListagem extends FormCustomListagem {
    constructor(props) {
        super(props, false, true, true, false, true, true);

        /* BIND */
        this.resetaModal = this.resetaModal.bind(this);
        this.setDados = this.setDados.bind(this);
        this.ordenaTabela = this.ordenaTabela.bind(this);

        this.state.tratamento = props.tratamento;
        this.state.titulo = "Planos alimentares";
        this.state.colunas = [new Coluna("Plano alimentar", "id", OrdenacaoEnum.tipo.int, true, false, OrdenacaoEnum.sentido.desc, 10),
                              new Coluna("Descrição", "descricao", OrdenacaoEnum.tipo.string, true, false, OrdenacaoEnum.sentido.desc, 50)
                            ];
        this.state.propriedadesBusca = ["id", "descricao"];
        this.state.modal = Utils.getModal();
        this.service = PlanoAlimentarService;       
    }

    /* REQUISICOES */
    async componentDidMount() {
        await this.consulta();
    }

    async consulta() {
        this.setRequisicaoEmAndamento(true);
        var response = await this.service.ListaNaoVinculadas(this.state.tratamento);
        this.setState({ dados: response.response, dadosBackup: response.response });
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

export default PlanoAlimentarOutrosFormListagem; 