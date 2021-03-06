const venom = require('venom-bot');
const time = require('../config/dataHora');
const conexao = require('../conexao');
var mensagem_padrao = 'Oi, aqui é da Empresa X, entre em contato conosco pelo tel (77)3452-8854';
var mensagem_resp_errada = "Por favor, digite um número válido entre 0 e 10";
var mensagem_agradecendo = "A Empresa X agradece a sua participação.";
var mensagem_ja_respondeu = "Caro Cliente, você já respondeu a pesquisa. Caso queira entrar em contato conosco, utilize um de nossos canais de atendimento: (77)3452-8854";
var envio;
const respostasTexto = ['UM', 1, 'um', 1, 'Um', 1, 'DOIS', 2, 'dois', 2, 'Dois', 2, 'TRES', 3, 'TRÊS', 3, 'TREZ', 3, 'Tres', 3, 'Três', 3, 'Trez', 3,
    'tres', 3, 'três', 3, 'trez', 3, 'QUATRO', 4, 'Quatro', 4, 'quatro', 4, 'CINCO', 5, 'Cinco', 5, 'cinco', 5, 'SEIS', 6, 'Seis', 6, 'seis', 6, 'SETE', 7,
    'Sete', 7, 'sete', 7, 'OITO', 8, 'Oito', 8, 'oito', 8, 'NOVE', 9, 'Nove', 9, 'nove', 9, 'DEZ', 10, 'Dez', 10, 'Des', 10, 'dez', 10, '1', 1, '2', 2, '3', 3,
    '4', 4, '5', 5, '6', 6, '7', 7, '8', 8, '9', 9, '10', 10];
var resp_correta = false;
var nota = 0;

function msg(numero, msg) {
    envio.sendText(numero, msg).then((result) => {
        console.log(time(), 'MSG Enviada');
    })
        .catch((erro) => {
            console.error(time(), 'Erro MSG', erro);
        });
}

async function localizacao(numero) {
    await envio.sendLocation(numero, '-14.1971', '-41.6693 14', 'Brumado Bahia Brasil')
        .then((result) => {
            console.log(time(), 'Resultado: ', result); //return object success
        })
        .catch((erro) => {
            console.error(time(), 'Deu erro na localização: ', erro); //return object error
        });
}

