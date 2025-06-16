document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    document.getElementById('btnNovo').addEventListener('click', mostrarCadastro);
    document.getElementById('btnCancelar').addEventListener('click', mostrarLista);
    document.getElementById('btnSalvar').addEventListener('click', salvarPizza);
    document.getElementById('btnExcluir').addEventListener('click', excluirPizza);
    carregarPizzas();
}
function mostrarCadastro() {
    document.getElementById('applista').style.display = 'none';
    document.getElementById('appcadastro').style.display = 'flex';
}
function mostrarLista() {
    document.getElementById('appcadastro').style.display = 'none';
    document.getElementById('applista').style.display = 'flex';
    carregarPizzas();
}
function carregarPizzas() {
    fetch('http://localhost:3000/pizzas')
        .then(response => response.json())
        .then(data => {
            const listaPizzas = document.getElementById('listaPizzas');
            listaPizzas.innerHTML = '';
            data.forEach((item, idx) => {
                const div = document.createElement('div');
                div.classList.add('linha');
                div.innerHTML = item.pizza;
                div.id = idx;
                div.onclick = () => carregarDadosPizza(idx, item);
                listaPizzas.appendChild(div);
            });
        });
}
function carregarDadosPizza(idx, item) {
    mostrarCadastro();
    document.getElementById('pizza').value = item.pizza;
    document.getElementById('preco').value = item.preco;
    document.getElementById('imagem').style.backgroundImage = `url(${item.imagem})`;
}
function salvarPizza() {
    const pizza = document.getElementById('pizza').value;
    const preco = document.getElementById('preco').value;
    const imagem = document.getElementById('imagem').style.backgroundImage;
    fetch('http://localhost:3000/pizza', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pizza, preco, imagem })
    }).then(() => mostrarLista());
}
function excluirPizza() {
    const pizza = document.getElementById('pizza').value;
    fetch(`http://localhost:3000/pizza/${pizza}`, { method: 'DELETE' })
        .then(() => mostrarLista());
}