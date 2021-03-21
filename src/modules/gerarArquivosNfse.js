const pdf = require('html-pdf')
const ejs = require('ejs')
const { format, parseISO } = require('date-fns');
const { CPF, CNPJ } = require('cpf_cnpj');
const municipios = require('../../config/municipios.js')
const fs = require('fs')


class gerarArquivosNfse {

    PDF({nfse}){
        return new Promise((resolve, reject) => {
        //Formatando campos
        nfse.DataEmissao = format(parseISO(nfse.DataEmissao), 'dd/MM/yyyy')
        nfse.PrestadorServico.IdentificacaoPrestador.Cnpj = CNPJ.format(nfse.PrestadorServico.IdentificacaoPrestador.Cnpj)
        nfse.TomadorServico.IdentificacaoTomador.CpfCnpj.Cnpj = CNPJ.format(nfse.TomadorServico.IdentificacaoTomador.CpfCnpj.Cnpj)
        nfse.PrestadorServico.Endereco.Municipio = municipios[nfse.PrestadorServico.Endereco.CodigoMunicipio];
        nfse.TomadorServico.Endereco.Municipio = municipios[nfse.TomadorServico.Endereco.CodigoMunicipio];
        // Valores
        nfse.Servico.Valores.ValorServicos = parseFloat(nfse.Servico.Valores.ValorServicos).toLocaleString('pt-BR', {style:'currency', currency: 'BRL'});
        nfse.Servico.Valores.ValorDeducoes = parseFloat(nfse.Servico.Valores.ValorDeducoes).toLocaleString('pt-BR', {style:'currency', currency: 'BRL'});
        nfse.Servico.Valores.ValorPis = parseFloat(nfse.Servico.Valores.ValorPis).toLocaleString('pt-BR', {style:'currency', currency: 'BRL'});
        nfse.Servico.Valores.ValorCofins = parseFloat(nfse.Servico.Valores.ValorCofins).toLocaleString('pt-BR', {style:'currency', currency: 'BRL'});
        nfse.Servico.Valores.ValorInss = parseFloat(nfse.Servico.Valores.ValorInss).toLocaleString('pt-BR', {style:'currency', currency: 'BRL'});
        nfse.Servico.Valores.ValorIr = parseFloat(nfse.Servico.Valores.ValorIr).toLocaleString('pt-BR', {style:'currency', currency: 'BRL'});
        nfse.Servico.Valores.ValorCsll = parseFloat(nfse.Servico.Valores.ValorCsll).toLocaleString('pt-BR', {style:'currency', currency: 'BRL'});
        nfse.Servico.Valores.IssRetido = parseFloat(nfse.Servico.Valores.IssRetido).toLocaleString('pt-BR', {style:'currency', currency: 'BRL'});
        nfse.Servico.Valores.ValorIss = parseFloat(nfse.Servico.Valores.ValorIss).toLocaleString('pt-BR', {style:'currency', currency: 'BRL'});
        nfse.Servico.Valores.OutrasRetencoes = parseFloat(nfse.Servico.Valores.OutrasRetencoes).toLocaleString('pt-BR', {style:'currency', currency: 'BRL'});
        nfse.Servico.Valores.BaseCalculo = parseFloat(nfse.Servico.Valores.BaseCalculo).toLocaleString('pt-BR', {style:'currency', currency: 'BRL'});
        nfse.Servico.Valores.ValorLiquidoNfse = parseFloat(nfse.Servico.Valores.ValorLiquidoNfse).toLocaleString('pt-BR', {style:'currency', currency: 'BRL'});
        nfse.Servico.Valores.DescontoIncondicionado = parseFloat(nfse.Servico.Valores.DescontoIncondicionado).toLocaleString('pt-BR', {style:'currency', currency: 'BRL'});
        nfse.Servico.Valores.DescontoCondicionado = parseFloat(nfse.Servico.Valores.DescontoCondicionado).toLocaleString('pt-BR', {style:'currency', currency: 'BRL'});
        ejs.renderFile('./src/templates/nfse.ejs', { nfse }, (error, template) => {
    
            if (error) return reject(error);
    
            const options = { filename: `./notas_fiscais/pdf/nfse-${nfse.Numero}.pdf`, format: "A3", "orientation": "portrait", "type": "pdf","border": {
                "top": "0.5in",
                "right": "0.5in",
                "bottom": "0.5in",
                "left": "0.5in"
              }};
    
            pdf.create(template, options).toFile((err, res) => {
                if (err) return console.log(err);
                console.log(`PDF da nota Nº ${nfse.Numero} gerado com sucesso!`)
                return resolve(true)
            });
    
        })
       })

    }

    XML({xmlNfse, dadosNota}){
        return new Promise((resolve, reject) => {
            fs.writeFile(`./notas_fiscais/xml/nfse-${dadosNota.Numero}.xml`, xmlNfse, () => {
                console.log(`XML da nota de Nº ${dadosNota.Numero} gerado com sucesso.`)
                return resolve(true)
            })
        })
    }

}

module.exports = new gerarArquivosNfse();