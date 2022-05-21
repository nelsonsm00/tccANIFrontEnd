/* IMPORT GERAL */
import ModalEnum from "./ModalEnum";

class Utils {
    static parametrosTamanhoInputMin = {input: true, min: true};
    static parametrosTamanhoLabelMin = {label: true, min: true};

    static getTamanhoColuna(tipo, params = null) {
        if (params == null) {
            switch (tipo) {
                case "xs":
                    return 12;
                case "sm":
                    return 12;
                case "md":
                    return 12;
                case "lg":
                    return 12;
                case "xl":
                    return 12;
            }
        }
        else if (params.hasOwnProperty("modal")) {
            if (params.hasOwnProperty("label")) {
                switch (tipo) {
                    case "xs":
                        return 12;
                    case "sm":
                        return 12;
                    case "md":
                        return 4;
                    case "lg":
                        return 4;
                    case "xl":
                        return 4;
                }
            }
            else if (params.hasOwnProperty("line")) {
                if (params.hasOwnProperty("min")) {
                    switch (tipo) {
                        case "xs":
                            return 2;
                        case "sm":
                            return 2;
                        case "md":
                            return 2;
                        case "lg":
                            return 2;
                        case "xl":
                            return 2;
                    }
                }
                else {
                    switch (tipo) {
                        case "xs":
                            return 8;
                        case "sm":
                            return 8;
                        case "md":
                            return 8;
                        case "lg":
                            return 8;
                        case "xl":
                            return 8;
                    }
                }
            }
            else {
                switch (tipo) {
                    case "xs":
                        return 12;
                    case "sm":
                        return 12;
                    case "md":
                        return 8;
                    case "lg":
                        return 8;
                    case "xl":
                        return 8;
                }
            }
        }
        else if (params.hasOwnProperty("head")) {
            if (params.hasOwnProperty("label")) {
                switch (tipo) {
                    case "xs":
                        return 1;
                    case "sm":
                        return 1;
                    case "md":
                        return 1;
                    case "lg":
                        return 1;
                    case "xl":
                        return 1;
                }
            }
            else if (params.hasOwnProperty("input")) {
                if (params.hasOwnProperty("min")) {
                    switch (tipo) {
                        case "xs":
                            return 1;
                        case "sm":
                            return 1;
                        case "md":
                            return 1;
                        case "lg":
                            return 1;
                        case "xl":
                            return 1;
                    }
                }
                else {
                    switch (tipo) {
                        case "xs":
                            return 2;
                        case "sm":
                            return 2;
                        case "md":
                            return 2;
                        case "lg":
                            return 2;
                        case "xl":
                            return 2;
                    }
                }
            }
            else {
                switch (tipo) {
                    case "xs":
                        return 2;
                    case "sm":
                        return 2;
                    case "md":
                        return 2;
                    case "lg":
                        return 2;
                    case "xl":
                        return 2;
                }
            }
        } 
        else if (params.hasOwnProperty("formulario")) {
            if (params.hasOwnProperty("label")) {
                if (params.hasOwnProperty("textarea") && params.textarea) {
                    switch (tipo) {
                        case "xs":
                            return 12;
                        case "sm":
                            return 12;
                        case "md":
                            return 12;
                        case "lg":
                            return 12;
                        case "xl":
                            return 12;
                    }
                }
                else {
                    switch (tipo) {
                        case "xs":
                            return 4;
                        case "sm":
                            return 4;
                        case "md":
                            return 4;
                        case "lg":
                            return 4;
                        case "xl":
                            return 4;
                    }
                }                
            }
            //input
            else {
                switch (tipo) {
                    case "xs":
                        return 8;
                    case "sm":
                        return 8;
                    case "md":
                        return 8;
                    case "lg":
                        return 8;
                    case "xl":
                        return 8;
                }
            }
        }
        else if (params.hasOwnProperty("form")) {
            if (params.hasOwnProperty("label")) {
                switch (tipo) {
                    case "xs":
                        return 4;
                    case "sm":
                        return 4;
                    case "md":
                        return 4;
                    case "lg":
                        return 4;
                    case "xl":
                        return 4;
                }
            }
            else {
                switch (tipo) {
                    case "xs":
                        return 2;
                    case "sm":
                        return 2;
                    case "md":
                        return 2;
                    case "lg":
                        return 2;
                    case "xl":
                        return 2;
                }
            }
        }

        //ICCON DAS TABELAS
        else if (params.hasOwnProperty("button")) {
            if (params.hasOwnProperty("show") && params.show) {
                switch (tipo) {
                    case "xs":
                        return 12;
                    case "sm":
                        return 12;
                    case "md":
                        return 4;
                    case "lg":
                        return 4;
                    case "xl":
                        return 4;
                }
            }
            else {
                switch (tipo) {
                    case "xs":
                        return 12;
                    case "sm":
                        return 12;
                    case "md":
                        return 6;
                    case "lg":
                        return 6;
                    case "xl":
                        return 6;
                }
            }
        }

        //INPUTS GERAIS
        else if (params.hasOwnProperty("input")) {
            //INPUTS GERAIS MINIMOS
            if (params.hasOwnProperty("min")) {
                switch (tipo) {
                    case "xs":
                        return 2;
                    case "sm":
                        return 2;
                    case "md":
                        return 2;
                    case "lg":
                        return 2;
                    case "xl":
                        return 2;
                }
            }
            else {
                switch (tipo) {
                    case "xs":
                        return 4;
                    case "sm":
                        return 4;
                    case "md":
                        return 4;
                    case "lg":
                        return 4;
                    case "xl":
                        return 4;
                }
            }
        }

        //LABELS GERAIS
        else if (params.hasOwnProperty("label")) {
            //LABELS GERAIS MINIMOS
            if (params.hasOwnProperty("min")) {
                switch (tipo) {
                    case "xs":
                        return 2;
                    case "sm":
                        return 2;
                    case "md":
                        return 2;
                    case "lg":
                        return 2;
                    case "xl":
                        return 2;
                }
            }
            else {
                switch (tipo) {
                    case "xs":
                        return 4;
                    case "sm":
                        return 4;
                    case "md":
                        return 4;
                    case "lg":
                        return 4;
                    case "xl":
                        return 4;
                }
            }
        }

        switch (tipo) {
            case "xs":
                return 12;
            case "sm":
                return 12;
            case "md":
                return 12;
            case "lg":
                return 12;
            case "xl":
                return 12;
        }    
    }

