class myKeyInfo{

    constructor(x509Certificate){
        this.x509Certificate = x509Certificate
    }

    getKeyInfo(key) {
            return `<X509Data><X509Certificate>${this.x509Certificate}</X509Certificate></X509Data>`;
    };
    getKey(keyInfo) {
            // return the public key in pem format
   };
}

module.exports =  myKeyInfo;