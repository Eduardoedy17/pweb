let linguagens = Array();

linguagens[0] = 'Dart';
linguagens[1] = 'PHP';
linguagens[2] = 'Java';
linguagens[3] = 'Python';
linguagens[4] = 'Perl';
linguagens[5] = 'Ruby on Rails';
linguagens[6] = "C ++";

function mostrarListaLinguagens() {
    const container = document.getElementById('minhaDiv');
    container.innerHTML = '';
    for (var i = 0; i < linguagens.length; i++) {
        var tag = '<h5>' + i + ' - ' + linguagens[i] + '</h5>';
        container.innerHTML += tag;
    }
}

function posicaoLinguagens() {
    var indice = prompt('Qual posição da lista deseja consultar?');
    if (indice >= 0 && indice < linguagens.length) {
        alert(linguagens[indice]);
    } else {
        alert('Posição Inexistente!');
    }
}

let frutas = Array();

frutas[0] = 'maça';
frutas[1] = 'banana';
frutas[2] = 'uva';
frutas[3] = 'melancia';
frutas[4] = 'morango';
frutas[5] = 'maracujá';
frutas[6] = "abacaxi";

function mostrarListaFrutas() {
    const container = document.getElementById('minhaDiv2');
    container.innerHTML = '';
    for (var i = 0; i < frutas.length; i++) {
        var tag = '<h5>' + i + ' - ' + frutas[i] + '</h5>';
        container.innerHTML += tag;
    }
}

function posicaoFrutas() {
    var indice = prompt('Qual posição da lista deseja consultar?');
    if (indice >= 0 && indice < frutas.length) {
        alert(frutas[indice]);
    } else {
        alert('Posição Inexistente!');
    }
}

let pessoas = Array();

function mostrarListaPessoas() {
    const container = document.getElementById('minhaDiv3');
    container.innerHTML = '';
    for (var i = 0; i < pessoas.length; i++) {
        var tag = '<h5>' + i + ' - ' + pessoas[i] + '</h5>';
        container.innerHTML += tag;
    }
}

function adicionarNome() {
    const nome = prompt('Digite um nome:');
    const regex = /^[a-zA-Z ]+$/;

    if (nome && regex.test(nome)) {
        pessoas.push(nome);
        mostrarListaPessoas();
    } else if (nome !== null) {
        alert('Isso não é um nome!');
    }
}

function removerNome() {
    pessoas.pop();
    mostrarListaPessoas();
}