    static isEmptyObject(object) {
        var name;
        for (name in object) {
            return false;
        }
        return true;
    }

    static isStringValida(expressao, somenteNumero = false) {
        if (expressao != null && expressao != "") {
            for (let c of expressao) {
                if (somenteNumero && c.match(/[0-9]/i))
                    return true;
                else if (somenteNumero)
                    return false;
                if (c.match(/[a-zA-Z]/i) || c.match(/[0-9]/i)) {
                    return true;
                }
            }
        }
        return false;
    }

    static isEmailValido(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    static converteQuebraLinhaHtml(valor) {
        if (valor != null) {
            return valor.replaceAll("\\r\\n", "\n");
        } else {
            return "";
        }
    }

    static converteQuebraLinhaUTF(valor) {
        if (valor != null) {
            return valor.replaceAll("\n", "\\r\\n");
        } else {
            return "";
        }
    }

    static converteQuebraLinhaPontoVirgula(valor) {
        if (valor != null) {
            valor = Utils.converteQuebraLinhaHtml(valor).replaceAll("\r", "");
            return valor.replaceAll("\n", ";");
        } else {
            return "";
        }
    }

    static getModal(show = false, mensagem = "", tipo = ModalEnum.tipo.aviso, salvar = false, senha = false, funcao = () => {}, funcaoSecundaria = () => {}) {
        return {
            show: show,
            mensagem: mensagem,
            tipo: tipo,
            salvar: salvar,
            senha: senha,
            funcao: funcao,
            funcaoSecundaria: funcaoSecundaria
        };
    }
}

export default Utils;