// Aguarda o carregamento completo do DOM para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos do HTML que serão manipulados
    const cepForm = document.getElementById('cepForm');
    const cepInput = document.getElementById('cep');
    const searchButton = document.getElementById('search-button');
    const spinner = searchButton.querySelector('.spinner-border');
    const cepError = document.getElementById('cep-error');
    const addressResultDiv = document.getElementById('address-result');
    
    // Elementos do formulário de resultado
    const logradouroInput = document.getElementById('logradouro');
    const bairroInput = document.getElementById('bairro');
    const cidadeInput = document.getElementById('cidade');
    const ufSpan = document.getElementById('uf');
    const ibgeInput = document.getElementById('ibge'); // <-- SELECIONA O NOVO CAMPO

    // Adiciona um evento ao formulário para interceptar o envio
    cepForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página
        handleSearch();
    });

    // Função assíncrona para lidar com a busca do CEP
    const handleSearch = async () => {
        const cep = cepInput.value.replace(/\D/g, ''); // Remove tudo que não for número

        // Validação do CEP
        if (cep.length !== 8) {
            showError('CEP inválido. Deve conter 8 números.');
            return;
        }

        // Exibe o feedback de carregamento
        setLoading(true);

        try {
            // Chama a API ViaCEP com o CEP informado
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            // Verifica se a API retornou um erro (CEP não encontrado)
            if (data.erro) {
                showError('CEP não encontrado.');
            } else {
                // Se deu certo, preenche os campos com os dados
                displayAddress(data);
            }
        } catch (error) {
            // Trata erros de rede ou falhas na comunicação com a API
            showError('Não foi possível realizar a busca. Verifique sua conexão.');
            console.error('Erro na busca:', error);
        } finally {
            // Garante que o feedback de carregamento seja removido ao final
            setLoading(false);
        }
    };

    // Função para exibir os dados do endereço nos campos
    const displayAddress = (data) => {
        hideError();
        logradouroInput.value = data.logradouro || '';
        bairroInput.value = data.bairro || '';
        cidadeInput.value = data.localidade || '';
        ufSpan.textContent = data.uf || '';
        ibgeInput.value = data.ibge || ''; // <-- POPULA O NOVO CAMPO IBGE
        addressResultDiv.style.display = 'block'; // Mostra a área de resultados
    };

    // Função para exibir mensagens de erro
    const showError = (message) => {
        addressResultDiv.style.display = 'none'; // Esconde resultados antigos
        cepError.textContent = message;
        cepError.style.display = 'block';
    };

    // Função para esconder a mensagem de erro
    const hideError = () => {
        cepError.style.display = 'none';
    };

    // Função para controlar a exibição do spinner de carregamento no botão
    const setLoading = (isLoading) => {
        if (isLoading) {
            spinner.style.display = 'inline-block';
            searchButton.disabled = true; // Desabilita o botão durante a busca
        } else {
            spinner.style.display = 'none';
            searchButton.disabled = false; // Habilita o botão novamente
        }
    };
});