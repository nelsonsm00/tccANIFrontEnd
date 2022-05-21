/* IMPORT REACT */
import { Row, Container } from "react-bootstrap";

/* IMPORT COMPONENTE */
import FormCustom from "../Arquitetura/FormCustom";

/* IMPORT UI */
import Label from "../UI/Label";

/* IMPORT DTO */
import PacienteDetalheDTO from "../../DTO/Paciente/PacienteDetalheDTO";

/* IMPORT GERAL */
import Input from "../UI/Input";

/* IMPORT SERVICE */
import PacienteService from "../../Service/Paciente/PacienteService";

class PacienteForm extends FormCustom {
    constructor(props) {
        super(props);

        /* BIND */
        this.resetaModal = this.resetaModal.bind(this);

        this.state.tratamento = props.tratamento;

        this.service = PacienteService;
    }

    /* REQUISICOES */

    async componentDidMount() {
        this.setRequisicaoEmAndamento(true);
        var response = await this.service.Get(null, this.state.tratamento);
        var responseVazio = response.response == [];
        this.setState({ dados: (responseVazio ? PacienteDetalheDTO.json() : response.response) });
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        this.setRequisicaoEmAndamento(false);
    }

    /* RENDER */
    render() {
        var parametrosTamanhoLabelHeadMin = {label: true, min: true};
        var parametrosTamanhoLabelHead = {label: true};
        var parametrosTamanhoInputId = {input: true};
        var parametrosTamanhoInputIdMin = {input: true, min: true};
        var parametrosTamanhoButtonHead = {head: true};

        return(<>
            {this.renderComponente()}
           <Container>
                <Row>
                    <Label
                        coluna={true}
                        texto="Nome:"
                        parametrosTamanho={parametrosTamanhoLabelHeadMin}
                    />
                    <Input
                        ativo={false}
                        valor={this.state.dados.nome} 
                        parametrosTamanho={parametrosTamanhoInputId}
                    />
                    <Label
                        coluna={true}
                        texto="Sobrenome:"
                        parametrosTamanho={parametrosTamanhoLabelHeadMin}
                    />
                    <Input
                        ativo={false}
                        valor={this.state.dados.sobrenome} 
                        parametrosTamanho={parametrosTamanhoInputId}
                    />
                </Row>
                <hr></hr>
                <Row>
                    <Label
                        coluna={true}
                        texto="Telefone:"
                        parametrosTamanho={parametrosTamanhoLabelHeadMin}
                    />
                    <Input
                        ativo={false}
                        valor={
                            (this.state.dados.ddd != null ? "(" + this.state.dados.ddd + ") " : "") +
                            (this.state.dados.telefone != null ? this.state.dados.telefone : "") 
                        } 
                        parametrosTamanho={parametrosTamanhoInputId}
                    />
                    <Label
                        coluna={true}
                        texto="E-mail:"
                        parametrosTamanho={parametrosTamanhoLabelHeadMin}
                    />
                    <Input
                        ativo={false}
                        valor={this.state.dados.email} 
                        parametrosTamanho={parametrosTamanhoInputId}
                    />
                </Row>
                <hr></hr>
                <Row>
                    <Label
                        coluna={true}
                        texto="Sexo:"
                        parametrosTamanho={parametrosTamanhoLabelHeadMin}
                    />
                    <Input
                        ativo={false}
                        valor={this.state.dados.sexoDescricao} 
                        parametrosTamanho={parametrosTamanhoInputId}
                    />
                    <Label
                        coluna={true}
                        texto="Estado civil:"
                        parametrosTamanho={parametrosTamanhoLabelHeadMin}
                    />
                    <Input
                        ativo={false}
                        valor={this.state.dados.estadoCivil} 
                        parametrosTamanho={parametrosTamanhoInputId}
                    />
                </Row>
                <hr></hr>
                <Row>
                    <Label
                        coluna={true}
                        texto="Data de nascimento:"
                        parametrosTamanho={parametrosTamanhoLabelHeadMin}
                    />
                    <Input
                        ativo={false}
                        valor={this.state.dados.dataNascimento} 
                        parametrosTamanho={parametrosTamanhoInputId}
                    />
                    <Label
                        coluna={true}
                        texto="Idade:"
                        parametrosTamanho={parametrosTamanhoLabelHeadMin}
                    />
                    <Input
                        ativo={false}
                        valor={this.state.dados.idade} 
                        parametrosTamanho={parametrosTamanhoInputId}
                    />
                </Row>
                <hr></hr>
                <Row>
                    <Label
                        coluna={true}
                        texto="Endereço:"
                        parametrosTamanho={parametrosTamanhoLabelHeadMin}
                    />
                    <Input
                        ativo={false}
                        valor={
                            (this.state.dados.rua != null ? "RUA " + this.state.dados.rua + ", " : "") +
                            (this.state.dados.numero != null ? "Nº " + this.state.dados.numero + ", " : "") +
                            (this.state.dados.bairro != null ? this.state.dados.bairro + ", " : "") + 
                            (this.state.dados.cidade != null ? this.state.dados.cidade + ", " : "") +
                            (this.state.dados.uf != null ? this.state.dados.uf + ", " : "") +
                            "Brasil"
                        } 
                        parametrosTamanho={parametrosTamanhoInputId}
                    />
                    <Label
                        coluna={true}
                        texto="Complemento:"
                        parametrosTamanho={parametrosTamanhoLabelHeadMin}
                    />
                    <Input
                        ativo={false}
                        valor={this.state.dados.complemento} 
                        parametrosTamanho={parametrosTamanhoInputId}
                    />
                </Row>                
                <hr></hr>
                <Row>
                    <Label
                        coluna={true}
                        texto="Profissão:"
                        parametrosTamanho={parametrosTamanhoLabelHeadMin}
                    />
                    <Input
                        ativo={false}
                        valor={this.state.dados.profissao} 
                        parametrosTamanho={parametrosTamanhoInputId}
                    />
                    <Label
                        coluna={true}
                        texto="Carga horária:"
                        parametrosTamanho={parametrosTamanhoLabelHeadMin}
                    />
                    <Input
                        ativo={false}
                        valor={this.state.dados.cargaHoraria} 
                        parametrosTamanho={parametrosTamanhoInputId}
                    />
                </Row>
                <hr></hr>
                <Row>
                    <Label
                        coluna={true}
                        texto="CPF:"
                        parametrosTamanho={parametrosTamanhoLabelHeadMin}
                    />
                    <Input
                        ativo={false}
                        valor={this.state.dados.cpf} 
                        parametrosTamanho={parametrosTamanhoInputId}
                    />
                </Row>                
            </Container>
        </>);
    }
}

export default PacienteForm;