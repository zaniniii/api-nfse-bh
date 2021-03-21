const jwt = require('jsonwebtoken');
const { check, validationResult } =require('express-validator');

module.exports = (app) => {

    app.post('/auth', [
        check('user').trim().escape().not().isEmpty(),
        check('password').trim().escape().not().isEmpty().isLength({ min: 6 })
    ], (req, res) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { user, password } = req.body;

        if (user == process.env.API_USER && password == process.env.API_PASSWORD) {
            const token = jwt.sign({ user }, process.env.JWT_SECRET, {})
            const result = {
                code: 200,
                success: true,
                accessToken: token
            }
            return res.status(result.code).json(result);
        }

        const err = {
            code: 401,
            error: true,
            message: 'Login inválido.'
          }

        return res.status(err.code).json(err);

    })
}