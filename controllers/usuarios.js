const conexao = require("../conexao");
const yup = require('yup');
const temp = require('../config/dataHora');

class usuarios {

    async listar(req, res) {
        const texto = "Listar usuarios";
        console.log(`Acessou ${texto}`);
        let sql = "SELECT *, DATE_FORMAT(data_hora, '%d/%m/%Y %H:%i') as data FROM usuarios";
        await conexao.query(sql, function (err, result, statics) {
            if (err) {
                console.log(`Erro ao ${texto}`)
                console.log(err.sqlMessage)
                return res.status(500).json({
                    error: 'sim',
                    code: 500,
                    msg: `Erro ao ${texto}`,
                    msgError: err.sqlMessage
                });
            } else {
                var resposta = JSON.parse(JSON.stringify(result));
                console.log(`Sucesso ao ${texto}`)
                return res.status(200).json({
                    error: 'nao',
                    code: 200,
                    msg: `Sucesso ao ${texto}`,
                    resultado: resposta
                });
            }
        })
    };

    async mostrar(req, res) {
        const id = req.params.id;
        const texto = "mostrar usuarios";
        console.log(`Acessou ${texto}`)
        let sql = `SELECT * FROM usuarios WHERE id= '${id}'`;
        await conexao.query(sql, (err, result, statics) => {
            if (err) {
                console.log(`Erro ao ${texto}`)
                console.log(err.sqlMessage)
                return res.status(500).json({
                    error: 'sim',
                    code: 500,
                    msg: `Erro ao ${texto}`,
                    msgError: err.sqlMessage
                });
            } else {
                var resposta = JSON.parse(JSON.stringify(result));
                console.log(`Sucesso ao ${texto}`);
                return res.status(200).json({
                    error: "nao",
                    code: 200,
                    msg: `Sucesso ao ${texto}`,
                    resultado: resposta
                })
            }
        })
    };

    async cadastrar(req, res) {
        const texto = "Cadastrar usuarios";
        console.log(`Acessou ${texto}`);
        const usuario = req.body.usuario;
        const senha = req.body.senha;
        const admin = req.body.admin;
        let sql = `INSERT INTO usuarios (usuario, senha, admin) VALUES ('${usuario}', '${senha}', '${admin}')`;
        await conexao.query(sql, function (err, result, statics) {
            if (err) {
                console.log(`Erro ao ${texto}`)
                console.log(err.sqlMessage)
                return res.status(500).json({
                    error: 'sim',
                    code: 500,
                    msg: `Erro ao ${texto}`,
                    msgError: err.sqlMessage
                });
            } else {
                var resposta = JSON.parse(JSON.stringify(result));
                console.log(`Sucesso ao ${texto}`)
                return res.status(200).json({
                    error: 'nao',
                    code: 200,
                    msg: `Sucesso ao ${texto}`,
                    resultado: resposta
                });
            }
        })
    };

    async editar(req, res) {
        const texto = "Editar usuarios";
        console.log(`Acessou ${texto}`);
        const id = req.body.id;
        const usuario = req.body.usuario;
        const senha = req.body.senha;
        const admin = req.body.admin;

        const sql = `UPDATE usuarios SET usuario= '${usuario}', senha= '${senha}', admin='${admin}' WHERE id= ${id}`;

        await conexao.query(sql, function (err, result, statics) {
            if (err) {
                console.log(`Erro ao ${texto}`)
                console.log(err.sqlMessage)
                return res.status(500).json({
                    error: 'sim',
                    code: 500,
                    msg: `Erro ao ${texto}`,
                    msgError: err.sqlMessage
                });
            } else {
                var resposta = JSON.parse(JSON.stringify(result));
                console.log(`Sucesso ao ${texto}`)
                return res.status(200).json({
                    error: 'nao',
                    code: 200,
                    msg: `Sucesso ao ${texto}`,
                    resultado: resposta
                });
            }
        })
    };

    async delete(req, res) {
        const texto = "Deletar usuarios";
        console.log(`Acessou ${texto}`);
        const id = req.params.id;

        let sql = `DELETE FROM usuarios WHERE id=${id}`;
        await conexao.query(sql, function (err, result, statics) {
            if (err) {
                console.log(`Erro ao ${texto}`)
                console.log(err.sqlMessage)
                return res.status(500).json({
                    error: 'sim',
                    code: 500,
                    msg: `Erro ao ${texto}`,
                    msgError: err.sqlMessage
                });
            } else {
                var resposta = JSON.parse(JSON.stringify(result));
                console.log(`Sucesso ao ${texto}`)
                return res.status(200).json({
                    error: 'nao',
                    code: 200,
                    msg: `Sucesso ao ${texto}`,
                    resultado: resposta
                });
            }
        })
    };
};
module.exports = new usuarios();