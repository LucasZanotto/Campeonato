'use strict'

const Route = use('Route')

Route.get('/partidas/atleta/:id', 'PartidaController.partidasDoAtleta'); // Informações sobre quais partidas o atleta participou
Route.get('/partidas/time/:id', 'PartidaController.partidasDoTime'); // Informações sobre quais partidas cada time participou x
Route.get('/torneios/atleta/:id', 'TorneioController.torneiosDoAtleta'); // Informações sobre quais torneios o atleta participou
Route.get('/torneios/time/:id', 'TorneioController.torneiosDoTime'); // Informações sobre quais torneios cada time participou
Route.get('/pontuacao/time/:timeId/torneio/:torneioId', 'PontuacaoController.pontuacaoDoTimeEmTorneio'); // Pontuação de um time em certo torneio
Route.get('/pontuacao/torneio/:id', 'PontuacaoController.pontuacaoTodosTimesEmTorneio'); // Pontuação de todos os times em um torneio
Route.get('/time/:id/atletas', 'TimeController.atletasDoTime'); // Atletas que estão em um determinado time

// Rotas para Time
Route.post('/times', 'TimeController.create');

// Rotas para Atleta
Route.post('/atletas', 'AtletaController.create');

// Rotas para Modalidade
Route.post('/modalidades', 'ModalidadeController.create');

// Rotas para Torneio
Route.post('/torneios', 'TorneioController.criarTorneio');

// Rotas para Partida
Route.post('/partidas', 'PartidaController.criarPartida');


// Rotas para Pontuação
Route.post('/pontuacoes', 'PontuacaoController.criarPontuacao');

Route.put('/times/:timeId', 'TimeController.atualizarTime');

Route.put('/atletas/:atletaId', 'AtletaController.atualizarAtleta');

Route.put('/modalidades/:modalidadeId', 'ModalidadeController.atualizarModalidade');

Route.put('/torneios/:torneioId', 'TorneioController.atualizarTorneio');

Route.put('/partidas/:partidaId', 'PartidaController.atualizarPartida');

Route.put('/pontuacoes/:pontuacaoId', 'PontuacaoController.atualizarPontuacao');

Route.get('/times', 'TimeController.listarTimes');

Route.get('/modalidades', 'ModalidadeController.index');

Route.get('/torneios', 'TorneioController.index');

Route.get('/torneios/:id/partidas', 'TorneioController.partidasDoTorneio');
