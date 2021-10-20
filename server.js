const app = require('./app');
const conexao = require('./conexao');
const temp = require('./config/dataHora')
conexao.connect(function (err) {
    if (err) {
        console.log(temp(), "Erro ao Conectar no Banco de Dados!");
        console.log(err);
    } else {
        console.log(temp(), "Conectado no Banco de Dados!");
    }
});
app.listen(5000, () => {
    console.log(temp(), "Servidor iniciado na porta 8081");
});