function verifica_numero(numero) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM pesquisas WHERE idchat="${numero}"`;
        conexao.query(sql, function (erro, resultado, parametros) {
            if (erro) {
                reject(erro);

            } else {
                let resposta = JSON.parse(JSON.stringify(resultado));
                resolve(resposta);
            }
        });
    });
}

async function chamar(numero, mensagem) {
    await verifica_numero(numero).then((res) => {
        // Se o número participa da pesquisa
        if (res.length === 1) {
            if (res[0].finalizado == 'sim') {
                envio.sendImage(
                    numero,
                    'img/correto.png',
                    'correto.png',
                    msg(numero, mensagem_ja_respondeu)
                )
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
            }
            // Se o cliente participa da pesquisa e ainda não respondeu corretamente
            else {

                console.log(time(), "Número faz parte da pesquisa: id:", res[0].id, " - Resposta:", mensagem);
                // Verifica se a resposta é válida
                respostasTexto.forEach((item, index) => {
                    if (mensagem === item) {
                        resp_correta = true;
                        nota = respostasTexto[index + 1];
                    }
                });

                //Se a resposta for válida
                if (resp_correta) {
                    console.log(time(), "resposta valida");
                    let sql = `UPDATE pesquisas SET resposta= '${nota}', finalizado='sim', hora_resp=NOW() WHERE id= ${res[0].id}`;
                    conexao.query(sql, function (err, result, fields) {
                        if (err) {
                            console.log(time(), "Erro ao gravar no BD", err);
                        } else {
                            envio.sendImage(
                                numero,
                                'img/correto.png',
                                'correto.png',
                                msg(numero, mensagem_agradecendo)
                            )
                                .then((result) => {
                                    console.log('Result: ', result); //return object success
                                })
                                .catch((erro) => {
                                    console.error('Error when sending: ', erro); //return object error
                                });
                            console.log(time(), "Respota Gravada no BD");
                        }
                    });
                }
                //Se a resposta NÃO for válida
                else {
                    envio.sendImage(
                        numero,
                        'img/errado.png',
                        'Errado.png',
                        msg(numero, mensagem_resp_errada)
                    )
                        .then((result) => {
                            console.log('Result: ', result); //return object success
                        })
                        .catch((erro) => {
                            console.error('Error when sending: ', erro); //return object error
                        });
                }
                //Zerar as variáveis
                resp_correta = false;
                nota = 0;
            }
        }
        // Se o número não participa da pesquisa
        else {
            msg(numero, mensagem_padrao);
            localizacao(numero);
        }
    }).catch((er) => {
        console.log(time(), er);
    });
}

venom.create(
    (statusSession, session) => {
        console.log(time(), 'Status Session: ', statusSession);
        console.log(time(), 'Session name: ', session);
    }
).then((client) => start(client)).catch((erro) => { console.log(time(), erro); });

function start(client) {
    envio = client;
    client.onMessage((message) => {
        envio = client;
        if (message.body.length != 0 && message.isGroupMsg === false) {
            chamar(message.from, message.body);
        }
    });
}

class Zap {

    async enviar(req, res) {
        const texto = "Enviar Pesquisa";
        console.log(time(), `Acessou ${texto}`);


        const usuario = req.body.usuario;
        const titulo = req.body.titulo;
        const cliente = req.body.cliente;
        const pergunta = String("Olá " + cliente + ". " + req.body.pergunta);
        const cel = String("55" + req.body.cel + "@c.us");


        await envio.sendText(cel, pergunta).then((result) => {
            //console.log(time(),'Pesquisa Enviada:', result);
            let idchat = result.to.remote._serialized;
            let sql = `INSERT INTO pesquisas (usuario, cliente, idchat, titulo, pergunta) VALUES ("${usuario}","${cliente}","${idchat}","${titulo}","${pergunta}")`;
            conexao.query(sql, function (err, result, fields) {
                if (err) {
                    console.log(time(), "Erro ao gravar no BD");
                    return res.status(200).json({
                        error: true,
                        code: 404,
                        msg: "Erro ao Buscar no Banco de Dados",
                        err: err
                    });
                } else {
                    const resposta = JSON.parse(JSON.stringify(result));
                    //console.log(time(),resposta[0]);
                    console.log(time(), "Pesquisa Enviada e Gravada");
                    return res.status(200).json({
                        error: "false",
                        code: 200,
                        msg: "Pesquisa Enviada e Gravada"
                    });
                }
            });
        })
            .catch((erro) => {
                console.error(time(), "Erro ao Enviar a Pesquisa");
                return res.status(200).json({
                    error: true,
                    code: 404,
                    msg: "Erro ao Enviar a Pesquisa",
                    err: err
                });
            });

    }

    async zap_valido(req, res) {
        const cel = String("55" + req.body.cel + "@c.us");
        const texto = "WhatsApp válido";
        console.log(time(), `Acessou ${texto}`);

        await envio.checkNumberStatus(cel)
            .then((result) => {
                console.log(time(), "WhatsApp OK ", req.body.cel);
                return res.status(200).json({
                    error: "nao",
                    code: result.status,
                    msg: "WhatsApp OK",
                    isBusiness: result.isBusiness,
                    pode_receber_mensagens: result.canReceiveMessage,
                    numero_existe: result.numberExists
                });
            }).catch((erro) => {
                console.log(time(), "WhatsApp INVALIDO");
                return res.status(200).json({
                    error: "sim",
                    code: erro.status,
                    msg: "WhatsApp INVALIDO",
                    isBusiness: erro.isBusiness,
                    pode_receber_mensagens: erro.canReceiveMessage
                });
            });
    }
}

module.exports = new Zap();