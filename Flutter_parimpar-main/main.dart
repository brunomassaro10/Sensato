import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() => runApp(ParOuImparApp());

class ParOuImparApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Par ou Ímpar',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: TelaCadastro(),
    );
  }
}

class TelaCadastro extends StatefulWidget {
  @override
  _TelaCadastroState createState() => _TelaCadastroState();
}

class _TelaCadastroState extends State<TelaCadastro> {
  final TextEditingController _nomeController = TextEditingController();

  void _registrarJogador() async {
    final nome = _nomeController.text.trim();
    if (nome.isEmpty) return;

    final resposta = await http.post(
      Uri.parse('https://par-impar.glitch.me/novo'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'username': nome}),
    );

    if (resposta.statusCode == 200) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (_) => TelaAposta(nomeJogador: nome),
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Erro ao registrar jogador")));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Cadastro')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _nomeController,
              decoration: InputDecoration(labelText: 'Digite seu nome'),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _registrarJogador,
              child: Text("Entrar no Jogo"),
            ),
          ],
        ),
      ),
    );
  }
}

class TelaAposta extends StatefulWidget {
  final String nomeJogador;
  TelaAposta({required this.nomeJogador});

  @override
  _TelaApostaState createState() => _TelaApostaState();
}

class _TelaApostaState extends State<TelaAposta> {
  int _valorAposta = 100;
  int _numeroEscolhido = 1;
  int _tipoEscolha = 2;

  void _realizarAposta() async {
    final resposta = await http.post(
      Uri.parse('https://par-impar.glitch.me/aposta'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'username': widget.nomeJogador,
        'valor': _valorAposta,
        'parimpar': _tipoEscolha,
        'numero': _numeroEscolhido,
      }),
    );

    if (resposta.statusCode == 200) {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => TelaJogadores(nomeJogador: widget.nomeJogador),
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Erro ao realizar aposta")));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Aposta')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            DropdownButton<int>(
              value: _numeroEscolhido,
              onChanged: (valor) => setState(() => _numeroEscolhido = valor!),
              items: [1, 2, 3, 4, 5]
                  .map((n) => DropdownMenuItem(value: n, child: Text('Número: $n')))
                  .toList(),
            ),
            DropdownButton<int>(
              value: _tipoEscolha,
              onChanged: (valor) => setState(() => _tipoEscolha = valor!),
              items: [
                DropdownMenuItem(value: 2, child: Text('Par')),
                DropdownMenuItem(value: 1, child: Text('Ímpar')),
              ],
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _realizarAposta,
              child: Text('Confirmar Aposta'),
            ),
          ],
        ),
      ),
    );
  }
}

