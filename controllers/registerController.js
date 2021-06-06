window.divulgadores.controllers.RegisterController = (function(){
    
    var registerRequirements = new Object();

    var hasFormErrors = false;

    var isEditing = false;
    
    var userId = 0;

    var hcaptchaParams = {
        widgetId: '',
        response: ''
    } 

    var optionsLists = {
        maritalStatus: [
            { viewValue: 'Selecione', value: null },
            { viewValue: 'Solteiro', value: "S" },
            { viewValue: 'Casado', value: "C" },
            { viewValue: 'Divoricado', value: "D" },
            { viewValue: 'Viúvu', value: "V" },
        ],
        genders: [
            { viewValue: 'Selecione', value: ''},
            { viewValue: 'Masculino', value: 'M'},
            { viewValue: 'Feminino', value: 'F'},
            { viewValue: 'Indiferente', value: 'I'},            
        ],
        literacyLevels: [
            { viewValue: 'Selecione', value: null},
            { viewValue: 'Analfabeto', value: 'A'},
            { viewValue: 'Ensino fundamental incompleto', value: "EFI"},
            { viewValue: 'Ensino fundamental completo', value: "EFC"},
            { viewValue: 'Ensino médio incompleto', value: "EMI"},
            { viewValue: 'Ensino médio completo', value: "EMC"},
            { viewValue: 'Superior incompleto', value: "SI"},
            { viewValue: 'Superior completo', value: 'SC'},
            { viewValue: 'Pós-graduado', value: "PG"},
            { viewValue: 'Mestrado', value: "M"},
            { viewValue: 'Doutorado', value: "D"},
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
            "260 - Nu Pagamentos S.A.",
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
            required: true,
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
            required: true,
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
            required: true,
            hasErrors: false,
            isValid: true,
            errorMessage: 'Digite seu email corretamente',
            errorDefault: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                var isValid = this.isValid
                this.hasErrors = (
                    data.length === 0 &&
                    data.length < 5
                ) || !isValid;
                return !this.hasErrors;
            },
            verifyEmail: function() {
                if (this.data.length >= 5) {
                    var scope = this;   
                    ws.verifyUser({email: this.data}).then(function(response){
                        if (response.data.exists) {
                            scope.hasErrors = true;
                            scope.isValid = false;
                            scope.errorMessage = 'E-mail já cadastrado';
                        } else {
                            scope.hasErrors = false;
                            scope.isValid = true;
                            scope.errorMessage = scope.errorDefault;
                        }
                    });
                } 
            }
        },
        phone1: {
            data:'',
            required: false,
            hasErrors: false,
            errorMessage: 'Celular Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            },
            mask: function() {
                this.data = this.data.replace(/\D/g,"");
                this.data = this.data.replace(/^(\d\d)(\d)/g,"($1) $2");
                this.data = this.data.replace(/(\d{5})(\d)/,"$1-$2");
            },
            unmask: function () {
                return this.data.replace(/\D/g, "");
            }
        },
        phone2: {
            data:'',
            required: false,
            hasErrors: false,
            errorMessage: 'Telefone Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            },
            mask: function() {
                this.data = this.data.replace(/\D/g,"");
                this.data = this.data.replace(/^(\d\d)(\d)/g,"($1) $2");
                this.data = this.data.replace(/(\d{5})(\d)/,"$1-$2");
            },
            unmask: function () {
                return this.data.replace(/\D/g, "");
            }
        },
        rg: {
            data:'',
            required: false,
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            },
            mask: function () {
                this.data = this.data.replace(/\D/g,"");
                this.data = this.data.replace(/(\d{3})(\d)/,"$1.$2");      
                this.data = this.data.replace(/(\d{3})(\d)/,"$1.$2");
                this.data = this.data.replace(/(\d{2})(\d{1,2})$/,"$1-$2");
            },
            unmask: function () {
                return this.data.replace(/\D/g, "");
            }
        },
        cpfCnpj: {
            data:'',
            required: true,
            hasErrors: false,
            isValid: true,
            errorMessage: 'Campo Obrigatório',
            errorDefault: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                var isValid = this.isValid
                this.hasErrors = (
                    data.length < 14
                ) || !isValid;
                return !this.hasErrors;
            },
            mask: function () {
                this.data = this.data.replace(/\D/g,"");      
                this.data = this.data.replace(/(\d{3})(\d)/,"$1.$2");      
                this.data = this.data.replace(/(\d{3})(\d)/,"$1.$2");
                this.data = this.data.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
            },
            unmask: function () {
                return this.data.replace(/\D/g, "");
            },
            verifyCpfCnpj: function() {
                if (this.data.length >= 14) {
                    var scope = this;
                    ws.verifyUser({cpfCnpj: this.unmask()}).then(function(response){
                        if (response.data.exists) {
                            scope.hasErrors = true;
                            scope.isValid = false;
                            scope.errorMessage = 'CPF já cadastrado';
                        } else {
                            scope.hasErrors = false;
                            scope.isValid = true;
                            scope.errorMessage = scope.errorDefault;
                        }
                    });
                } 
            }
        },
        pis: {
            data:'',
            required: false,
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            },
            mask: function () {
                this.data = this.data.replace(/\D/g,"");
            },
            unmask: function () {
                return this.data.replace(/\D/g, "");
            }
        },
        birthdate: {
            data:'',
            required: false,
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length < 10
                );
                return !this.hasErrors;
            },
            mask: function () {
                this.data = this.data.replace(/\D/g,"");
                this.data = this.data.replace(/(\d{2})(\d)/,"$1/$2");
                this.data = this.data.replace(/(\d{2})(\d)/,"$1/$2");
                this.data = this.data.replace(/(\d{2})(\d{2})$/,"$1$2");
            },
            unmask: function () {
                var formated = this.data.split('/');
                formated = formated[1]+"-"+formated[0]+"-"+formated[2];
                return formated;
            }
        },
        nationality: {
            data:'',
            required: false,
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
        birthLocation: {
            data:'',
            required: false,
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
        maritalStatus: {
            data:'',
            required: false,
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data === null ||
                    data.length === 0
                );
                return !this.hasErrors;
            }
        },
        gender: {
            data:'',
            required: false,
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
            required: false,
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
            required: false,
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            },
            mask: function () {
                this.data = this.data.replace(/D/g,"")
                this.data = this.data.replace(/^(\d{5})(\d)/,"$1-$2");
            },
            unmask: function () {
                return this.data.replace(/\D/g, "");
            },
            findCep: function() {
                if (this.data.length >= 9) {   
                    ws.findCep(this.data).then(function(response){
                        formInputs.address.data = response.data.logradouro;
                        formInputs.neighborhood.data = response.data.bairro;
                        formInputs.city.data = response.data.localidade;
                        formInputs.state.data = response.data.uf;
                    });
                } 
            }
        },
        address: {
            data:'',
            required: false,
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
        addressNumber: {
            data:'',
            required: false,
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
            required: false,
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
            required: false,
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
            required: false,
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
            required: false,
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
        pix: {
            data:'',
            required: false,
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0 ||
                    data === 'Digite seu pix'
                );
                return !this.hasErrors;
            }
        },
        agency: {
            data:'',
            required: false,
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
            required: false,
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
        accountOwner: {
            data:'',
            required: false,
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
        accountOwnerCpf: {
            data:'',
            required: false,
            hasErrors: false,
            errorMessage: 'Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
                return !this.hasErrors;
            },
            mask: function () {
                this.data = this.data.replace(/\D/g,"");      
                this.data = this.data.replace(/(\d{3})(\d)/,"$1.$2");      
                this.data = this.data.replace(/(\d{3})(\d)/,"$1.$2");
                this.data = this.data.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
            },
            unmask: function () {
                return this.data.replace(/\D/g, "");
            }
        }
    };

    var validateForm = function() {
        var isValid = true;
        var keys = Object.keys(formInputs);
        var payload = {};
        for(var i = 0; i < keys.length; i++) {
            if (!formInputs[keys[i]].required) continue;
            
            var validation = formInputs[keys[i]].validate();
            
            if (!validation) {
                isValid = false;
                hasFormErrors = true;
            } else {
                if (formInputs[keys[i]].unmask === undefined) {
                    payload[keys[i]] = formInputs[keys[i]].data;
                } else {
                    payload[keys[i]] = formInputs[keys[i]].unmask();
                }
            }
        }
        return {isValid: isValid, payload: payload};
    };
    
    var register = function(router,event, modal, loading) {
        event.preventDefault();
        var validation = validateForm();
        hcaptchaParams.response = hcaptcha.getResponse(hcaptchaParams.widgetId);
        if (validation.isValid && hcaptchaParams.response !== "") { 
            loading.toogleLoad();
            validation.payload.captchaKey = hcaptchaParams.response;
            ws.register(validation.payload).then(
                function (response) {
                    auth.setToken(response.data.token);
                    loading.toogleLoad();
                    modal.registerComplete(
                        function(){router.push('dashboard'); modal.toggle()},
                        registerRequirements.protectedRegister
                    )       
                }
            ).catch(function (err) {
                console.log(err)
            })
        }   
    };

    var saveUser = function (router,event, modal, loading) {
        event.preventDefault();
        var validation = validateForm();
        if (validation.isValid) { 
            loading.toogleLoad();
            validation.payload.password = "#######";
            validation.payload.email = formInputs.email.data;
            validation.payload.cpfCnpj = formInputs.cpfCnpj.data;
            ws.changeUser(this.userId, validation.payload).then(
                function(response){
                    window.location.reload();
                }
            ).catch(function(err){
                console.error(err);
                alert("Erro inesperado. Tente novamente mais tarde");
            }).finally(function(){loading.toogleLoad();})
        }   
    }

    var getUserRequirements = function(params) {
        ws.getRegisterOptions().then(function(response){
            Object.assign(registerRequirements, response.data);
            setRequiredInputs();
        }).catch(function(err){
            console.error(err);
            alert("Erro ao carregar conteúdo. Tente novamente mais tarde");
        })
    }

    var setRequiredInputs = function() {
        Object.keys(formInputs).forEach(function (key) {
            if (key === "password" || key === "email" || key === "cpfCnpj") return;
            formInputs[key].required = registerRequirements.requirements[key] !== undefined ? registerRequirements.requirements[key] : true;
        });
    }

    var setDataToEdit = function(user) {
        this.isEditing = true;
        this.userId = user.id
        formInputs.password.required = false;
        formInputs.email.required = false;
        formInputs.cpfCnpj.required = false;
        Object.keys(user).forEach(function(key){
            if (user[key] !== null && formInputs[key] !== undefined) {
                formInputs[key].data = user[key];
                if (formInputs[key].mask !== undefined) {
                    if (key === 'birthdate') {
                        formInputs[key].data = new Date(formInputs[key].data).toLocaleDateString()
                    } else {
                        formInputs[key].mask();
                    } 
                }
            }
        })
    }

    var renderHCaptcha = function() {
        hcaptchaParams.widgetId = hcaptcha.render('h-captcha', {
            sitekey: window.divulgadores.configs.captchaKey
        })
    }
    
    return {
        formInputs,
        registerRequirements,
        hasFormErrors,
        optionsLists,
        isEditing,
        saveUser,
        register,
        getUserRequirements,
        setDataToEdit,
        renderHCaptcha
    };
})();