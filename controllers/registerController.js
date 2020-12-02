window.controllers.RegisterController = (function(){
    
    var optionsLists = {
        maritalStatus: [
            'Selecione',
            'Solteiro',
            'Casado',
            'Divoricado',
            'Viúvu'
        ],
        genders: [
            'Selecione',
            'Masculino',
            'Feminino',
            'Indiferente'
        ],
        literacyLevels: [
            'Selecione',
            'Analfabeto',
            'Ensino fundamental incompleto',
            'Ensino fundamental completo',
            'Ensino médio incompleto',
            'Ensino médio completo',
            'Superior incompleto',
            'Superior completo',
            'Pós-graduado',
            'Mestrado',
            'Mestrado',
            'Pós-Doutorado'
        ],
        states: [
            {label: "Selecione", value: null },
            {label: "Acre", value: "AC"},
            {label: "Alagoas", value: "AL"},
            {label: "Amapá", value: "AP"},
            {label: "Amazonas", value: "AM"},
            {label: "Bahia", value: "BA"},
            {label: "Ceará", value: "CE"},
            {label: "Distrito Federal", value: "DF"},
            {label: "Espírito Santo", value: "ES"},
            {label: "Goiás", value: "GO"},
            {label: "Maranhão", value: "MA"},
            {label: "Mato Grosso", value: "MT"},
            {label: "Mato Grosso do Sul", value: "MS"},
            {label: "Minas Gerais", value: "MG"},
            {label: "Pará", value: "PA"},
            {label: "Paraíba", value: "PB"},
            {label: "Paraná", value: "PR"},
            {label: "Pernambuco", value: "PE"},
            {label: "Piauí", value: "PI"},
            {label: "Rio de Janeiro", value: "RJ"},
            {label: "Rio Grande do Norte", value: "RN"},
            {label: "Rio Grande do Sul", value: "RS"},
            {label: "Rondônia", value: "RO"},
            {label: "Roraima", value: "RR"},
            {label: "Santa Catarina", value: "SC"},
            {label: "São Paulo", value: "SP"},
            {label: "Sergipe", value: "SE"},
            {label: "Tocantins", value: "TO"}
        ],
        originStates: [
            {label: "Selecione", value: null },
            {label: "Outro", value: "OUT"},
            {label: "Acre", value: "AC"},
            {label: "Alagoas", value: "AL"},
            {label: "Amapá", value: "AP"},
            {label: "Amazonas", value: "AM"},
            {label: "Bahia", value: "BA"},
            {label: "Ceará", value: "CE"},
            {label: "Distrito Federal", value: "DF"},
            {label: "Espírito Santo", value: "ES"},
            {label: "Goiás", value: "GO"},
            {label: "Maranhão", value: "MA"},
            {label: "Mato Grosso", value: "MT"},
            {label: "Mato Grosso do Sul", value: "MS"},
            {label: "Minas Gerais", value: "MG"},
            {label: "Pará", value: "PA"},
            {label: "Paraíba", value: "PB"},
            {label: "Paraná", value: "PR"},
            {label: "Pernambuco", value: "PE"},
            {label: "Piauí", value: "PI"},
            {label: "Rio de Janeiro", value: "RJ"},
            {label: "Rio Grande do Norte", value: "RN"},
            {label: "Rio Grande do Sul", value: "RS"},
            {label: "Rondônia", value: "RO"},
            {label: "Roraima", value: "RR"},
            {label: "Santa Catarina", value: "SC"},
            {label: "São Paulo", value: "SP"},
            {label: "Sergipe", value: "SE"},
            {label: "Tocantins", value: "TO"}
        ],
        nationalities: [
            'Selecione',
            "Antígua e Barbuda - Antiguano",
            "Argentina - Argentino",
            "Bahamas - Bahamense",
            "Barbados - Barbadiano, barbadense",
            "Belize - Belizenho",
            "Bolívia - Boliviano",
            "Brasil - Brasileiro",
            "Chile - Chileno",
            "Colômbia - Colombiano",
            "Costa Rica - Costarriquenho",
            "Cuba - Cubano",
            "Dominica - Dominicano",
            "Equador - Equatoriano",
            "El Salvador - Salvadorenho",
            "Granada - Granadino",
            "Guatemala - Guatemalteco",
            "Guiana - Guianês",
            "Guiana Francesa - Guianense",
            "Haiti - Haitiano",
            "Honduras - Hondurenho",
            "Jamaica - Jamaicano",
            "México - Mexicano",
            "Nicarágua - Nicaraguense",
            "Panamá - Panamenho",
            "Paraguai - Paraguaio",
            "Peru - Peruano",
            "Porto Rico - Portorriquenho",
            "República Dominicana - Dominicana",
            "São Cristóvão e Nevis - São-cristovense",
            "São Vicente e Granadinas - São-vicentino",
            "Santa Lúcia - Santa-lucense",
            "Suriname - Surinamês",
            "Trinidad e Tobago - Trindadense",
            "Uruguai - Uruguaio",
            "Venezuela - Venezuelano",
            "Alemanha - Alemão",
            "Áustria - Austríaco",
            "Bélgica - Belga",
            "Croácia - Croata",
            "Dinamarca - Dinamarquês",
            "Eslováquia - Eslovaco",
            "Eslovênia - Esloveno",
            "Espanha - Espanhol",
            "França - Francês",
            "Grécia - Grego",
            "Hungria - Húngaro",
            "Irlanda - Irlandês",
            "Itália - Italiano",
            "Noruega - Noruego",
            "Países Baixos - Holandês",
            "Polônia - Polonês",
            "Portugal - Português",
            "Reino Unido - Britânico",
            "Inglaterra - Inglês",
            "País de Gales - Galês",
            "Escócia - Escocês",
            "Romênia - Romeno",
            "Rússia - Russo",
            "Sérvio - Sérvio",
            "Suécia - Sueco",
            "Suíça - Suíço",
            "Turquia - Turco",
            "Ucrânia - Ucraniano",
            "Estados Unidos - Americano",
            "Canadá - Canadense",
            "Angola - Angolano",
            "Moçambique - Moçambicano",
            "África do Sul - Sul-africano",
            "Zimbabue - Zimbabuense",
            "Argélia - Argélia",
            "Comores - Comorense",
            "Egito - Egípcio",
            "Líbia - Líbio",
            "Marrocos - Marroquino",
            "Gana - Ganés",
            "Quênia - Queniano",
            "Ruanda - Ruandês",
            "Uganda - Ugandense",
            "Botsuana - Bechuano",
            "Costa do Marfim - Marfinense",
            "Camarões - Camaronense",
            "Nigéria - Nigeriano",
            "Somália - Somali",
            "Austrália - Australiano",
            "Nova Zelândia - Neozelandês",
            "Afeganistão - Afegão",
            "Arábia Saudita - Saudita",
            "Armênia - Armeno",
            "Armeno - Bangladesh",
            "China - Chinês",
            "Coréia do Norte - Norte-coreano, coreano",
            "Coréia do Sul - Sul-coreano, coreano",
            "Índia - Indiano",
            "Indonésia - Indonésio",
            "Iraque - Iraquiano",
            "Irã - Iraniano",
            "Israel - Israelita",
            "Japão - Japonês",
            "Malásia - Malaio",
            "Nepal - Nepalês",
            "Omã - Omanense",
            "Paquistão - Paquistanês",
            "Palestina - Palestino",
            "Qatar - Qatarense",
            "Síria - Sírio",
            "Sri Lanka - Cingalês",
            "Tailândia - Tailandês",
            "Timor-Leste - Timorense, maubere",
            "Emirados Árabes Unidos - Árabe, emiratense",
            "Vietnã - Vietnamita",
            "Iêmen - Iemenita"
        ],
        banks: [
            "Selecione seu banco",
            "001 – Banco do Brasil S.A.",
            "033 – Banco Santander (Brasil) S.A.",
            "104 – Caixa Econômica Federal",
            "237 – Banco Bradesco S.A.",
            "341 – Banco Itaú S.A.",
            "356 – Banco Real S.A. (antigo)",
            "389 – Banco Mercantil do Brasil S.A.",
            "399 – HSBC Bank Brasil S.A. – Banco Múltiplo",
            "422 – Banco Safra S.A.",
            "453 – Banco Rural S.A.",
            "633 – Banco Rendimento S.A.",
            "652 – Itaú Unibanco Holding S.A.",
            "745 – Banco Citibank S.A.",
            "246 – Banco ABC Brasil S.A.",
            "025 – Banco Alfa S.A.",
            "641 – Banco Alvorada S.A.",
            "029 – Banco Banerj S.A.",
            "038 – Banco Banestado S.A.",
            "000 – Banco Bankpar S.A.",
            "740 – Banco Barclays S.A.",
            "107 – Banco BBM S.A.",
            "031 – Banco Beg S.A.",
            "096 – Banco BM&F de Serviços de Liquidação e Custódia S.A",
            "318 – Banco BMG S.A.",
            "752 – Banco BNP Paribas Brasil S.A.",
            "248 – Banco Boavista Interatlântico S.A.",
            "036 – Banco Bradesco BBI S.A.",
            "204 – Banco Bradesco Cartões S.A.",
            "225 – Banco Brascan S.A.",
            "044 – Banco BVA S.A.",
            "263 – Banco Cacique S.A.",
            "473 – Banco Caixa Geral – Brasil S.A.",
            "222 – Banco Calyon Brasil S.A.",
            "040 – Banco Cargill S.A.",
            "M08 – Banco Citicard S.A.",
            "M19 – Banco CNH Capital S.A.",
            "215 – Banco Comercial e de Investimento Sudameris S.A.",
            "756 – Banco Cooperativo do Brasil S.A. – BANCOOB",
            "748 – Banco Cooperativo Sicredi S.A.",
            "505 – Banco Credit Suisse (Brasil) S.A.",
            "229 – Banco Cruzeiro do Sul S.A.",
            "003 – Banco da Amazônia S.A.",
            "083-3 – Banco da China Brasil S.A.",
            "707 – Banco Daycoval S.A.",
            "M06 – Banco de Lage Landen Brasil S.A.",
            "024 – Banco de Pernambuco S.A. – BANDEPE",
            "456 – Banco de Tokyo-Mitsubishi UFJ Brasil S.A.",
            "214 – Banco Dibens S.A.",
            "047 – Banco do Estado de Sergipe S.A.",
            "037 – Banco do Estado do Pará S.A.",
            "041 – Banco do Estado do Rio Grande do Sul S.A.",
            "004 – Banco do Nordeste do Brasil S.A.",
            "265 – Banco Fator S.A.",
            "M03 – Banco Fiat S.A.",
            "224 – Banco Fibra S.A.",
            "626 – Banco Ficsa S.A.",
            "394 – Banco Finasa BMC S.A.",
            "M18 – Banco Ford S.A.",
            "233 – Banco GE Capital S.A.",
            "734 – Banco Gerdau S.A.",
            "M07 – Banco GMAC S.A.",
            "612 – Banco Guanabara S.A.",
            "M22 – Banco Honda S.A.",
            "063 – Banco Ibi S.A. Banco Múltiplo",
            "M11 – Banco IBM S.A.",
            "604 – Banco Industrial do Brasil S.A.",
            "320 – Banco Industrial e Comercial S.A.",
            "653 – Banco Indusval S.A.",
            "630 – Banco Intercap S.A.",
            "249 – Banco Investcred Unibanco S.A.",
            "184 – Banco Itaú BBA S.A.",
            "479 – Banco ItaúBank S.A",
            "M09 – Banco Itaucred Financiamentos S.A.",
            "376 – Banco J. P. Morgan S.A.",
            "074 – Banco J. Safra S.A.",
            "217 – Banco John Deere S.A.",
            "065 – Banco Lemon S.A.",
            "600 – Banco Luso Brasileiro S.A.",
            "755 – Banco Merrill Lynch de Investimentos S.A.",
            "746 – Banco Modal S.A.",
            "151 – Banco Nossa Caixa S.A.",
            "045 – Banco Opportunity S.A.",
            "623 – Banco Panamericano S.A.",
            "611 – Banco Paulista S.A.",
            "643 – Banco Pine S.A.",
            "638 – Banco Prosper S.A.",
            "747 – Banco Rabobank International Brasil S.A.",
            "M16 – Banco Rodobens S.A.",
            "072 – Banco Rural Mais S.A.",
            "250 – Banco Schahin S.A.",
            "749 – Banco Simples S.A.",
            "366 – Banco Société Générale Brasil S.A.",
            "637 – Banco Sofisa S.A.",
            "464 – Banco Sumitomo Mitsui Brasileiro S.A.",
            "082-5 – Banco Topázio S.A.",
            "M20 – Banco Toyota do Brasil S.A.",
            "634 – Banco Triângulo S.A.",
            "208 – Banco UBS Pactual S.A.",
            "M14 – Banco Volkswagen S.A.",
            "655 – Banco Votorantim S.A.",
            "610 – Banco VR S.A.",
            "370 – Banco WestLB do Brasil S.A.",
            "021 – BANESTES S.A. Banco do Estado do Espírito Santo",
            "719 – Banif-Banco Internacional do Funchal (Brasil)S.A.",
            "073 – BB Banco Popular do Brasil S.A.",
            "078 – BES Investimento do Brasil S.A.-Banco de Investimento",
            "069 – BPN Brasil Banco Múltiplo S.A.",
            "070 – BRB – Banco de Brasília S.A.",
            "477 – Citibank N.A.",
            "081-7 – Concórdia Banco S.A.",
            "487 – Deutsche Bank S.A. – Banco Alemão",
            "751 – Dresdner Bank Brasil S.A. – Banco Múltiplo",
            "062 – Hipercard Banco Múltiplo S.A.",
            "492 – ING Bank N.V.",
            "488 – JPMorgan Chase Bank",
            "409 – UNIBANCO – União de Bancos Brasileiros S.A.",
            "230 – Unicard Banco Múltiplo S.A."
        ]
    };

    var formInputs = {
        name: {
            data:'',
            hasErrors: false,
            errorMessage: '* Digite seu nome completo',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length < 4
                );
                return !this.hasErrors;
            }
        },
        password: {
            data:'',
            hasErrors: false,
            errorMessage: '* Digite sua senha',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            }
        },
        email: {
            data:'',
            hasErrors: false,
            errorMessage: 'Digite seu email corretamente',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            }
        },
        phone: {
            data:'',
            hasErrors: false,
            errorMessage: 'Telefone Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            }
        },
        rg: {
            data:'',
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            }
        },
        cpf: {
            data:'',
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            }
        },
        pis: {
            data:'',
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            }
        },
        birthdate: {
            data:'',
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            }
        },
        nationality: {
            data:'',
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0 ||
                    data === 'Selecione'
                );
                return !this.hasErrors;
            }
        },
        birth_location: {
            data:'',
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            }
        },
        marital_status: {
            data:'',
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            }
        },
        gender: {
            data:'',
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            }
        },
        literacy: {
            data:'',
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            }
        },
        cep: {
            data:'',
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            }
        },
        address: {
            data:'',
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            }
        },
        address_number: {
            data:'',
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            }
        },
        neighborhood: {
            data:'',
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            }
        },
        city: {
            data:'',
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            }
        },
        state: {
            data:'',
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0 ||
                    data === null
                );
                return !this.hasErrors;
            }
        },
        bank: {
            data:'',
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0 ||
                    data === 'Selecione seu banco'
                );
                return !this.hasErrors;
            }
        },
        agency: {
            data:'',
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            }
        },
        account: {
            data:'',
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            }
        },
        account_owner: {
            data:'',
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            }
        },
        account_owner_cpf: {
            data:'',
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            }
        },
    };

    var validateForm = function() {
        var isValid = true;
        var keys = Object.keys(formInputs);
        var payload = {};
        for(var i = 0; i < keys.length; i++) {
            var validation = formInputs[keys[i]].validate();
            if (!validation) {
                console.log(validation)
                isValid = false; 
            } else {
                payload[keys[i]] = formInputs[keys[i]].data;
            }
        }
        return {isValid: isValid, payload: payload};
    };
    
    var submit = function(router,event) {
        event.preventDefault();
        var validation = validateForm(); 
        if (validation.isValid) {    
            ws.register(validation.payload).then(
                function (response) {
                    auth.setToken(response);
                    router.push('dashboard');       
                }
            );
        }   
    };
    
    return {
        formInputs,
        optionsLists,
        submit
    };
})();