-- Tabela Time
CREATE TABLE Time (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    eliminado TINYINT(1) DEFAULT 0
);

-- Tabela Atleta
CREATE TABLE Atleta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    time_id INT,
    eliminado TINYINT(1) DEFAULT 0,
    FOREIGN KEY (time_id) REFERENCES Time(id)
);

-- Tabela Modalidade
CREATE TABLE Modalidade (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    tipo ENUM('individual', 'equipe') NOT NULL
);

-- Tabela Torneio
CREATE TABLE Torneio (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    modalidade_id INT,
    tipo ENUM('pontos_corridos', 'classificatorios') NOT NULL,
    competidor_id INT,
    em_andamento ENUM('0', '1') DEFAULT '1',
    FOREIGN KEY (modalidade_id) REFERENCES Modalidade(id)
);

-- Tabela Partida
CREATE TABLE Partida (
    id INT PRIMARY KEY AUTO_INCREMENT,
    torneio_id INT,
    competidor1_id INT,
    competidor2_id INT,
    competidor1_pontos_id INT,
    competidor2_pontos_id INT,
    fase ENUM('Pontos_Corridos', 'Grupos', 'Oitavas', 'Quartas', 'Semi', 'Final') DEFAULT 'Pontos_Corridos',
    resultado VARCHAR(50),
    em_andamento ENUM('0', '1') DEFAULT '1',
    FOREIGN KEY (torneio_id) REFERENCES Torneio(id),
    FOREIGN KEY (competidor1_id) REFERENCES Time(id),
    FOREIGN KEY (competidor2_id) REFERENCES Time(id),
    FOREIGN KEY (competidor1_pontos_id) REFERENCES Time(id),
    FOREIGN KEY (competidor2_pontos_id) REFERENCES Time(id)
);

-- Tabela Pontuação
CREATE TABLE Pontuacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    competidor_id INT,
    partida_id INT,
    tipo ENUM('vitoria', 'empate', 'derrota') NOT NULL,
    FOREIGN KEY (competidor_id) REFERENCES Time(id),
    FOREIGN KEY (partida_id) REFERENCES Partida(id)
);

