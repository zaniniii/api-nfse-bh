const Signature = require('../modules/signature')

module.exports = async ({cnpj, inscricaoMunicipal, numeroNfse, codigoMunicipio }) => {

    const nfseDadosMsg = `<?xml version='1.0' encoding='UTF-8'?>
            <CancelarNfseEnvio xmlns="http://www.abrasf.org.br/nfse.xsd">
                <Pedido xmlns="http://www.abrasf.org.br/nfse.xsd">
                    <InfPedidoCancelamento
                        Id="pedidoCancelamento_${numeroNfse}">
                        <IdentificacaoNfse>
                            <Numero>${numeroNfse}</Numero>
                            <Cnpj>${cnpj}</Cnpj>
                            <InscricaoMunicipal>${inscricaoMunicipal}</InscricaoMunicipal>
                            <CodigoMunicipio>${codigoMunicipio}</CodigoMunicipio>
                        </IdentificacaoNfse>
                        <CodigoCancelamento>2</CodigoCancelamento>
                    </InfPedidoCancelamento>
                </Pedido>
            </CancelarNfseEnvio>`;


    let operator = {
        nfseCabecMsg: `<?xml version="1.0" encoding="UTF-8"?>
            <cabecalho xmlns="http://www.abrasf.org.br/nfse.xsd"
                versao="1.00">
                <versaoDados>1.00</versaoDados>
            </cabecalho>`,
        nfseDadosMsg: await Signature.sign(nfseDadosMsg, 'InfPedidoCancelamento')
    }
    
    return operator;
    
}