const conexao = require("../conexao");
var faker = require('faker-br');
const temp = require('../config/dataHora');

function gravar() {
    return new Promise((resolve, reject) => {
        let nome = faker.name.firstName() + " " + faker.name.lastName();
        let celular = faker.phone.phoneNumberFormat();
        const sql = `INSERT INTO clientes (nome, celular, zap_valido, receber_pesquisa) VALUES ('${nome}', '${celular}', 'nao', 'sim')`;

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