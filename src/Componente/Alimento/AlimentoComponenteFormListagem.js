/* IMPORT COMPONENTE */
import FormCustomListagem from "../Arquitetura/FormCustomListagem";

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";
import OrdenacaoEnum from "../../Geral/OrdenacaoEnum";
import Coluna from "../../Geral/Coluna/Coluna";

/* IMPORT SERVICE */
import AlimentoService from "../../Service/Alimento/AlimentoService";

class AlimentoComponenteFormListagem extends FormCustomListagem {
    constructor(props) {
        super(props, false, true, false, false, true);

        /* BIND */
        this.resetaModal = this.resetaModal.bind(this);
        this.setDados = this.setDados.bind(this);
        this.ordenaTabela = this.ordenaTabela.bind(this);

        this.state.registo = props.registro;
        this.state.colunas = [];
        this.state.dados = [];
        this.state.dadosBackup = [];
        this.state.propriedadesBusca = ["componente", "unidadeMedida", "unidadeMedidaCaseira"];
        this.state.modal = Utils.getModal();

        this.service = AlimentoService;
    }

    async componentDidMount() {
        await this.consulta();
    }

    async consulta() {
        this.setRequisicaoEmAndamento(true);
        var response = await this.service.GetTBCA(this.props.registro.codigo);
        this.setState({ dados: response.response, dadosBackup: response.response });
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else {
            if (this.state.dados.length > 0) {
                var colunas = [new Coluna("Componente", "componente", OrdenacaoEnum.tipo.string, true, false, OrdenacaoEnum.sentido.desc, 15),
                               new Coluna("Unidade de medida", "unidadeMedida", OrdenacaoEnum.tipo.string, true, false, OrdenacaoEnum.sentido.desc, 10),
                               new Coluna("Valor padrão (100 g)", "valor", OrdenacaoEnum.tipo.string, false, false, OrdenacaoEnum.sentido.desc, 10)
                            ]; 
                for(var i = 0; i < this.state.dados[0].unidadeMedidaCaseira.length; i++) {
                    var un = this.state.dados[0].unidadeMedidaCaseira[i];
                    colunas.push(new Coluna(un.unidadeMedidaCaseira + "(" + un.peso + un.unidadeMedida + ")", 
                                            "unidadeMedidaCaseira."+i+".valor", 
                                            OrdenacaoEnum.tipo.string, 
                                            false, 
                                            false, 
                                            OrdenacaoEnum.sentido.desc, 
                                            15));
                }
                this.setState({colunas : colunas});
            }
        }
        this.setRequisicaoEmAndamento(false);
    }

    /* RENDER */
    render() {
        return(<>
                    {super.render()}
                    
        </>);
    }
}

export default AlimentoComponenteFormListagem; 