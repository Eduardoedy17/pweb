// Cria um array vazio chamado 'linguagens'
let linguagens = Array();

// Adiciona elementos ao array 'linguagens' em posições específicas
linguagens[0] = 'Dart';
linguagens[1] = 'PHP';
linguagens[2] = 'Java';
linguagens[3] = 'Python';
linguagens[4] = 'Perl';
linguagens[5] = 'Ruby on Rails';
linguagens[6] = "C ++";

// Função para exibir a lista de linguagens na div com id 'minhaDiv'
function mostrarListaLinguagens() {
    const container = document.getElementById('minhaDiv'); // Obtém o elemento HTML com id 'minhaDiv'
    container.innerHTML = ''; // Limpa o conteúdo atual da div

    // Percorre o array 'linguagens' e adiciona cada item à div
    for (var i = 0; i < linguagens.length; i++) {
        var tag = '<h5>' + i + ' - ' + linguagens[i] + '</h5>'; // Cria uma tag HTML com o índice e o nome da linguagem
        container.innerHTML += tag; // Adiciona a tag à div
    }
}

// Função para consultar uma linguagem por posição no array
function posicaoLinguagens() {
    var indice = prompt('Qual posição da lista deseja consultar?'); // Solicita ao usuário um índice

    // Verifica se o índice está dentro dos limites do array
    if (indice >= 0 && indice < linguagens.length) {
        alert(linguagens[indice]); // Exibe a linguagem correspondente
    } else {
        alert('Posição Inexistente!'); // Alerta se o índice for inválido
    }
}

// Cria um array vazio chamado 'frutas'
let frutas = Array();

// Adiciona elementos ao array 'frutas'
frutas[0] = 'maça';
frutas[1] = 'banana';
frutas[2] = 'uva';
frutas[3] = 'melancia';
frutas[4] = 'morango';
frutas[5] = 'maracujá';
frutas[6] = "abacaxi";

// Função para exibir a lista de frutas na div com id 'minhaDiv2'
function mostrarListaFrutas() {
    const container = document.getElementById('minhaDiv2'); // Obtém o elemento HTML com id 'minhaDiv2'
    container.innerHTML = ''; // Limpa o conteúdo atual da div

    // Percorre o array 'frutas' e adiciona cada item à div
    for (var i = 0; i < frutas.length; i++) {
        var tag = '<h5>' + i + ' - ' + frutas[i] + '</h5>'; // Cria uma tag HTML com o índice e o nome da fruta
        container.innerHTML += tag; // Adiciona a tag à div
    }
}

// Função para consultar uma fruta por posição no array
function posicaoFrutas() {
    var indice = prompt('Qual posição da lista deseja consultar?'); // Solicita ao usuário um índice

    // Verifica se o índice está dentro dos limites do array
    if (indice >= 0 && indice < frutas.length) {
        alert(frutas[indice]); // Exibe a fruta correspondente
    } else {
        alert('Posição Inexistente!'); // Alerta se o índice for inválido
    }
}

// Cria um array vazio chamado 'pessoas'
let pessoas = Array();

// Função para exibir a lista de pessoas na div com id 'minhaDiv3'
function mostrarListaPessoas() {
    const container = document.getElementById('minhaDiv3'); // Obtém o elemento HTML com id 'minhaDiv3'
    container.innerHTML = ''; // Limpa o conteúdo atual da div

    // Percorre o array 'pessoas' e adiciona cada item à div
    for (var i = 0; i < pessoas.length; i++) {
        var tag = '<h5>' + i + ' - ' + pessoas[i] + '</h5>'; // Cria uma tag HTML com o índice e o nome da pessoa
        container.innerHTML += tag; // Adiciona a tag à div
    }
}

// Função para adicionar um nome ao array 'pessoas'
function adicionarNome() {
    const nome = prompt('Digite um nome:'); // Solicita ao usuário um nome
    const regex = /^[a-zA-Z ]+$/; // Expressão regular para validar apenas letras e espaços

    // Verifica se o nome é válido e não vazio
    if (nome && regex.test(nome)) {
        pessoas.push(nome); // Adiciona o nome ao final do array
        mostrarListaPessoas(); // Atualiza a lista exibida
    } else if (nome !== null) {
        alert('Isso não é um nome!'); // Alerta se o nome for inválido
    }
}

// Função para remover o último nome do array 'pessoas'
function removerNome() {
    pessoas.pop(); // Remove o último elemento do array
    mostrarListaPessoas(); // Atualiza a lista exibida
}