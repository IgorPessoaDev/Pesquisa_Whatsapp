const conexao = require("../conexao");
const yup = require('yup');
const temp = require('../config/dataHora');
class perguntas {
    async listar(req, res) {
        const texto = "Listar perguntas";
        console.log(temp(), `Acessou ${texto}`);
        let sql = `SELECT *, DATE_FORMAT(data_hora, '%d/%m/%Y %H:%i') as data FROM perguntas`;
        await conexao.query(sql, function (err, result, statics) {
            if (err) {
                console.log(temp(), `Erro ao ${texto}`)
                console.log(err.sqlMessage)
                return res.status(500).json({
                    error: 'sim',
                    code: 500,
                    msg: `Erro ao ${texto}`,
                    msgError: err.sqlMessage
                });
            } else {
                var resposta = JSON.parse(JSON.stringify(result));
                console.log(temp(), `Sucesso ao ${texto}`)
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
        const texto = "mostrar perguntas";
        console.log(temp(), `Acessou ${texto}`);
        const id = req.params.id;
        const sql = `SELECT * FROM perguntas WHERE id= '${id}'`;
        await conexao.query(sql, function (err, result, statics) {
            if (err) {
                console.log(temp(), `Erro ao ${texto}`)
                console.log(err.sqlMessage)
                return res.status(500).json({
                    error: 'sim',
                    code: 500,
                    msg: `Erro ao ${texto}`,
                    msgError: err.sqlMessage
                });
            } else {
                var resposta = JSON.parse(JSON.stringify(result));
                console.log(temp(), `Sucesso ao ${texto}`)
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
        const texto = "Cadastrar perguntas";
        console.log(temp(), `Acessou ${texto}`);
        let titulo = req.body.titulo;
        let pergunta = req.body.pergunta;
        let sql = `INSERT INTO perguntas (titulo, pergunta) VALUES ('${titulo}', '${pergunta}')`;

        await conexao.query(sql, function (err, result, statics) {
            if (err) {
                console.log(temp(), `Erro ao ${texto}`)
                console.log(err.sqlMessage)
                return res.status(500).json({
                    error: 'sim',
                    code: 500,
                    msg: `Erro ao ${texto}`,
                    msgError: err.sqlMessage
                });
            } else {
                var resposta = JSON.parse(JSON.stringify(result));
                console.log(temp(), `Sucesso ao ${texto}`)
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
        const texto = "Editar perguntas";
        console.log(temp(), `Acessou ${texto}`);
        const id = req.body.id;
        const titulo = req.body.titulo;
        const pergunta = req.body.pergunta;
        const sql = `UPDATE perguntas SET titulo= '${titulo}', pergunta= '${pergunta}' WHERE id= ${id}`;

        await conexao.query(sql, function (err, result, statics) {
            if (err) {
                console.log(temp(), `Erro ao ${texto}`)
                console.log(err.sqlMessage)
                return res.status(500).json({
                    error: 'sim',
                    code: 500,
                    msg: `Erro ao ${texto}`,
                    msgError: err.sqlMessage
                });
            } else {
                var resposta = JSON.parse(JSON.stringify(result));
                console.log(temp(), `Sucesso ao ${texto}`)
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
        const texto = "Deletar perguntas";
        console.log(temp(), `Acessou ${texto}`);
        const id = req.params.id;

        let sql = `DELETE FROM perguntas WHERE id=${id}`;
        await conexao.query(sql, function (err, result, statics) {
            if (err) {
                console.log(temp(), `Erro ao ${texto}`)
                console.log(err.sqlMessage)
                return res.status(500).json({
                    error: 'sim',
                    code: 500,
                    msg: `Erro ao ${texto}`,
                    msgError: err.sqlMessage
                });
            } else {
                var resposta = JSON.parse(JSON.stringify(result));
                console.log(temp(), `Sucesso ao ${texto}`)
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
module.exports = new perguntas();