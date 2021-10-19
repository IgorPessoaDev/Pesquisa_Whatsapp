const { Router } = require("express");
//const { route } = require("./app");
const usuarios = require('./controllers/usuarios');
const perguntas = require('./controllers/perguntas');
const pesquisa = require('./controllers/pesquisa');
const clientes = require('./controllers/clientes');
const venom = require('./controllers/venom');
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

module.exports = routes;