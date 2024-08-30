//function salvar() {
//    const estadio_nome = document.getElementById("estadio_nome").value = '';
//    const estadio_time_mandante = document.getElementById("estadio_time_mandante").value = '';
//    const estadio_inauguracao = document.getElementById("estadio_inauguracao").value = '';
//    const estadio_pais = document.getElementById("estadio_pais").value = '';
//    const estadio_estado = document.getElementById("estadio_estado").value = '';
//    const estadio_cidade = document.getElementById("estadio_cidade").value = '';
//    const estadio_capacidade = document.getElementById("estadio_capacidade").value = '';
//    const estadio_grama = document.getElementById("estadio_grama").value = '';
//}

const salvar = document.getElementById('salvar');
const editar = document.getElementById('editar');
const excluir = document.getElementById('excluir');
const estadioNome = document.getElementById('estadio_nome');
const estadioTimeMandante = document.getElementById('estadio_time_mandante');
const estadioInauguracao = document.getElementById('estadio_inauguracao');
const estadioPais = document.getElementById('estadio_pais');
const estadioEstado = document.getElementById('estadio_estado');
const estadioCidade = document.getElementById('estadio_cidade');
const estadioCapacidade = document.getElementById('estadio_capacidade');
const estadioGrama = document.getElementById('estadio_grama');
const selecionar_estadio = document.getElementById('estadio_selecionado');

//SALVAR DADOS============================================================================
//SALVAR DADOS============================================================================
//SALVAR DADOS============================================================================
async function salvarDados(dados) {
    //const resultado = await fetch('http://localhost:3000/estadios', {
    //    method: 'POST',
    //    body: JSON.stringify(dados),
    //    headers: { "Content-type": "application/json; charset=UTF-8" }
    //    
    //});

    try {
        const resultado = await fetch('http://localhost:3000/estadios', {
            method: 'POST',
            body: JSON.stringify(dados),
            headers: { "Content-type": "application/json; charset=UTF-8" }

        });

        if (resultado.ok) {
            alert('Estádio cadastrado com sucesso!');
            carregarListaEstadios(); // atualiza a lista de estadios depois do cadastro
        } else {
            alert('Erro ao cadastrar o estádio.');
        }
    } catch (error) {
        console.error('Erro ao cadastrar o estádio:', error);
        alert('Erro ao cadastrar o estádio.');
    }
    console.log(resultado);

}

salvar.addEventListener('click', () => {
    const estadio_nome = estadioNome.value;
    const estadio_time_mandante = estadioTimeMandante.value;
    const estadio_inauguracao = estadioInauguracao.value;
    const estadio_pais = estadioPais.value;
    const estadio_estado = estadioEstado.value;
    const estadio_cidade = estadioCidade.value;
    const estadio_capacidade = estadioCapacidade.value;
    const estadio_grama = estadioGrama.value;
    const erro_mensagem = document.getElementById('erro_msg');


    if (estadio_grama === "") {
        erro_mensagem.style.display = "inline";
        return; //não permitir o envio dos dados
    } else {
        erro_mensagem.style.display = "none";
    }

    const dados = {
        estadio_nome: estadio_nome,
        estadio_time_mandante: estadio_time_mandante,
        estadio_inauguracao: estadio_inauguracao,
        estadio_pais: estadio_pais,
        estadio_estado: estadio_estado,
        estadio_cidade: estadio_cidade,
        estadio_capacidade: estadio_capacidade,
        estadio_grama: estadio_grama
    }

    salvarDados(dados);

    estadioNome.value = "";
    estadioTimeMandante.value = "";
    estadioInauguracao.value = "";
    estadioPais.value = "";
    estadioEstado.value = "";
    estadioCidade.value = "";
    estadioCapacidade.value = "";
    estadioGrama.value = "";
})
//SALVAR DADOS============================================================================
//SALVAR DADOS============================================================================
//SALVAR DADOS============================================================================

//EDITAR DADOS============================================================================
//EDITAR DADOS============================================================================
//EDITAR DADOS============================================================================

// carregar estadios (nomes)
async function carregarListaEstadios() {
    const resultado = await fetch('http://localhost:3000/estadios');
    const estadios = await resultado.json();

    console.log("estadios:", estadios);

    estadios.forEach(estadio => {
        const opcao = document.createElement('option');
        opcao.value = estadio.id;
        opcao.textContent = estadio.estadio_nome;
        selecionar_estadio.appendChild(opcao);
    });
}

