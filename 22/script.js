/**
 * Função para iniciar a contagem de 1 até n.
 */
function iniciarContagem() {
    // Pega o elemento <div> onde o resultado será exibido.
    const divResultado = document.getElementById("resultado");

    // Usa o prompt para pedir ao usuário o número final (n).
    const n_string = prompt("Por favor, digite um número para a contagem:");

    // Converte o texto recebido (string) para um número inteiro.
    const n = parseInt(n_string);

    // Validação: verifica se o valor inserido é um número válido e maior que zero.
    if (isNaN(n) || n <= 0) {
        divResultado.innerHTML = "<p>Por favor, insira um número válido e maior que zero.</p>";
        return; // Encerra a função se o número for inválido.
    }

    // Limpa o conteúdo anterior da div.
    divResultado.innerHTML = "";

    // Cria um laço (loop) para contar de 1 até n.
    for (let i = 1; i <= n; i++) {
        // Adiciona cada número dentro da div.
        // Usamos um <span> para cada número para facilitar a estilização, se desejado.
        divResultado.innerHTML += `<span>${i} </span>`;
    }
}