const Nfse = require('../modules/nfse');

module.exports = (app) => {
    app.get('/', (req, res) => {
        
        if(Nfse.getInfoSoap()){
            res.json({  
                api: process.env.API_NAME,
                version: process.env.API_VERSION,
                methods: Object.keys(Nfse.getInfoSoap())
            })
            return;
        }
        res.json({  
            api: process.env.API_NAME,
            version: process.env.API_VERSION,
            soap: 'DISCONECTED'
        })
    })
}