const Client = require('../../config/soap');
const parse = require('xml2json');
const fs = require('fs');
const { _ConsultarNfse, _GerarNfse, _CancelarNfse } = require('../operators')
const GerarArquivoNfse = require('../modules/gerarArquivosNfse');
const emailNfse = require('./emailNfse')

class Nfse {

    // Retorna todos os metodos oferecidos pelo Soap da Prefeitura de BH
    getInfoSoap(){
        return Client.client.NfseWSService.nfseSOAP;
    }

    // Retorna relação de notas emitidas de um determinado periodo
    ConsultarNfse({cnpj, inscricaoMunicipal, dataInicial, dataFinal, NumeroNfse}){
        const service = Client.client.NfseWSService.nfseSOAP;
        const operator = _ConsultarNfse({cnpj, inscricaoMunicipal, dataInicial, dataFinal, NumeroNfse});
    
        return new Promise((resolve, reject) => {
            service.ConsultarNfse(operator, async (error, result) => {
                // Caso tenha ocorrido algum erro de comunicação com o SOAP
                if (error)  {
                    reject(error);
                    return
                }
                

                // Transforma o resultado XML em JSON
                const resultParse = parse.toJson(result.outputXML);
                const json = JSON.parse(resultParse)

                

                //Verifica se o servidor retornou alguma falha na requisição
                if(json.ConsultarNfseResposta.ListaMensagemRetorno){
                    resolve({error: json.ConsultarNfseResposta.ListaMensagemRetorno.MensagemRetorno})
                    return;
                }
                
                // Caso seja somente info de uma nota
                if (NumeroNfse){
                    resolve({
                        success: true,
                        data: json.ConsultarNfseResposta.ListaNfse.CompNfse.Nfse
                    })
                    return
                }

                //Monta um resultado mais amigável caso o resultado tenha mais de uma nota
                const data = []
                await json.ConsultarNfseResposta.ListaNfse.CompNfse.map( nota => {
                    data.push(nota.Nfse)
                })

                //Retorna as notas
                resolve({
                    success: true,
                    data: data
                })
                
            })
        })
    }

    // Gerar NFS-e
    async GerarNfse({notaFiscal, emailTomador }){
        const service = Client.client.NfseWSService.nfseSOAP;   
        const operator = await _GerarNfse({notaFiscal});
        
        return new Promise((resolve, reject) => {

            service.GerarNfse(operator, async (error, result) => {
                // Caso tenha ocorrido algum erro de comunicação com o SOAP
                if (error)  {
                    reject(error);
                    return
                }

                // Transforma o resultado XML em JSON
                const resultParse = parse.toJson(result.outputXML);
                const json = JSON.parse(resultParse)

                // //Verifica se o servidor retornou alguma falha na requisição
                if(json.GerarNfseResposta.ListaMensagemRetorno){
                    return resolve({error: json.GerarNfseResposta.ListaMensagemRetorno})
                }
                
                resolve({
                    success: true,
                    data: json.GerarNfseResposta
                })

                //Se a nota for gerada com sucesso salvamos um arquivo pdf e outro xml da NFS-e.
                if(json.GerarNfseResposta.ListaNfse){
                    
                    const dadosNota = json.GerarNfseResposta.ListaNfse.CompNfse.Nfse.InfNfse

                    //Coleta o total de retencoes federais;
                    let ValorServicos = dadosNota.Servico.Valores.ValorServicos;
                    let ValorLiquidoNfse = dadosNota.Servico.Valores.ValorLiquidoNfse;
                    let resultadoRetencoes = ValorServicos - ValorLiquidoNfse
                    dadosNota.rentecoesFederais = resultadoRetencoes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    

                    //Gera um arquivo PDF com os valores da NFS-e.
                    await GerarArquivoNfse.PDF({nfse: dadosNota});
                    
                    //Gera um arquivo XML com os valores da NFS-e.
                    await GerarArquivoNfse.XML({xmlNfse: result.outputXML, dadosNota});

                    // Envia um e-mail para o cliente contendo o xml e pdf da NFS-e.
                    emailNfse.novaNfse({numeroNFSe: dadosNota.Numero, emailTo: emailTomador})

                }

                return
            
                
            })
        })
    }

    // Cancelar NFS-e
    async CancelarNfse({cnpj, inscricaoMunicipal, numeroNfse, codigoMunicipio}){
        const service = Client.client.NfseWSService.nfseSOAP;
        const operator = await _CancelarNfse({cnpj, inscricaoMunicipal, numeroNfse, codigoMunicipio});
    
        return new Promise((resolve, reject) => {
            service.CancelarNfse(operator, async (error, result) => {

                // Caso tenha ocorrido algum erro de comunicação com o SOAP
                if (error)  {
                    reject(error);
                    return
                }
                
                // Transforma o resultado XML em JSON
                const resultParse = parse.toJson(result.outputXML);
                const json = JSON.parse(resultParse)

                //Verifica se o servidor retornou alguma falha na requisição
                if(json.CancelarNfseResposta.ListaMensagemRetorno){
                    resolve({error: json.CancelarNfseResposta.ListaMensagemRetorno.MensagemRetorno})
                    return;
                }
                
                resolve({
                    success: true,
                    data: json.CancelarNfseResposta
                })           
            })
        })
    }

}

module.exports = new Nfse();