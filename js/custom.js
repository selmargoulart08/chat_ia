// Receber o SELECTOR do formulário
const formPerguntaChat = document.getElementById('form-pergunta-chat');

// Chave da API do OPENAI
const OPENAI_API_KEY = "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";

// Verificar se tem a chave
if(OPENAI_API_KEY === ""){
    document.getElementById('pergunta').innerHTML = "<span style='color: #f00;'>Necessário colocar a chave na API no arquivo custom.js</span>";
}

// Acessa o IF quando tem o SELETOR na página HTML
if (formPerguntaChat) {

    // Aguardar o usuário clicar no botão Enviar
    formPerguntaChat.addEventListener("submit", async (e) => {

        // Bloquear o recarregamento da página
        e.preventDefault();

        // Substituir o texto do botão para "Pesquisando..."
        document.getElementById('btn-pergunta-chat').value = "Pesquisando...";

        // Receber o valor do campo pergunta
        let pergunta = document.getElementById('campo-pergunta').value;
        //console.log(pergunta);

        // Enviar o texto da pergunta para a página HTML
        document.getElementById('pergunta').innerHTML = pergunta;
        
        // Limpar a resposta
        document.getElementById('resposta').innerHTML = "<span></span>";

        // Requisição para chatgpt
        await fetch("https://api.openai.com/v1/completions", {

            // Método para enviar os dados
            method: "POST",

            // Dados ennviados no cabeçalho da requisição
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + OPENAI_API_KEY,
            },

            // Enviar os dados no corpo da requisição
            body: JSON.stringify({
                model: "text-davinci-003", //Modelo
                prompt: pergunta, // Texto da pergunta
                max_tokens: 2048, // Tamanho da resposta
                temperature: 0.5 // Criatividade na resposta
            }),
        })
            // Acessa o then quando obtiver resposta
            .then((resposta) => resposta.json())
            .then((dados) => {
                //console.log(dados);
                //console.log(dados.choices[0].text);

                // Enviar o texto da resposta para a página HTML
                document.getElementById('resposta').innerHTML = dados.choices[0].text;
            })
            // Retorna catch quando gerar erro
            .catch(() => {
                // Enviar o texto da resposta para a página HTML
                document.getElementById('resposta').innerHTML = "Sem resposta";
            });

        // Substituir o texto do botão para "Enviar"
        document.getElementById('btn-pergunta-chat').value = "Enviar";
    });
}
