const sendMail = require('./sendMail')

class emailNfse {
    novaNfse({numeroNFSe, emailTo}){
        sendMail({
            emailTo,
            subject: `NFSe - ${process.env.COMPANY_NAME}`,
            anexos: [
                {filename: `nfse-${numeroNFSe}.pdf`, path: `./notas_fiscais/pdf/nfse-${numeroNFSe}.pdf` },
                {filename: `nfse-${numeroNFSe}.xml`, path: `./notas_fiscais/xml/nfse-${numeroNFSe}.xml` }
            ],
            html: `
                <p>
                    Prezado(a) Cliente,<br>
                    Segue anexo a NFS-e referente aos serviços prestados.
                </p>
                <p><b>Atenciosamente</b><br>
                    Equipe ${process.env.COMPANY_NAME}
                </p>
            `
        })
    }
}


module.exports = new emailNfse();