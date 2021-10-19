const conexao = require("../conexao");
var faker = require('faker-br');
const temp = require('../config/dataHora');

function gravar() {
    return new Promise((resolve, reject) => {
        let titulo = faker.lorem.sentence();
        let pergunta = faker.lorem.paragraph();
        let sql = `INSERT INTO perguntas (titulo, pergunta) VALUES ('${titulo}', '${pergunta}')`;

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
    for (let index = 0; index < 10; index++) {
        await gravar().then((res) => {
            console.log(temp(), res);
        }).catch((er) => {
            console.log(temp(), er);
        });

    }
};
chamar();