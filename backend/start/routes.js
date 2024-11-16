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
