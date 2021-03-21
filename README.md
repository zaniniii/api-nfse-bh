# Micro-serviço NFS-e v1.0.0
Micro-serviço responsável pela comunicação com o webservice da prefeitura de BH para emissão e consulta de notas fiscais.

## Atenção!
Esse é um micro-serviço desenvolvido com único e exclusivo, intuito de facilitar a comunicação com webservice da prefeitura.

## Tecnologias
* Nodejs

## Pré-requisitos
- **Node.js** versão 8 ou superior;

## Instalação e Execução
1. Faça o clone do repositório e no terminal e navegue até a pasta;
2. Instale as dependências do projeto com `yarn`;
4. Rode a versão de desenvolvimento com `yarn dev`;

## Endpoints
* / (index)
* /auth (Autenticação para gerar um token que protege os demais endpoints )
* /nfse/consultar (Consultar NFS-e por período ou por número da nota)
* /nfse/gerar (Gerar uma nova NFS-e)
* /nfse/cancelar (Cancelar NFS-e)

## Auth
Foi implementado uma simples autenticão com o intuito de proteger os endpoints referentes a NFS-e. Para a autenticação funcionar corretamente, deve ser setado as seguintes configurações no arquivo `.env`:

* JWT_SECRET
  * Utilize uma chave contendo caracteres especiais, números e letras. Uma dica seria gerar uma chave através do [Site](https://xorbin.com/tools/sha256-hash-calculator).
* API_USER
* API_PASSWORD

## Configurações
A Api conta com o recurso de variáveis de ambiente. Que devem ser definadas no arquivo .env que se encontra na raiz do projeto.
Inicialmente é disponibilizado um arquivo com o nome '.env-example' com algumas váriaveis default. Esse arquivo deve ser renomenado para '.env'.

## Certificado
Para conseguir conectar ao servidor da prefeitura é necessário a utilização do certificado A1 com a extensão *.pfx.
O certificado deve ficar na pasta 'certs' que se encontra na raiz desse projeto.
Será necessário informar o caminho do certificado no arquivo .env através da tag 'PATH_CERT' e a senha na tag 'PWD_CERT'.

* Será necessário gerar um certificado com o formato .pem, para assinatura dos xml's. Para realizar essa tarefa, execute o seguinte comando: `openssl pkcs12 -in arquivo.pfx -out cert.pem -nodes`

## Dependências
* "consign": "^0.1.6"
* "cpf_cnpj": "^0.2.0"
* "date-fns": "^2.11.1"
* "dotenv": "^8.2.0"
* "ejs": "^3.0.1"
* "express": "^4.17.1"
* "express-validator": "^6.4.0"
* "html-pdf": "^2.2.0"
* "jsonwebtoken": "^8.5.1"
* "nodemailer": "^6.4.6"
* "nodemailer-mailgun-transport": "^2.0.0"
* "pem": "^1.14.4"
* "soap": "^0.31.0"
* "xml-crypto": "^1.4.0"
* "xml2json": "^0.12.0"

## Sugestão
Utilize o Postman para testar suas chamadas. [https://www.getpostman.com/](https://www.getpostman.com/).

## Contribuidores
* Luiz Carlos Zanini - <zanini@za9.com.br>

<br/>

#### Caso eu tenha te ajudado:
[<img src="https://za9.com.br/assets/img/cafezin.png" width="450px" />](https://nubank.com.br/pagar/179v2u/aCol8TuQus)
