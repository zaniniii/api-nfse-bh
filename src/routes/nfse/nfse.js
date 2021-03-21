const nfse = require('../../modules/nfse');
const { check, validationResult } =require('express-validator');
const NfseSchema = require('../../models/nfse')
const auth = require('../../../config/auth')
const fs = require('fs');

module.exports = (app) => {

    // Consultar NFS-e
    app.post('/nfse/consultar', auth,  [
        check('cnpj').trim().escape().not().isEmpty(),
        check('inscricaoMunicipal').trim().escape().not().isEmpty()
    ], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { cnpj, inscricaoMunicipal, dataInicial, dataFinal, NumeroNfse } = req.body

        try {
            const result = await nfse.ConsultarNfse({ cnpj, inscricaoMunicipal, dataInicial, dataFinal, NumeroNfse });
            if(result.error){
                res.status(404).json(result);
                return;
            }
            res.json(result)
        } catch (error) {
            res.json({ error: true, message: 'Ocorreu alguma falha com a comunicação do webservice soap.' })
        }
    })

    // Gerar NFS-e
    app.post('/nfse/gerar', auth,  [
        check('cnpj').trim().escape().not().isEmpty(),
        check('inscricaoMunicipal').trim().escape().not().isEmpty()
    ], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        
        const { 
            cnpj, 
            inscricaoMunicipal, 
            emailTomador,
            NumeroRps,
            SerieRps,
            TipoRps,
            DataEmissao,
            NaturezaOperacao,
            RegimeEspecialTributacao,
            OptanteSimplesNacional,
            IncentivadorCultural,
            Status,
            ValorServicos,
            ValorDeducoes,
            ValorPis,
            ValorCofins,
            ValorInss,
            ValorIr,
            ValorCsll,
            IssRetido,
            ValorIss,
            OutrasRetencoes,
            BaseCalculo,
            Aliquota,
            ValorLiquidoNfse,
            DescontoIncondicionado,
            DescontoCondicionado,
            ItemListaServico,
            CodigoCnae,
            CodigoTributacaoMunicipio,
            Discriminacao,
            CodigoMunicipio,
            tomadorCpf,
            tomadorCnpj,
            tomadorInscricaoMunicipal,
            tomadorRazaoSocial,
            tomadorEndereco,
            tomadorEnderecoNumero,
            tomadorEnderecoComplemento,
            tomadorEnderecoBairro,
            tomadorEnderecoCodigoMunicipio,
            tomadorEnderecoUf,
            tomadorEnderecoCep,
        } = req.body

        const notaFiscal = new NfseSchema();

        
        notaFiscal.LoteRps.Cnpj = cnpj
        notaFiscal.LoteRps.InscricaoMunicipal = inscricaoMunicipal

        notaFiscal.IdentificacaoRps.Numero = NumeroRps
        notaFiscal.IdentificacaoRps.Serie = SerieRps
        notaFiscal.IdentificacaoRps.Tipo = TipoRps
        notaFiscal.DataEmissao = DataEmissao
        notaFiscal.NaturezaOperacao = NaturezaOperacao
        notaFiscal.RegimeEspecialTributacao = RegimeEspecialTributacao
        notaFiscal.OptanteSimplesNacional = OptanteSimplesNacional
        notaFiscal.IncentivadorCultural = IncentivadorCultural
        notaFiscal.Status = Status

        notaFiscal.Servico.Valores.ValorServicos = ValorServicos
        notaFiscal.Servico.Valores.ValorDeducoes = ValorDeducoes
        notaFiscal.Servico.Valores.ValorPis = ValorPis
        notaFiscal.Servico.Valores.ValorCofins = ValorCofins
        notaFiscal.Servico.Valores.ValorInss = ValorInss
        notaFiscal.Servico.Valores.ValorIr = ValorIr
        notaFiscal.Servico.Valores.ValorCsll = ValorCsll
        notaFiscal.Servico.Valores.IssRetido = IssRetido
        notaFiscal.Servico.Valores.ValorIss = ValorIss
        notaFiscal.Servico.Valores.OutrasRetencoes = OutrasRetencoes
        notaFiscal.Servico.Valores.BaseCalculo = BaseCalculo
        notaFiscal.Servico.Valores.Aliquota = Aliquota
        notaFiscal.Servico.Valores.ValorLiquidoNfse = ValorLiquidoNfse
        notaFiscal.Servico.Valores.DescontoIncondicionado = DescontoIncondicionado
        notaFiscal.Servico.Valores.DescontoCondicionado = DescontoCondicionado
        notaFiscal.Servico.ItemListaServico = ItemListaServico
        notaFiscal.Servico.CodigoCnae = CodigoCnae
        notaFiscal.Servico.CodigoTributacaoMunicipio = CodigoTributacaoMunicipio
        notaFiscal.Servico.Discriminacao = Discriminacao
        notaFiscal.Servico.CodigoMunicipio = CodigoMunicipio

        notaFiscal.Prestador.Cnpj = cnpj
        notaFiscal.Prestador.InscricaoMunicipal = inscricaoMunicipal

        notaFiscal.Tomador.IdentificacaoTomador.CpfCnpj.Cpf = tomadorCpf
        notaFiscal.Tomador.IdentificacaoTomador.CpfCnpj.Cnpj = tomadorCnpj
        notaFiscal.Tomador.IdentificacaoTomador.InscricaoMunicipal = tomadorInscricaoMunicipal
        notaFiscal.Tomador.RazaoSocial = tomadorRazaoSocial
        notaFiscal.Tomador.Endereco.Endereco = tomadorEndereco
        notaFiscal.Tomador.Endereco.Numero = tomadorEnderecoNumero
        notaFiscal.Tomador.Endereco.Complemento = tomadorEnderecoComplemento
        notaFiscal.Tomador.Endereco.Bairro = tomadorEnderecoBairro
        notaFiscal.Tomador.Endereco.CodigoMunicipio = tomadorEnderecoCodigoMunicipio
        notaFiscal.Tomador.Endereco.Uf = tomadorEnderecoUf
        notaFiscal.Tomador.Endereco.Cep = tomadorEnderecoCep

        try {
            const result = await nfse.GerarNfse({ notaFiscal, emailTomador });
            if(result.error){
                res.status(404).json(result);
                return;
            }
            res.json(result)
        } catch (error) {
            res.json({ error: true, message: 'Ocorreu alguma falha com a comunicação do webservice soap.' })
        }
    })

    // Cancelar NFS-e
    app.post('/nfse/cancelar', auth,  [
        check('cnpj').trim().escape().not().isEmpty(),
        check('inscricaoMunicipal').trim().escape().not().isEmpty(),
        check('numeroNfse').trim().escape().not().isEmpty(),
        check('codigoMunicipio').trim().escape().not().isEmpty()
    ], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { cnpj, inscricaoMunicipal, numeroNfse, codigoMunicipio } = req.body

        try {
            const result = await nfse.CancelarNfse({cnpj, inscricaoMunicipal, numeroNfse, codigoMunicipio})
            if(result.error){
                res.status(404).json(result);
                return;
            }
            res.json(result)
        } catch (error) {
            res.json({ error: true, message: 'Ocorreu alguma falha com a comunicação do webservice soap.' })
        }
    })

    app.get('/nfse/pdf/:numeroNfse', auth, (req, res) => {
        const numeroNfse = req.params.numeroNfse
        if(!numeroNfse){
            res.status(402).json({error: true, code: 402, msg: "Informe o número da NFS-e."})
            return;
        }

        fs.readFile(`notas_fiscais/pdf/nfse-${numeroNfse}.pdf`, (err, pdf) => {
            if(err){
                res.status(402).json({error: true, code: 402, msg: `O PDF da NFS-e ${numeroNfse} não foi encontrado.`})
                return;
            }
    
            res.type('application/pdf');
            res.status(200).end(pdf);
        });
    })

}