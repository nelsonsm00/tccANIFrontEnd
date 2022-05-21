/* IMPORT REACT */
import { Col } from "react-bootstrap";

/* IMPORT COMPONENTE */
import FormCustom from "../Arquitetura/FormCustom";
import RefeicaoCard from "../Refeicao/RefeicaoCard";
import RefeicaoAlimentoFormListagem from "../Alimento/RefeicaoAlimentoFormListagem";

/* IMPORT UI */
import ButtonCancel from '../UI/Button/ButtonCancel';


/* IMPORT DTO */


/* IMPORT GERAL */
import Utils from "../../Geral/Utils";
import Cache from "../../Geral/Cache/Cache";
import ModalEnum from "../../Geral/ModalEnum";

/* IMPORT SERVICE */
import PlanoAlimentarService from "../../Service/Plano Alimentar/PlanoAlimentarService";

class PlanoAlimentarForm extends FormCustom {
    constructor(props) {
        super(props);

        if (Cache.tratamento.get == null)
            document.location.href = "/";
        if (Cache.planoAlimentar.get == null)
            document.location.href = "/";

        /* BIND */
        this.resetaModal = this.resetaModal.bind(this);
        this.setRefeicaoSelecionada = this.setRefeicaoSelecionada.bind(this);
        this.setRefeicaoAnteriorSelecionada = this.setRefeicaoAnteriorSelecionada.bind(this);
        this.renderModal = this.renderModal.bind(this);

        this.state.titulo = "Plano Alimentar";
        this.state.tratamento = Cache.tratamento.get;
        this.state.id = Cache.planoAlimentar.get;
        this.state.tratamento = props.tratamento;
        this.state.idRefeicao = 0;
        this.state.idRefeicaoAnterior = -1;
        
        this.service = PlanoAlimentarService;
    }

    /* FUNCOES SET */
    setRefeicaoSelecionada(index) {
        var idRefeicaoAnterior = this.state.idRefeicao;
        this.setState({ idRefeicao: index, idRefeicaoAnterior: idRefeicaoAnterior});    
    }

    async setRefeicaoAnteriorSelecionada(recarrega = false) {
        this.setState({ idRefeicaoAnterior: this.state.idRefeicao}); 
        if(recarrega)
            await this.consulta();
    }

    /* FUNCOES VERIFICACAO */


    /* FUNCOES MODAL */


    /* REQUISICOES */
    async componentDidMount() {
        await this.consulta();
    }

    async consulta() {
        this.setRequisicaoEmAndamento(true);
        var response = await this.service.Get(this.state.id);        
        if (this.service.verificaErro(response)) 
            this.setModalResponse(response.erro);
        else {
            response = response.response;
            var dados = response.refeicoes;
            var titulo = "Plano alimentar " + response.descricao + " - Paciente " + response.nomePaciente + " " + response.sobrenomePaciente;
            this.setState({ dados: dados, titulo: titulo});
            if (dados.length <= 0) {
                this.setState({
                    modal: Utils.getModal(true, 
                                        "Não existem refeições vinculadas a este plano alimentar. Faça a edição do plano para vincular.", 
                                        ModalEnum.tipo.aviso,
                                        false,
                                        false, 
                                        () => {document.location.href = "/Tratamento"})
                });
            }
            else {
                var refeicaoSelecionada = this.state.idRefeicao;
                this.setRefeicaoSelecionada(-1);
                this.setRefeicaoSelecionada(refeicaoSelecionada);
            }
        }
        this.setRequisicaoEmAndamento(false);
    }

    /* RENDER */
    render() {
        var parametrosTamanhoLabelHead = {head: true, label: true, min: true};
        var parametrosTamanhoInputIdHead = {head: true, input: true, min: true};
        var parametrosTamanhoButtonHead = {head: true};

        return( <>
                {super.renderComponente()}
                {super.renderForm(<>
                                <Col sm={2}>
                                    {this.state.dados.length > 0 
                                        ? <>
                                            <RefeicaoCard dados={this.state.dados} funcao={this.setRefeicaoSelecionada} idRefeicao={this.state.idRefeicao}/>  
                                            <br/>
                                            <ButtonCancel valido={true} texto="Voltar" funcao={() => {document.location.href = "/Tratamento"}}/>
                                          </> 
                                        : <></>
                                    }
                                </Col>
                                <Col sm={10}>
                                    {this.state.dados.length > 0 && this.state.idRefeicao > -1
                                            ? <RefeicaoAlimentoFormListagem 
                                                dados={this.state.dados[this.state.idRefeicao].alimentos} 
                                                idRefeicao={this.state.idRefeicao}
                                                idRefeicaoAnterior={this.state.idRefeicaoAnterior}
                                                funcaoRefeicaoAnterior={this.setRefeicaoAnteriorSelecionada}
                                                planoAlimentarRefeicaoId={this.state.dados[this.state.idRefeicao].id}/>
                                            : <></>
                                    }
                                </Col>
                            </>)}
                </>);                    

    }
}

export default PlanoAlimentarForm;