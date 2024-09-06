-- Modificações:
	-- Mudei o tipo do atributo controlador, de personagem, para INTEGER
	-- Declarei que controlador também é uma FK
        -- Atualizei a PK de combate

CREATE TABLE Regiao (
    id SERIAL PRIMARY KEY,
    Nome VARCHAR(255)
);

CREATE TABLE Classe (
    Nome VARCHAR(255) PRIMARY KEY,
    Recurso VARCHAR(255)
);

CREATE TABLE Habilidades (
    Nome VARCHAR(255) PRIMARY KEY,
    Custo INTEGER,
    Dano INTEGER
);

CREATE TABLE Efeitos_habilidades (
    efeito VARCHAR(255) PRIMARY KEY,
    Nome_habilidade VARCHAR(255),
    FOREIGN KEY (Nome_habilidade) REFERENCES Habilidades(Nome)
);

CREATE TABLE Personagem (
    id SERIAL PRIMARY KEY,
    Nome VARCHAR(255),
    Nivel INTEGER,
    Controlador INTEGER,
    Nome_classe VARCHAR(255),
    FOREIGN KEY (Nome_classe) REFERENCES Classe(Nome),
    FOREIGN KEY (Controlador) REFERENCES Jogador(Id)
);

CREATE TABLE Personagem_habilidades (
    id_personagem INTEGER,
    Nome_habilidade VARCHAR(255),
    PRIMARY KEY (id_personagem, Nome_habilidade),
    FOREIGN KEY (id_personagem) REFERENCES Personagem(id),
    FOREIGN KEY (Nome_habilidade) REFERENCES Habilidades(Nome)
);

CREATE TABLE Inimigo (
    id SERIAL PRIMARY KEY,
    Nome VARCHAR(255),
    Nivel INTEGER
);

CREATE TABLE Inimigo_habilidades (
    id_inimigo INTEGER,
    Nome_habilidade VARCHAR(255),
    PRIMARY KEY (id_inimigo, Nome_habilidade),
    FOREIGN KEY (id_inimigo) REFERENCES Inimigo(id),
    FOREIGN KEY (Nome_habilidade) REFERENCES Habilidades(Nome)
);

CREATE TABLE Combate (
    Hora TIMESTAMP,
    id_regiao INTEGER,
    id_inimigo INTEGER,
    id_personagem INTEGER,
    PRIMARY KEY (Hora, id_regiao, id_inimigo, id_personagem)
    FOREIGN KEY (id_regiao) REFERENCES Regiao(id),
    FOREIGN KEY (id_inimigo) REFERENCES Inimigo(id),
    FOREIGN KEY (id_personagem) REFERENCES Personagem(id)
);

CREATE TABLE NPC (
    id SERIAL PRIMARY KEY,
    Nome VARCHAR(255),
    Tipo VARCHAR(255)
);

CREATE TABLE Item (
    Nome VARCHAR(255) PRIMARY KEY,
    Preço DECIMAL
);

CREATE TABLE Efeitos_itens (
    efeito VARCHAR(255),
    Nome_item VARCHAR(255),
    PRIMARY KEY (efeito, Nome_item),
    FOREIGN KEY (Nome_item) REFERENCES Item(Nome)
);

CREATE TABLE Arma (
    Nome VARCHAR(255) PRIMARY KEY,
    Ataque INTEGER,
    Tipo VARCHAR(255),
    FOREIGN KEY (Nome) REFERENCES Item(Nome)
);

CREATE TABLE Armadura (
    Nome VARCHAR(255) PRIMARY KEY,
    Defesa INTEGER,
    Tipo VARCHAR(255),
    FOREIGN KEY (Nome) REFERENCES Item(Nome)
);

CREATE TABLE Personagens_itens (
    id_personagem INTEGER,
    Nome_item VARCHAR(255),
    Quantidade INTEGER,
    PRIMARY KEY (id_personagem, Nome_item),
    FOREIGN KEY (id_personagem) REFERENCES Personagem(id),
    FOREIGN KEY (Nome_item) REFERENCES Item(Nome)
);

CREATE TABLE Missoes (
    Nome VARCHAR(255) PRIMARY KEY,
    Objetivo VARCHAR(255),
    Descricao TEXT,
    id_fornecedor INTEGER,
    FOREIGN KEY (id_fornecedor) REFERENCES NPC(id)
);

CREATE TABLE Participa_missoes (
    id_personagem INTEGER,
    Nome_missao VARCHAR(255),
    PRIMARY KEY (id_personagem, Nome_missao),
    FOREIGN KEY (id_personagem) REFERENCES Personagem(id),
    FOREIGN KEY (Nome_missao) REFERENCES Missoes(Nome)
);

CREATE TABLE Recompensa (
    Nome_missao VARCHAR(255),
    Nome_item VARCHAR(255),
    Quantidade INTEGER,
    PRIMARY KEY (Nome_missao, Nome_item),
    FOREIGN KEY (Nome_missao) REFERENCES Missoes(Nome),
    FOREIGN KEY (Nome_item) REFERENCES Item(Nome)
);

CREATE TABLE Jogador (
    id SERIAL PRIMARY KEY,
    Nome VARCHAR(255),
    Senha VARCHAR(255),
    Foto bytea
);


CREATE TABLE Sessao (
    id SERIAL PRIMARY KEY,
    id_jogador INTEGER,
    token VARCHAR(255),
    expiration TIMESTAMP NOT NULL,
    FOREIGN KEY (id_jogador) REFERENCES Jogador(id)
);