const conexao = require("../conexao");
const yup = require('yup');
const temp = require('../config/dataHora');

class pesquisas_realizadas {
    async listar(req, res) {
        const texto = "Listar pesquisas realizadas";
        console.log(`Acessou ${texto}`);
        let sql = `SELECT *, DATE_FORMAT(data_hora, '%d/%m/%Y %H:%i') as data FROM pesquisas_realizadas`;
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
        let topico = req.body.topico;
        let pergunta = req.body.pergunta;
        let usuario = req.body.usuario;
        let qtd_clientes = req.body.qtd_clientes;
        let sql = `INSERT INTO pesquisas_realizadas (topico, pergunta, usuario , qtd_clientes) VALUES ('${topico}','${pergunta}', '${usuario}', '${qtd_clientes}')`;

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
module.exports = new pesquisas_realizadas();