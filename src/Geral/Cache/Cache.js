class Cache {

    static token = {
        set: (value) => {
            localStorage.setItem("token", value);
        },
        get: localStorage.getItem("token")
    };

    static usuario = {
        set: (value) => {
            localStorage.setItem("usuario", value);
        },
        get: localStorage.getItem("usuario")
    };

    static nutricionista = {
        set: (value) => {
            localStorage.setItem("nutricionista", value);
        },
        get: localStorage.getItem("nutricionista")
    };

    static conta = {
        set: (value) => {
            localStorage.setItem("conta", value);
        },
        get: localStorage.getItem("conta")
    };   
    
    static tratamento = {
        set: (value) => {
            localStorage.setItem("tratamento", value);
        },
        get: localStorage.getItem("tratamento")
    }

    static consulta ={
        set: (value) => {
            localStorage.setItem("consulta", value);
        },
        get: localStorage.getItem("consulta")
    }

    static planoAlimentar = {
        set: (value) => {
            localStorage.setItem("planoAlimentar", value);
        },
        get: localStorage.getItem("planoAlimentar")
    }

    static formulario = {
        set: (value) => {
            localStorage.setItem("formulario", value);
        },
        get: localStorage.getItem("formulario")
    }

    static reseta() {
        Cache.token.set(null);
        Cache.usuario.set(null);
        Cache.nutricionista.set(null);
        Cache.conta.set(null);
        Cache.tratamento.set(null);
        Cache.planoAlimentar.set(null);
        Cache.consulta.set(-1);
        Cache.formulario.set(null);
    }
}

export default Cache;