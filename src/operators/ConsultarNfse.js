module.exports = ({cnpj, inscricaoMunicipal, dataInicial, dataFinal, NumeroNfse }) => {

    let operator = {}

    if (NumeroNfse) {
        operator = {
            nfseCabecMsg: `<?xml version="1.0" encoding="UTF-8"?>
            <cabecalho xmlns="http://www.abrasf.org.br/nfse.xsd"
                versao="1.00">
                <versaoDados>1.00</versaoDados>
            </cabecalho>`,
            nfseDadosMsg: `<?xml version='1.0' encoding='UTF-8'?>
            <ConsultarNfseEnvio xmlns="http://www.abrasf.org.br/nfse.xsd">
                <Prestador>
                    <Cnpj>${cnpj}</Cnpj>
                    <InscricaoMunicipal>${inscricaoMunicipal}</InscricaoMunicipal>
                </Prestador>
                <NumeroNfse>${NumeroNfse}</NumeroNfse>
            </ConsultarNfseEnvio>`
        }
    } else {
        operator = {
            nfseCabecMsg: `<?xml version="1.0" encoding="UTF-8"?>
            <cabecalho xmlns="http://www.abrasf.org.br/nfse.xsd"
                versao="1.00">
                <versaoDados>1.00</versaoDados>
            </cabecalho>`,
            nfseDadosMsg: `<?xml version='1.0' encoding='UTF-8'?>
            <ConsultarNfseEnvio xmlns="http://www.abrasf.org.br/nfse.xsd">
                <Prestador>
                    <Cnpj>${cnpj}</Cnpj>
                    <InscricaoMunicipal>${inscricaoMunicipal}</InscricaoMunicipal>
                </Prestador>
                <PeriodoEmissao>
                    <DataInicial>${dataInicial}</DataInicial>
                    <DataFinal>${dataFinal}</DataFinal>
                </PeriodoEmissao>     
            </ConsultarNfseEnvio>`
        }
    }

    return operator;

    
}