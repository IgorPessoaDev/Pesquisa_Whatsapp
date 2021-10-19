const venom = require('venom-bot');
venom
    .create()
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro);
    });
function start(client) {
    client.onMessage((message) => {
        if (message.body === 'Oi' && message.isGroupMsg === false) {
            client.sendText(message.from, 'Welcome Venom 🕷').then((result) => {
                console.log('Respondido para: ', message.sender.pushname, " - ", message.sender.formattedName);
            })
                .catch((erro) => {
                    console.error('Erro ao enviar a MSG: ', erro);
                });
        }
    });
}