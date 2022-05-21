/* IMPORT REACT */
import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

/* IMPORT COMPONENTE */
import Componente from "../Arquitetura/Componente";
import Aba from "../../Geral/Aba/Aba";
import TratamentoCamposDescritivos from "./TratamentoCamposDescritivos";
import ConsultaForm from "../Consultas/ConsultaForm";
import PlanoAlimentarFormListagem from "../Plano Alimentar/PlanoAlimentarFormListagem";
import PacienteForm from "../Paciente/PacienteForm";
import TratamentoHistorico from "./TratamentoHistorico";

/* IMPORT SERVICE */
import TratamentoService from "../../Service/Tratamento/TratamentoService";
import OrientacaoTratamentoFormListagem from "../Orientacao/OrientacaoTratamentoFormListagem";

class TratamentoTab extends Componente {
    constructor(props) {
        super(props);        
        this.tabs = {
            paciente: new Aba("Paciente"),
            consultas: new Aba("Consultas"),
            planoAlimentar: new Aba("Plano Alimentar"),
            orientacoes: new Aba("Orientações"),
            anotacoes: new Aba("Anotações"),
            historico: new Aba("Histórico")
        };
        this.state.id = props.id;
        this.state.consulta = props.consulta;
        this.state.abaSelecionada = this.tabs.consultas.chave;
        this.state.titulo = "";
        
        this.selecionaAba = this.selecionaAba.bind(this);
        this.service = TratamentoService;
    }

    selecionaAba(chave) {
        this.setState({abaSelecionada: chave});
    }

    isAbaSelecionada(chave) {
        if (this.state.abaSelecionada == chave) {
            return "abaSelecionada";
        }
        else return "aba";
    }

    async componentDidMount() {
        this.setRequisicaoEmAndamento(true);
        var response = await this.service.GetNomePaciente(this.state.id);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else
            this.setState({ titulo: "Paciente " + response.response });
        this.setRequisicaoEmAndamento(false);
    }

    render() {
        return(<>
                    {super.renderTitulo()}
                    <Tabs defaultActiveKey={this.tabs.consultas.chave} onSelect={key => this.selecionaAba(key)}>
                        <Tab
                            eventKey={this.tabs.paciente.chave}
                            title={this.tabs.paciente.titulo}
                            id={this.isAbaSelecionada(this.tabs.paciente.chave)}
                        >
                            <br/>
                            <PacienteForm tratamento={this.state.id}/>
                        </Tab>
                        <Tab
                            eventKey={this.tabs.consultas.chave}
                            title={this.tabs.consultas.titulo}
                            id={this.isAbaSelecionada(this.tabs.consultas.chave)}
                        >
                            <br/>
                            <ConsultaForm tratamento={this.state.id} consulta={this.state.consulta}/>
                        </Tab>
                        <Tab
                            eventKey={this.tabs.planoAlimentar.chave}
                            title={this.tabs.planoAlimentar.titulo}
                            id={this.isAbaSelecionada(this.tabs.planoAlimentar.chave)}
                        >
                            <br/>
                            <PlanoAlimentarFormListagem tratamento={this.state.id}/>
                        </Tab>
                        <Tab
                            eventKey={this.tabs.orientacoes.chave}
                            title={this.tabs.orientacoes.titulo}
                            id={this.isAbaSelecionada(this.tabs.orientacoes.chave)}                            
                        >
                            <br/>
                            <OrientacaoTratamentoFormListagem tratamento={this.state.id}/>
                        </Tab>
                        <Tab
                            eventKey={this.tabs.anotacoes.chave}
                            title={this.tabs.anotacoes.titulo}
                            id={this.isAbaSelecionada(this.tabs.anotacoes.chave)}
                        >
                            <TratamentoCamposDescritivos tratamento={this.state.id}/>
                        </Tab>
                        <Tab
                            eventKey={this.tabs.historico.chave}
                            title={this.tabs.historico.titulo}
                            id={this.isAbaSelecionada(this.tabs.historico.chave)}
                        >
                            <TratamentoHistorico tratamento={this.state.id}/>
                        </Tab>
                    </Tabs>
        </>)
    }
}

export default TratamentoTab;