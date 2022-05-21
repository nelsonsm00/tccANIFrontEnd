/* IMPORT REACT */
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

/* IMPORT CONTAINER */
import TratamentoListagemContainer from "./Container/Tratamento/TratamentoListagemContainer";
import PacienteListagemContainer from "./Container/Paciente/PacienteListagemContainer";
import TratamentoContainer from "./Container/Tratamento/TratamentoContainer";
import LoginContainer from "./Container/Login/LoginContainer";
import PrincipalContainer from "./Container/Principal/PrincipalContainer";
import PlanoAlimentarContainer from "./Container/Plano Alimentar/PlanoAlimentarContainer";
import RefeicaoListagemContainer from "./Container/Refeicao/RefeicaoListagemContainer";
import OrientacaoListagemContainer from "./Container/Orientacao/OrientacaoListagemContainer";
import FormularioListagemContainer from "./Container/Formulario/FormularioListagemContainer";
import FormularioContainer from "./Container/Formulario/FormularioContainer";

/* IMPORT COMPONENTE */
import Menu from "./Componente/UI/Menu";

/* IMPORT GERAL */
import Cache from "./Geral/Cache/Cache";

/* IMPORT CSS */
import "bootstrap/dist/css/bootstrap.min.css";
import "./Componente/UI/Style/padrao.css";

class App extends Component {
    constructor(props) {
        super(props);

        //ALTERA O TÍTULO DA PAGINA
        document.title = "ANI - Auxiliador Nutricional Integrado";
    }

    isRenderizaLogin() {
        return (
            document.location.pathname == "/" ||
            document.location.pathname == "/Login"
        );
    }


    isLogoff() {
        if (document.location.pathname == "/Logoff") {
            Cache.reseta();
            document.location.href = "/Login"
        }
    }

    render() {
        return (
            <> 
                {this.isLogoff()}
                <Router>
                    <div id="outer-container">
                        {!this.isRenderizaLogin() ? <Menu/> : null}
                        <main id="page-wrap">
                        <Route 
                            path="/Tratamento"
                            exact
                            component={TratamentoContainer}
                        />
                        <Route 
                            path="/Tratamento/Listagem"
                            exact
                            component={TratamentoListagemContainer}
                        />
                        <Route 
                            path="/Paciente/Listagem"
                            exact
                            component={PacienteListagemContainer}
                        />
                        <Route 
                            path="/PlanoAlimentar"
                            exact
                            component={PlanoAlimentarContainer}
                        />
                        <Route
                            path="/Refeicao/Listagem"
                            exact
                            component={RefeicaoListagemContainer}
                        />
                        <Route
                            path="/Orientacao/Listagem"
                            exact
                            component={OrientacaoListagemContainer}
                        />
                        <Route
                            path="/Formulario/Listagem"
                            exact
                            component={FormularioListagemContainer}
                        />
                        <Route
                            path="/Formulario"
                            exact
                            component={FormularioContainer}
                        />
                        <Route 
                            path="/Home"
                            exact
                            component={PrincipalContainer}
                        />

                        <Route path="/Login" exact component={LoginContainer} />
                        <Route path="/" exact component={LoginContainer} />
                        </main>
                    </div>
                </Router>
            </>
        );
    }
}

export default App;
