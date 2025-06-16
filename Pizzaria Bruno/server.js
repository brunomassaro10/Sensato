const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'www')));
let pizzas = [];
app.get('/pizzas', (req, res) => res.json(pizzas));
app.post('/pizza', (req, res) => {
    const { pizza, preco, imagem } = req.body;
    if (!pizza || !preco) return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
    pizzas.push({ pizza, preco, imagem });
    res.json({ message: 'Pizza cadastrada com sucesso!' });
});
app.delete('/pizza/:nome', (req, res) => {
    const { nome } = req.params;
    pizzas = pizzas.filter(p => p.pizza !== nome);
    res.json({ message: 'Pizza excluída com sucesso!' });
});
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));