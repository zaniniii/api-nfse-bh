class nfse {
    constructor(){

        this.LoteRps = {
            NumeroLote: 1,
            Cnpj: null,
            InscricaoMunicipal: null,
            QuantidadeRps: 1
        }
        
        this.IdentificacaoRps = {
            Numero: null,
            Serie: null,
            Tipo: null, // 1 - RPS
                        // 2 – Nota Fiscal Conjugada (Mista) 
                        // 3 – Cupom
        }

        this.DataEmissao = null
        
        this.NaturezaOperacao = null // 1 – Tributação no município
                                     // 2 - Tributação fora do município 
                                     // 3 - Isenção
                                     // 4 - Imune
                                     // 5 – Exigibilidade suspensa por decisão judicial 
                                     // 6 – Exigibilidade suspensa por procedimento administrativo

        this.RegimeEspecialTributacao = null // 1 – Microempresa municipal
                                             // 2 - Estimativa
                                             // 3 – Sociedade de profissionais 
                                             // 4 – Cooperativa
                                             // 5 – MEI – Simples Nacional
                                             // 6 – ME EPP – Simples Nacional

        this.OptanteSimplesNacional = null // 1 - Sim
                                           // 2 - Não
        
        this.IncentivadorCultural = null // 1 - Sim
                                         // 2 - Não
        this.Status = null
        this.Servico = {
            Valores: {
                ValorServicos: null,
                ValorDeducoes: null,
                ValorPis: null,
                ValorCofins: null,
                ValorInss: null,
                ValorIr: null,
                ValorCsll: null,
                IssRetido: null,
                ValorIss: null,
                OutrasRetencoes: null,
                BaseCalculo: null,
                Aliquota: null,
                ValorLiquidoNfse: null,
                DescontoIncondicionado: null,
                DescontoCondicionado: null,
            },
            ItemListaServico: null,
            CodigoCnae: null,
            CodigoTributacaoMunicipio: null,
            Discriminacao: null,
            CodigoMunicipio: null,
        }
        
        this.Prestador = {
            Cnpj: null,
            InscricaoMunicipal: null,
        }

        this.Tomador = {
            IdentificacaoTomador: {
                CpfCnpj: {
                    Cnpj: null,
                    Cpf: null
                },
                InscricaoMunicipal: null
            },
            RazaoSocial: null,
            Endereco: {
                Endereco: null,
                Numero: null,
                Complemento: null,
                Bairro: null,
                CodigoMunicipio: null,
                Uf: null,
                Cep: null,
            }
        }


    }
}

module.exports = nfse