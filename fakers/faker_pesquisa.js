const conexao = require("../conexao");
var faker = require('faker-br');
const time = require('../config/dataHora');

function gravar() {
    return new Promise((resolve, reject) => {
        let cliente = faker.name.firstName();
        let idchat = "55" + faker.phone.phoneNumberFormat() + "@c.us";
        let titulo = "projeto teste";
        let pergunta = "Voce esta gostando dos nossos serviços nos avalie digitando de 1 a 10";
        let resposta = Math.floor(Math.random() * 10 + 1);
        let sql = `INSERT INTO pesquisas (usuario, cliente,idchat,titulo, pergunta, resposta, finalizado,hora_resp) VALUES ('igor','${cliente}','${idchat}','${titulo}', '${pergunta}','${resposta}', 'sim','${time()}')`;

        conexao.query(sql, function (err, result, statics) {
            if (err) {
                reject(err);
            } else {
                resolve("Gravado com sucesso");
            }
        })
    })
};

async function chamar() {
    for (let index = 0; index < 1; index++) {
        await gravar().then((res) => {
            console.log(time(), res);
        }).catch((er) => {
            console.log(time(), er);
        });
    }
};
chamar();