const conexao = require("../conexao");
const yup = require('yup');
const temp = require('../config/dataHora');

class pesquisa {
    async listar(req, res) {
        const texto = "Listar pesquisas";
        console.log(`Acessou ${texto}`);
        let sql = `SELECT *, DATE_FORMAT(data_hora, '%d/%m/%Y %H:%i') as data FROM pesquisas`;
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
        const texto = "mostrar pesquisas";
        console.log(`Acessou ${texto}`);
        const id = req.params.id;
        const sql = `SELECT * FROM pesquisas WHERE id= '${id}'`;
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
    async cadastrar(req, res) {
        const texto = "Cadastrar pesquisas";
        console.log(`Acessou ${texto}`);
        let usuario = req.body.usuario;
        let titulo = req.body.titulo;
        let pergunta = req.body.pergunta;
        let sql = `INSERT INTO pesquisas (usuario,titulo, pergunta) VALUES ('${usuario}','${titulo}', '${pergunta}')`;

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
        const texto = "Editar pesquisas";
        console.log(`Acessou ${texto}`);
        const id = req.body.id;
        const usuario = req.body.usuario;
        const titulo = req.body.titulo;
        const pergunta = req.body.pergunta;
        const sql = `UPDATE pesquisas SET usuario= '${usuario}',titulo= '${titulo}', pergunta= '${pergunta}' WHERE id= ${id}`;

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
    async deletar(req, res) {
        const texto = "Deletar pesquisas";
        console.log(`Acessou ${texto}`);
        const id = req.params.id;

        let sql = `DELETE FROM pesquisas WHERE id=${id}`;
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
}
module.exports = new pesquisa();