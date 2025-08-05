'use strict'; // Ativa o modo estrito do JavaScript, que ajuda a evitar erros comuns.

// Adiciona um ouvinte de eventos que espera o DOM (a estrutura da página) ser completamente carregado antes de executar o código.
document.addEventListener('DOMContentLoaded', () => {

    // --- DADOS SIMULADOS (Substitua por uma chamada de API real) ---
    // 'let' cria uma variável que pode ser reatribuída. Aqui, criamos um array de objetos para simular dados de produtos.
    let products = [
        { id: 1, description: 'Pizza', status: 'Ativo' },
        { id: 2, description: 'Refrigerante', status: 'Ativo' },
        { id: 3, description: 'Cajuína', status: 'Inativo' },
        { id: 4, description: 'Borda', status: 'Ativo' },
        { id: 5, description: 'Suco', status: 'Ativo' }
    ];

    // --- ELEMENTOS DO DOM ---
    // 'const' cria uma variável de valor constante. Aqui, armazenamos referências a elementos HTML para fácil acesso.
    const tableBody = document.getElementById('product-table-body'); // O corpo (tbody) da tabela de produtos.
    const searchForm = document.getElementById('search-form'); // O formulário de busca.
    const searchInput = document.getElementById('input-descricao'); // O campo de input da busca.
    const productModal = new bootstrap.Modal(document.getElementById('product-modal')); // Instância do modal do Bootstrap para adicionar/editar produtos.
    const productForm = document.getElementById('product-form'); // O formulário dentro do modal de produto.
    const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirm-delete-modal')); // Instância do modal para confirmar a exclusão.
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn'); // O botão de confirmação dentro do modal de exclusão.
    
    // Variável para armazenar o ID do produto que será excluído. Inicializada como nula.
    let productIdToDelete = null;

    // --- FUNÇÕES ---

    /**
     * Renderiza a tabela de produtos com base nos dados fornecidos e inicializa os popovers.
     * @param {Array} data - O array de produtos a ser exibido.
     */
    const renderTable = (data) => {
        // Limpa todo o conteúdo HTML do corpo da tabela para evitar duplicatas.
        tableBody.innerHTML = ''; 

        // Verifica se não há dados para exibir.
        if (data.length === 0) {
            // Se não houver, insere uma linha com uma mensagem informativa.
            tableBody.innerHTML = '<tr><td colspan="4" class="text-center">Nenhum produto encontrado.</td></tr>';
            return; // Encerra a função.
        }

        // Itera sobre cada 'product' no array 'data'.
        data.forEach(product => {
            // Cria um "badge" (selo) de status com cor diferente para 'Ativo' ou 'Inativo'.
            const statusBadge = product.status === 'Ativo' 
                ? '<span class="badge bg-success">Ativo</span>' 
                : '<span class="badge bg-danger">Inativo</span>';

            // Cria o HTML para uma nova linha (<tr>) da tabela usando atributos de popover em vez de 'title'.
            const row = `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.description}</td>
                    <td>${statusBadge}</td>
                    <td class="text-center table-actions">
                        <button type="button" class="btn btn-outline-info btn-sm" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="top" data-bs-content="Ver Detalhes" data-id="${product.id}">
                            <i class="bi bi-eye"></i>
                        </button>
                        <button type="button" class="btn btn-outline-warning btn-sm btn-edit" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="top" data-bs-content="Editar" data-id="${product.id}">
                           <i class="bi bi-pencil-square"></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm btn-delete" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="top" data-bs-content="Remover" data-id="${product.id}">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </td>
                </tr>
            `;
            // Insere a nova linha no final do corpo da tabela.
            tableBody.insertAdjacentHTML('beforeend', row);
        });

        // --- INICIALIZAÇÃO DOS POPOVERS ---
        // É necessário inicializar os popovers do Bootstrap toda vez que a tabela é renderizada.
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
          return new bootstrap.Popover(popoverTriggerEl);
        });
    };

    /**
     * Manipula a submissão do formulário de busca.
     */
    const handleSearch = (event) => {
        event.preventDefault(); // Impede o recarregamento padrão da página ao submeter o formulário.
        const searchTerm = searchInput.value.toLowerCase().trim(); // Pega o valor da busca, converte para minúsculas e remove espaços em branco.
        
        // Se o termo de busca estiver vazio, renderiza a tabela com todos os produtos.
        if (!searchTerm) {
            renderTable(products);
            return;
        }

        // Filtra o array 'products', mantendo apenas os que incluem o termo de busca na descrição.
        const filteredProducts = products.filter(p => 
            p.description.toLowerCase().includes(searchTerm)
        );
        // Renderiza a tabela com os produtos filtrados.
        renderTable(filteredProducts);
    };

    /**
     * Manipula a submissão do formulário de produto (adicionar/editar).
     */
    const handleProductFormSubmit = (event) => {
        event.preventDefault(); // Impede o recarregamento da página.
        // Cria um novo objeto de produto com os dados do formulário.
        const newProduct = {
            // Gera um novo ID simples (o maior ID existente + 1).
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1, 
            description: document.getElementById('product-name').value,
            status: document.getElementById('product-status').value,
        };
        
        products.push(newProduct); // Adiciona o novo produto ao array (simulando um banco de dados).
        renderTable(products); // Re-renderiza a tabela para mostrar o novo produto.
        productForm.reset(); // Limpa os campos do formulário.
        productModal.hide(); // Esconde o modal.
    };

    /**
     * Manipula cliques na tabela para ações de editar ou remover.
     */
    const handleTableActions = (event) => {
        const target = event.target.closest('button'); // Encontra o botão mais próximo que foi clicado.
        if (!target) return; // Se o clique não foi em um botão, encerra a função.

        const productId = Number(target.dataset.id); // Pega o ID do produto do atributo 'data-id' do botão.

        // Se o botão clicado tiver a classe 'btn-delete'.
        if (target.classList.contains('btn-delete')) {
            productIdToDelete = productId; // Armazena o ID para exclusão.
            confirmDeleteModal.show(); // Mostra o modal de confirmação.
        }

        // Se o botão clicado tiver a classe 'btn-edit'.
        if (target.classList.contains('btn-edit')) {
            // Lógica de edição (aqui apenas exibe um alerta como exemplo).
            alert(`Funcionalidade Editar produto: ${productId}`);
        }
    };
    
    /**
     * Confirma e executa a remoção do produto.
     */
    const executeDelete = () => {
        if (productIdToDelete === null) return; // Garante que há um ID para deletar.

        // Filtra o array, criando um novo array sem o produto com o ID a ser deletado.
        products = products.filter(p => p.id !== productIdToDelete);
        renderTable(products); // Re-renderiza a tabela atualizada.
        confirmDeleteModal.hide(); // Esconde o modal de confirmação.
        productIdToDelete = null; // Reseta a variável para o estado inicial.
    };


    // --- EVENT LISTENERS (Ouvintes de Eventos) ---
    // Adiciona um ouvinte para o evento 'submit' do formulário de busca.
    searchForm.addEventListener('submit', handleSearch);
    // Adiciona um ouvinte para o evento 'submit' do formulário de produto.
    productForm.addEventListener('submit', handleProductFormSubmit);
    // Adiciona um ouvinte de 'click' no corpo da tabela para gerenciar as ações (delete/edit).
    tableBody.addEventListener('click', handleTableActions);
    // Adiciona um ouvinte de 'click' no botão de confirmação de exclusão.
    confirmDeleteBtn.addEventListener('click', executeDelete);
    
    // Adiciona um ouvinte para o evento 'reset' (acionado pelo botão "Limpar").
    searchForm.addEventListener('reset', () => {
        // Usa setTimeout para garantir que o campo seja limpo antes de re-renderizar a tabela.
        setTimeout(() => renderTable(products), 0);
    });

    // --- INICIALIZAÇÃO ---
    renderTable(products); // Chama a função para renderizar a tabela com os dados iniciais assim que o script é executado.

});