// carregar dados estadio selecionado
async function carregarDados(id) {

    const resposta = await fetch(`http://localhost:3000/estadios/${id}`);
    const dados = await resposta.json();

    console.log('dados recebidos:', dados);

    //preenche os campos conforme o estadio selecionado
    estadioNome.value = dados.estadio_nome || '';
    estadioTimeMandante.value = dados.estadio_time_mandante || '';
    estadioInauguracao.value = parseInt(dados.estadio_inauguracao, 10) || '';
    estadioPais.value = dados.estadio_pais || '';
    estadioEstado.value = dados.estadio_estado || '';
    estadioCidade.value = dados.estadio_cidade || '';
    estadioCapacidade.value = parseInt(dados.estadio_capacidade, 10) || '';
    estadioGrama.value = dados.estadio_grama || '';
}

estadio_selecionado.addEventListener('change', () => {
    const estadioId = estadio_selecionado.value;
    if (estadioId) {
        carregarDados(estadioId);
    }
});

//carregarListaEstadios();

editar.addEventListener('click', async () => {
    const estadioId = selecionar_estadio.value; // ID do estádio selecionado
    const estadio_nome = estadioNome.value;
    const estadio_time_mandante = estadioTimeMandante.value;
    const estadio_inauguracao = parseInt(estadioInauguracao.value, 10);
    const estadio_pais = estadioPais.value;
    const estadio_estado = estadioEstado.value;
    const estadio_cidade = estadioCidade.value;
    const estadio_capacidade = parseInt(estadioCapacidade.value, 10);
    const estadio_grama = estadioGrama.value;

    if (!estadioId) {
        alert("Por favor, selecione um estádio para editar.");
        return;
    }

    /* const dadosAtualizados = {
         estadio_nome: estadio_nome,
         estadio_time_mandante: estadio_time_mandante,
         estadio_inauguracao: estadio_inauguracao,
         estadio_pais: estadio_pais,
         estadio_estado: estadio_estado,
         estadio_cidade: estadio_cidade,
         estadio_capacidade: estadio_capacidade,
         estadio_grama: estadio_grama
     };*/

    const dadosAtualizados = {
        id: estadioId,
        estadio_nome,
        estadio_time_mandante,
        estadio_inauguracao,
        estadio_pais,
        estadio_estado,
        estadio_cidade,
        estadio_capacidade,
        estadio_grama
    };

    console.log("id estadio" + estadioId);

    try {
        const resposta = await fetch(`http://localhost:3000/estadios/${estadioId}`, {
            method: 'PUT',
            body: JSON.stringify(dadosAtualizados),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        if (resposta.ok) {
            alert('Estádio atualizado com sucesso!');
            // atualiza a lista de estadios, se for preciso
            carregarListaEstadios();
        } else {
            alert('Erro ao atualizar o estádio.');
        }
    } catch (error) {
        console.error('Erro ao editar os dados do estádio:', error);
        alert('Erro ao editar o estádio.');
    }

});
//EDITAR DADOS============================================================================
//EDITAR DADOS============================================================================
//EDITAR DADOS============================================================================

//APAGAR DADOS============================================================================
//APAGAR DADOS============================================================================
//APAGAR DADOS============================================================================
excluir.addEventListener('click', async () => {
    const estadioId = selecionar_estadio.value;

    if (!estadioId) {
        alert("Por favor, selecione um estádio para excluir.");
        return;
    }

    const confirmacao = confirm("Tem certeza que deseja excluir este estádio?");
    if (!confirmacao) {
        return;
    }

    try {
        const resposta = await fetch(`http://localhost:3000/estadios/${estadioId}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        if (resposta.ok) {
            alert('Estádio excluído com sucesso!');
            carregarListaEstadios(); // atuaiza a lista de estadios depois da exclusão
        } else {
            alert('Erro ao excluir o estádio.');
        }
    } catch (error) {
        console.error('Erro ao excluir o estádio:', error);
        alert('Erro ao excluir o estádio.');
    }
})

//====================================================================================================================================================

// funcao pra carregar a lista de estadios
async function carregarListaEstadios() {
    try {
        selecionar_estadio.innerHTML = '<option value="" disabled selected>Selecione um estádio</option>'; // resetar a linha antes de carregar
        const resultado = await fetch('http://localhost:3000/estadios');
        const estadios = await resultado.json();

        estadios.forEach(estadio => {
            const opcao = document.createElement('option');
            opcao.value = estadio.id;
            opcao.textContent = estadio.estadio_nome;
            selecionar_estadio.appendChild(opcao);
        });
    } catch (error) {
        console.error('Erro ao carregar a lista de estádios:', error);
    }
}

// carrega a lista de estadios quando recarrega a pagina 
document.addEventListener('DOMContentLoaded', () => {
    carregarListaEstadios();
});//

//APAGAR DADOS============================================================================
//APAGAR DADOS============================================================================
//APAGAR DADOS============================================================================