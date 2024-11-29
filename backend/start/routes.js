const Route = use('Route')

Route.get('/atletas', 'AtletaController.index')
Route.post('/atletas', 'AtletaController.store')

Route.get('/times', 'TimeController.index')
Route.post('/times', 'TimeController.store')

Route.get('/modalidades', 'ModalidadeController.index')
Route.post('/modalidades', 'ModalidadeController.store')

Route.get('/torneios', 'TorneioController.index')
Route.post('/torneios', 'TorneioController.store')

Route.get('/partidas', 'PartidaController.index')
Route.post('/partidas', 'PartidaController.store')

Route.get('/pontuacoes', 'PontuacaoController.index')
Route.post('/pontuacoes', 'PontuacaoController.store')

Route.get('/fases', 'FaseController.index')
Route.post('/fases', 'FaseController.store')

Route.get('torneios/:torneio_id/pontuacoes/atletas', 'PontuacaoController.pontosCorridosAtleta');
Route.get('torneios/:torneio_id/pontuacoes/times', 'PontuacaoController.pontosCorridosTime');

Route.get('/torneios/:torneio_id/:fase', 'TorneioController.faseDoTorneio');
Route.post('torneios/tipo', 'TorneioController.getTorneiosPorTipo');
Route.get('torneios/:id', 'TorneioController.show');

Route.get('atleta/:torneio_id/partidas', 'PartidaController.indexAtleta');
Route.get('time/:torneio_id/partidas', 'PartidaController.indexTime');

Route.get('modalidades/:torneio_id', 'PartidaController.indexDaModalidade');
Route.get('pontuacoes/:id/pontuacao', 'PontuacaoController.pontuacao');

Route.put('/partidas/:id/pontos', 'PartidaController.atualizarPontos');
Route.put('/partidas/:id/encerrar', 'PartidaController.encerrarPartida');


Route.post('/torneios/:torneio_id/grupos', 'GrupoController.adicionarParticipantes');
Route.get('/torneios/:torneio_id/grupos/pegar', 'GrupoController.listarPorTorneio');

Route.get('/times/:time_id/historico', 'PartidaController.historicoPorTime');
