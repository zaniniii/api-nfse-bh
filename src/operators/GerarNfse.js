const Signature = require('../modules/signature')

module.exports =  async ({notaFiscal}) => {

  let Rps = `<Rps>
        <InfRps xmlns="http://www.abrasf.org.br/nfse.xsd" Id="rps15TR">
          <IdentificacaoRps>
            <Numero>${notaFiscal.IdentificacaoRps.Numero}</Numero>
            <Serie>${notaFiscal.IdentificacaoRps.Serie}</Serie>
            <Tipo>${notaFiscal.IdentificacaoRps.Tipo}</Tipo>
          </IdentificacaoRps>
          <DataEmissao>${notaFiscal.DataEmissao}</DataEmissao>
          <NaturezaOperacao>${notaFiscal.NaturezaOperacao}</NaturezaOperacao>
          <RegimeEspecialTributacao>${notaFiscal.RegimeEspecialTributacao}</RegimeEspecialTributacao>
          <OptanteSimplesNacional>${notaFiscal.OptanteSimplesNacional}</OptanteSimplesNacional>
          <IncentivadorCultural>${notaFiscal.IncentivadorCultural}</IncentivadorCultural>
          <Status>${notaFiscal.Status}</Status>
          <Servico>
            <Valores>
              <ValorServicos>${notaFiscal.Servico.Valores.ValorServicos}</ValorServicos>
              <ValorDeducoes>${notaFiscal.Servico.Valores.ValorDeducoes}</ValorDeducoes>
              <ValorPis>${notaFiscal.Servico.Valores.ValorPis}</ValorPis>
              <ValorCofins>${notaFiscal.Servico.Valores.ValorCofins}</ValorCofins>
              <ValorInss>${notaFiscal.Servico.Valores.ValorInss}</ValorInss>
              <ValorIr>${notaFiscal.Servico.Valores.ValorIr}</ValorIr>
              <ValorCsll>${notaFiscal.Servico.Valores.ValorCsll}</ValorCsll>
              <IssRetido>${notaFiscal.Servico.Valores.IssRetido}</IssRetido>
              <ValorIss>${notaFiscal.Servico.Valores.ValorIss}</ValorIss>
              <OutrasRetencoes>${notaFiscal.Servico.Valores.OutrasRetencoes}</OutrasRetencoes>
              <BaseCalculo>${notaFiscal.Servico.Valores.BaseCalculo}</BaseCalculo>
              <Aliquota>${notaFiscal.Servico.Valores.Aliquota}</Aliquota>
              <ValorLiquidoNfse>${notaFiscal.Servico.Valores.ValorLiquidoNfse}</ValorLiquidoNfse>
              <DescontoIncondicionado>${notaFiscal.Servico.Valores.DescontoIncondicionado}</DescontoIncondicionado>
              <DescontoCondicionado>${notaFiscal.Servico.Valores.DescontoCondicionado}</DescontoCondicionado>
            </Valores>
            <ItemListaServico>${notaFiscal.Servico.ItemListaServico}</ItemListaServico>
            <CodigoCnae>${notaFiscal.Servico.CodigoCnae}</CodigoCnae>
            <CodigoTributacaoMunicipio>${notaFiscal.Servico.CodigoTributacaoMunicipio}</CodigoTributacaoMunicipio>
            <Discriminacao>${notaFiscal.Servico.Discriminacao}</Discriminacao>
            <CodigoMunicipio>${notaFiscal.Servico.CodigoMunicipio}</CodigoMunicipio>
          </Servico>
          <Prestador>
            <Cnpj>${notaFiscal.Prestador.Cnpj}</Cnpj>
            <InscricaoMunicipal>${notaFiscal.Prestador.InscricaoMunicipal}</InscricaoMunicipal>
          </Prestador>
          <Tomador>
            <IdentificacaoTomador>
              <CpfCnpj>
                  ${notaFiscal.Tomador.IdentificacaoTomador.CpfCnpj.Cpf ? `<Cpf>${notaFiscal.Tomador.IdentificacaoTomador.CpfCnpj.Cpf}</Cpf>` : `<Cnpj>${notaFiscal.Tomador.IdentificacaoTomador.CpfCnpj.Cnpj}</Cnpj>`}
              </CpfCnpj>
              ${notaFiscal.Tomador.IdentificacaoTomador.InscricaoMunicipal ? `<InscricaoMunicipal>${notaFiscal.Tomador.IdentificacaoTomador.InscricaoMunicipal}</InscricaoMunicipal>`:''}
            </IdentificacaoTomador>
            <RazaoSocial>${notaFiscal.Tomador.RazaoSocial}</RazaoSocial>
            <Endereco>
              <Endereco>${notaFiscal.Tomador.Endereco.Endereco}</Endereco>
              <Numero>${notaFiscal.Tomador.Endereco.Numero}</Numero>
              <Complemento>${notaFiscal.Tomador.Endereco.Complemento}</Complemento>
              <Bairro>${notaFiscal.Tomador.Endereco.Bairro}</Bairro>
              <CodigoMunicipio>${notaFiscal.Tomador.Endereco.CodigoMunicipio}</CodigoMunicipio>
              <Uf>${notaFiscal.Tomador.Endereco.Uf}</Uf>
              <Cep>${notaFiscal.Tomador.Endereco.Cep}</Cep>
            </Endereco>
          </Tomador>
        </InfRps>
      </Rps>`

    let nfseDadosMsg = `<?xml version="1.0" encoding="UTF-8"?>
    <GerarNfseEnvio xmlns="http://www.abrasf.org.br/nfse.xsd">
          <LoteRps xmlns="http://www.abrasf.org.br/nfse.xsd" versao="1.00" Id="lote">
            <NumeroLote>1</NumeroLote>
            <Cnpj>${notaFiscal.LoteRps.Cnpj}</Cnpj>
            <InscricaoMunicipal>${notaFiscal.LoteRps.InscricaoMunicipal}</InscricaoMunicipal>
            <QuantidadeRps>1</QuantidadeRps>
            <ListaRps>
              ${await Signature.sign(Rps, 'InfRps')}
            </ListaRps>
          </LoteRps>
    </GerarNfseEnvio>`

    let operator = {
        nfseCabecMsg: `<?xml version="1.0" encoding="UTF-8"?>
        <cabecalho xmlns="http://www.abrasf.org.br/nfse.xsd"
            versao="1.00">
            <versaoDados>1.00</versaoDados>
        </cabecalho>`,
        nfseDadosMsg: await Signature.sign(nfseDadosMsg, 'LoteRps')
    }

    return operator;
}

