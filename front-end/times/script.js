const salvar = document.getElementById('salvar');
const editar = document.getElementById('editar');
const excluir = document.getElementById('excluir');
const timeNome = document.getElementById('time_nome');
const timeAnoFundacao = document.getElementById('time_ano_fundacao');
const timeNomePresidente = document.getElementById('time_nome_presidente');
const timeCor = document.getElementById('time_cor');
const timeLocalizacao = document.getElementById('time_localizacao');
const timeEstadio = document.getElementById('time_estadio');
const timeTecnico = document.getElementById('time_tecnico');
const selecionar_time = document.getElementById('time_selecionado');

//SALVAR DADOS============================================================================
//SALVAR DADOS============================================================================
//SALVAR DADOS============================================================================
async function salvarDados(dados) {
    try {
        const resultado = await fetch('http://localhost:3000/times', {
            method: 'POST',
            body: JSON.stringify(dados),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
    
    if (resultado.ok) {
        alert('Time cadastrado com sucesso!');
        carregarListaTimes(); // atualiza a lista de estadios depois do cadastro
    } else {
        alert('Erro ao cadastrar o time.');
    }
} catch (error) {
    console.error('Erro ao cadastrar o time:', error);
    alert('Erro ao cadastrar o time.');
}

console.log(resultado);
}

salvar.addEventListener('click', () => {
    const time_nome = timeNome.value;
    const time_ano_fundacao = timeAnoFundacao.value;
    const time_nome_presidente = timeNomePresidente.value;
    const time_cor = timeCor.value;
    const time_localizacao = timeLocalizacao.value;
    const time_estadio = timeEstadio.value;
    const time_tecnico = timeTecnico.value;

    const dados = {
        time_nome: time_nome,
        time_ano_fundacao: time_ano_fundacao,
        time_nome_presidente: time_nome_presidente,
        time_cor: time_cor,
        time_localizacao: time_localizacao,
        time_estadio: time_estadio,
        time_tecnico: time_tecnico
    }

    salvarDados(dados);

    timeNome.value = "";
    timeAnoFundacao.value = "";
    timeNomePresidente.value = "";
    timeCor.value = "";
    timeLocalizacao.value = "";
    timeEstadio.value = "";
    timeTecnico.value = ""; 
})
//SALVAR DADOS============================================================================
//SALVAR DADOS============================================================================
//SALVAR DADOS============================================================================

//EDITAR DADOS============================================================================
//EDITAR DADOS============================================================================
//EDITAR DADOS============================================================================

//carregar times (nome)
async function carregarListaTimes() {
    const resultado = await fetch ('http://localhost:3000/times');
    const times = await resultado.json();
    
    console.log("times;", times);

    times.forEach(time => {
        const opcao = document.createElement('option');
        opcao.value = time.id;
        opcao.textContent = time.time_nome;
        selecionar_time.appendChild(opcao);
    });
}

// carregar dados do time selecionado
async function carregarDados(id) {

const resposta = await fetch(`http://localhost:3000/times/${id}`);
const dados = await resposta.json();

console.log('dados recebidos:', dados);

//preenche os campos conforme o time selecionado
timeNome.value = dados.time_nome || '';
timeAnoFundacao.value = dados.time_ano_fundacao || '';
timeNomePresidente.value = dados.time_nome_presidente || '';
timeCor.value = dados.time_cor || '';
timeLocalizacao.value = dados.time_localizacao || '';
timeEstadio.value = dados.time_estadio || '';
timeTecnico.value = dados.time_tecnico || '';
}

time_selecionado.addEventListener('change', () => {
    const timeId = time_selecionado.value;
    if (timeId){
        carregarDados(timeId);
    }
})

//carregarListaTimes();

editar.addEventListener('click', async () => {
    const timeId = selecionar_time.value; // ID do time selecionado
    const time_nome = timeNome.value;
    const time_ano_fundacao = parseInt(timeAnoFundacao.value, 10);
    const time_nome_presidente = timeNomePresidente.value;
    const time_cor = timeCor.value;
    const time_localizacao = timeLocalizacao.value;
    const time_estadio = timeEstadio.value;
    const time_tecnico = timeTecnico.value;

    if (!timeId) {
        alert("Por favor, selecione um time para editar.");
        return;
    }

    const dadosAtualizados = {
        id: timeId, 
        time_nome,
        time_ano_fundacao,
        time_nome_presidente,
        time_cor,
        time_localizacao,
        time_estadio,
        time_tecnico
    };

    console.log("id time" + timeId);

    try {
        const resposta = await fetch(`http://localhost:3000/times/${timeId}`, {
            method: 'PUT', 
            body: JSON.stringify(dadosAtualizados),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        if (resposta.ok) {
            alert('Time atualizado com sucesso!');
            // atualiza a lista de times, se for preciso
            carregarListaTimes();
        } else {
            alert('Erro ao atualizar o time.');
        }
    } catch (error) {
        console.error('Erro ao editar os dados do time:', error);
        alert('Erro ao editar o time.');
    }

});


//EDITAR DADOS============================================================================
//EDITAR DADOS============================================================================
//EDITAR DADOS============================================================================

//APAGAR DADOS============================================================================
//APAGAR DADOS============================================================================
//APAGAR DADOS============================================================================

excluir.addEventListener('click', async () => {
    const timeId = selecionar_time.value;

    if (!timeId) {
        alert("Por favor, selecione um time para excluir.");
        return;
    }

    const confirmacao = confirm("Tem certeza que deseja excluir este time?");
    if (!confirmacao) {
        return;
    }

    try {
        const resposta = await fetch(`http://localhost:3000/times/${timeId}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        if (resposta.ok) {
            alert('Time excluído com sucesso!');
            carregarListaTimes(); // atuaiza a lista de times depois da exclusão
        } else {
            alert('Erro ao excluir o time.');
        }
    } catch (error) {
        console.error('Erro ao excluir o time:', error);
        alert('Erro ao excluir o time.');
    }
})

document.addEventListener('DOMContentLoaded', () => {
    carregarListaTimes();
});

//APAGAR DADOS============================================================================
//APAGAR DADOS============================================================================
//APAGAR DADOS============================================================================
