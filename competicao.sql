
-- Tabela 'time'
CREATE TABLE time (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
);

-- Tabela 'atleta'
CREATE TABLE atleta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    time_id INT,  
    FOREIGN KEY (time_id) REFERENCES time(id) ON DELETE SET NULL
);

-- Tabela 'modalidade'
CREATE TABLE modalidade (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    tipo_modalidade ENUM('individual', 'equipe') NOT NULL
);

-- Tabela 'torneio'
CREATE TABLE torneio (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    modalidade_id INT NOT NULL,  
    tipo_torneio ENUM('pontos corridos', 'eliminatório') NOT NULL,
    fase_atual ENUM('grupos', 'oitavas', 'quartas', 'semi', 'final') NULL,  
    em_andamento TINYINT(1) DEFAULT 1, 
    FOREIGN KEY (modalidade_id) REFERENCES modalidade(id)
);

-- Tabela 'partida'
CREATE TABLE partida (
    id INT PRIMARY KEY AUTO_INCREMENT,
    torneio_id INT NOT NULL, 
    oponente1_id INT NOT NULL, 
    oponente2_id INT NOT NULL,  
    oponente1_pontos INT DEFAULT 0,
    oponente2_pontos INT DEFAULT 0,
    em_andamento TINYINT(1) DEFAULT 1, 
    FOREIGN KEY (torneio_id) REFERENCES torneio(id)
);

-- Tabela 'pontuacao' (para registrar a pontuação acumulada em torneios de pontos corridos)
CREATE TABLE pontuacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    torneio_id INT NOT NULL, 
    entidade_id INT NOT NULL,
    pontos INT DEFAULT 0,  
    FOREIGN KEY (torneio_id) REFERENCES torneio(id)
);

-- Tabela 'fase' (para fases eliminatórias do torneio)
CREATE TABLE fase (
    id INT PRIMARY KEY AUTO_INCREMENT,
    torneio_id INT NOT NULL,
    fase ENUM('grupos', 'oitavas', 'quartas', 'semi', 'final') NOT NULL,
    oponente1_id INT NOT NULL, 
    oponente2_id INT NOT NULL,
    vencedor_id INT, 
    em_andamento TINYINT(1) DEFAULT 1,
    FOREIGN KEY (torneio_id) REFERENCES torneio(id)
);

CREATE INDEX idx_atleta_time ON atleta(time_id);

CREATE INDEX idx_pontuacao_torneio_entidade ON pontuacao(torneio_id, entidade_id);

CREATE INDEX idx_partida_torneio ON partida(torneio_id);

CREATE INDEX idx_fase_torneio_fase ON fase(torneio_id, fase);

