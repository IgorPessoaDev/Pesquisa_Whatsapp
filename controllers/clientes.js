const conexao = require("../conexao");
const yup = require('yup');
const temp = require('../config/dataHora');
class clientes {
    async listar(req, res) {
        const texto = "Listar clientes";
        console.log(temp(), `Acessou ${texto}`);
        let sql = `SELECT *, DATE_FORMAT(data_hora, '%d/%m/%Y %H:%i') as data FROM clientes`;

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
        const texto = "Mostrar clientes";
        console.log(temp(), `Acessou ${texto}`);
        let id = req.params.id;;
        const sql = `SELECT * FROM clientes WHERE id= '${id}'`;

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
        const texto = "Cadastrar clientes";
        console.log(temp(), `Acessou ${texto}`);
        let nome = req.body.nome;
        let celular = req.body.celular;
        let zap_valido = req.body.zap_valido;
        let receber_pesquisa = req.body.receber_pesquisa;
        const sql = `INSERT INTO clientes (nome, celular, zap_valido, receber_pesquisa) VALUES ('${nome}', '${celular}', '${zap_valido}', '${receber_pesquisa}')`

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
        const texto = "Editar clientes";
        console.log(temp(), `Acessou ${texto}`);
        let id = req.body.id;
        let nome = req.body.nome;
        let celular = req.body.celular;
        let zap_valido = req.body.zap_valido;
        let receber_pesquisa = req.body.receber_pesquisa;
        const sql = `UPDATE clientes SET nome= '${nome}', celular= '${celular}', zap_valido='${zap_valido}', receber_pesquisa= '${receber_pesquisa}' WHERE id= ${id}`;

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
        const texto = "Deletar clientes";
        console.log(temp(), `Acessou ${texto}`);
        let id = req.params.id;
        const sql = `DELETE FROM clientes WHERE id=${id}`;

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
}

module.exports = new clientes();