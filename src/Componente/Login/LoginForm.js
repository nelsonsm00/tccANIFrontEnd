/* IMPORT REACT */
import React from "react";
import { Col, Row, Form } from "react-bootstrap";

/* IMPORT COMPONENTE */
import FormCustom from "../Arquitetura/FormCustom";

/* IMPORT UI */
import ButtonSuccess from "../UI/Button/ButtonSuccess";
import ButtonAux from "../UI/Button/ButtonAux";
import Label from "../UI/Label";
import Input from "../UI/Input";

/* IMPORT DTO */
import LoginDTO from "../../DTO/Usuario/LoginDTO";

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";
import Cache from "../../Geral/Cache/Cache";

/* IMPORT SERVICE */
import LoginService from "../../Service/Usuario/LoginService";

class LoginForm extends FormCustom {
    constructor(props) {
        super(props);

        //REDIRECIONA PARA A PAGINA INICIAL, CASO NECESSARIO
        this.redireciona();

        /* BIND */
        this.setLogin = this.setLogin.bind(this);
        this.setSenha = this.setSenha.bind(this);
        this.efetuaLogin = this.efetuaLogin.bind(this);
        this.resetaSenha = this.resetaSenha.bind(this);
        this.resetaModal = this.resetaModal.bind(this);

        this.state.login = "";
        this.state.senha = "";

        this.service = LoginService;        
    }

    /* FUNCOES SET */
    setLogin(value) {
        this.setState({ login: value });
    }

    setSenha(value) {
        this.setState({ senha: value });
    }

    /* VERIFICADORES */
    isBotaoLoginValido() {
        return (
            Utils.isStringValida(this.state.login) &&
            Utils.isStringValida(this.state.senha)
        );
    }

    isBotaoRecuperaValido() {
        return Utils.isStringValida(this.state.login);
    }

    redireciona() {
        if (
            Cache.token.get != null &&
            Cache.token.get !== "undefined" &&
            Cache.token.get !== "null"
        ) {
            document.location.href = "/Home";
        }
    }

    /* REQUISICOES */
    async efetuaLogin() {
        this.setRequisicaoEmAndamento(true);
        var response = await this.service.Login(LoginDTO.json(this.state.login, this.state.senha, 1));
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else {
            response = response.response;
            Cache.usuario.set(response.login);
            Cache.nutricionista.set(response.id);
            Cache.conta.set(response.conta);
            Cache.token.set(response.token);
            document.location.href = "/Home";
        }
        this.setRequisicaoEmAndamento(false);
    }

    resetaSenha() { }

    /* RENDERIZACAO */
    render() {
        var paramsLabel = { login: true, label: true };
        var paramsButton = { login: true, button: true };
        var params = { login: true };

        return (<>
                        {this.renderComponente()}
                        <Form>
                            <Form.Group as={Row} controlId="head">
                                <Label
                                    texto="Usuário:"
                                    classe="labelCustom"
                                    parametrosTamanho={paramsLabel}
                                    coluna={true}
                                /> 
                                <Input
                                    valor={this.state.login}
                                    funcao={this.setLogin}
                                    inputTexto={true}
                                    parametrosTamanho={params}
                                />  
                            </Form.Group>
                            <Form.Group as={Row} controlId="head">
                                <Label
                                    texto="Senha:"
                                    classe="labelCustom"
                                    parametrosTamanho={paramsLabel}
                                    coluna={true}
                                /> 
                                <Input
                                    valor={this.state.senha}
                                    funcao={this.setSenha}
                                    inputTexto={true}
                                    parametrosTamanho={params}
                                    senha={true}
                                />  
                            </Form.Group>
                            <br />
                            <Form.Group as={Row} controlId="head">
                                <Col
                                    xs={Utils.getTamanhoColuna("xs", paramsButton)}
                                    sm={Utils.getTamanhoColuna("sm", paramsButton)}
                                    md={Utils.getTamanhoColuna("md", paramsButton)}
                                    lg={Utils.getTamanhoColuna("lg", paramsButton)}
                                    xl={Utils.getTamanhoColuna("xl", paramsButton)}
                                >
                                    <ButtonSuccess
                                        valido={this.isBotaoLoginValido()}
                                        funcao={this.efetuaLogin}
                                        texto={"Entrar"}
                                    />
                                </Col>
                                <Col
                                    xs={Utils.getTamanhoColuna("xs", paramsButton)}
                                    sm={Utils.getTamanhoColuna("sm", paramsButton)}
                                    md={Utils.getTamanhoColuna("md", paramsButton)}
                                    lg={Utils.getTamanhoColuna("lg", paramsButton)}
                                    xl={Utils.getTamanhoColuna("xl", paramsButton)}
                                >
                                    <ButtonAux
                                        funcao={this.resetaSenha}
                                        texto={"Recuperar senha"}
                                        valido={false}
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
        </>);
    }
}

export default LoginForm;
