const { Router } = require("express");
//const { route } = require("./app");
const usuarios = require('./controllers/usuarios');
const perguntas = require('./controllers/perguntas');
const pesquisa = require('./controllers/pesquisa');
const clientes = require('./controllers/clientes');
const venom = require('./controllers/venom');
const time = require('./config/dataHora');
const conexao = require("./conexao");


//Midd Lewares
function validarLogin(req, res, next) {
    console.log(time(), "Validando Login");
    const usuario = req.body.usuario;
    const senha = req.body.senha;
    const sql = `SELECT * FROM usuarios WHERE usuario = '${usuario}' AND senha = '${senha}';`;

    conexao.query(sql, function (err, result, fields) {
        if (err) {
            console.log(time(), "Erro ao bucar no BD");
            return res.status(200).json({
                error: true,
                code: 404,
                msg: "Erro ao Buscar no Banco de Dados",
                err: err
            });
        } else {
            const resposta = JSON.parse(JSON.stringify(result));
            //console.log(time(),resposta[0]);
            if (resposta.length === 0) {
                console.log(time(), "Login Invalido");
                return res.status(200).json({
                    error: "true",
                    code: 401,
                    msg: "Usuário ou senha inválidos"
                });
            } else if (resposta.length === 1) {
                console.log(time(), "Login OK");
                return res.status(200).json({
                    error: "false",
                    code: 200,
                    msg: "LOGIN OK",
                    resposta: resposta[0]
                });
            }

        }
    });

}


const routes = new Router();

// usuarios
routes.get('/listar_usuarios', usuarios.listar);
routes.get('/mostrar_usuarios/:id', usuarios.mostrar);
routes.post('/cadastrar_usuarios', usuarios.cadastrar);
routes.put('/editar_condutor', usuarios.editar);
routes.delete('/deletar_usuarios/:id', usuarios.delete);

//perguntas
routes.get('/listar_perguntas', perguntas.listar);
routes.get('/mostrar_perguntas/:id', perguntas.mostrar);
routes.post('/cadastrar_perguntas', perguntas.cadastrar);
routes.put('/editar_perguntas', perguntas.editar);
routes.delete('/deletar_perguntas/:id', perguntas.deletar);

//Pesquisas
routes.get('/listar_pesquisas', pesquisa.listar);
routes.get('/mostrar_pesquisas/:id', pesquisa.mostrar);
routes.post('/cadastrar_pesquisas', pesquisa.cadastrar);
routes.put('/editar_pesquisas', pesquisa.editar);
routes.delete('/deletar_pesquisas/:id', pesquisa.deletar);

//clientes
routes.get('/listar_clientes', clientes.listar);
routes.get('/mostrar_clientes/:id', clientes.mostrar);
routes.post('/cadastrar_clientes', clientes.cadastrar);
routes.put('/editar_clientes', clientes.editar);
routes.delete('/deletar_clientes/:id', clientes.deletar);

//LOGIN
routes.post('/login/', validarLogin);
routes.post('/enviar_pesquisa', venom.enviar);
routes.post('/zap_valido', venom.zap_valido);

module.exports = routes;