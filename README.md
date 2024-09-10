---

# Trabalho de Banco de Dados - Sistema de Gerenciamento de RPG

📝 **Descrição**
Este projeto implementa um sistema de gerenciamento de RPG com diversas entidades e funcionalidades que permitem a criação e o controle de personagens, missões, itens, e combates, além de possibilitar a gestão de jogadores e suas sessões de login. O objetivo é criar um banco de dados robusto e funcional que suporte todas as operações necessárias para o jogo.

---

🚀 **Funcionalidades**
- **Gerenciamento de Personagens:** Criação, leitura, atualização e exclusão de personagens, incluindo suas habilidades e itens.
- **Gerenciamento de Missões:** Controle de missões com definição de objetivos, recompensas, e a participação de personagens.
- **Sistema de Combate:** Registro de combates entre personagens e inimigos em diferentes regiões.
- **Gerenciamento de Sessões:** Controle de login dos jogadores com armazenamento seguro de senhas e geração de tokens de sessão.
- **Consultas Relacionais:** Realização de consultas complexas envolvendo múltiplas tabelas.
- **Camada de Persistência:** Implementação de uma camada de persistência que conecta a interface gráfica do jogo ao banco de dados.

---

💻 **Modelo de Entidade Relacionamento**
- O modelo de entidade relacionamento foi desenvolvido utilizando [nome da ferramenta de modelagem].
- Inclui as entidades: `Personagem`, `Classe`, `Habilidades`, `Inimigo`, `Regiao`, `Combate`, `Item`, `NPC`, `Missoes`, `Recompensa`, e `Jogador`.
- As entidades estão devidamente normalizadas para garantir a integridade dos dados e a eficiência nas operações.

---

💾 **Modelo Relacional**
- O modelo relacional foi gerado a partir do MER, mapeando cada entidade para uma tabela no banco de dados.
- As relações entre as tabelas foram definidas com chaves primárias e estrangeiras, assegurando a consistência referencial.

---

🧠 **Consultas em Álgebra Relacional**
- O projeto inclui cinco consultas em álgebra relacional, cada uma envolvendo pelo menos três tabelas, demonstrando a complexidade e a robustez das interações entre os dados.

---

📝 **Avaliação das Formas Normais**
- Cinco tabelas foram analisadas e normalizadas até a terceira forma normal, assegurando a eliminação de redundâncias e a minimização de anomalias de inserção, atualização, e exclusão.
| Avaliação das formas normais: |                                                       |                                                                                                                                                                                                                                       |                                                                    |                 |
|-------------------------------|-------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|-----------------|
| Tabela                        | Tem atributos divisíveis?                             | Todos os atributos que não são chaves primárias ou candidatas dependem funcionalmente de uma PK ou chave candidata?                                                                                                                   | Existem dependências transitivas?                                  | Forma normal    |
| Personagem                    | Não. Os 5 atributos da tabela são indivisíveis.       | Sim. A partir da PK "id" (um serial) é possível inferir qualquer outro atributo da tabela. Os demais atributos da tabela não são chaves candidatas, visto que não são únicos.                                                         | Não. Todas as dependências funcionais em relação à PK são diretas. | 3ª forma normal |
| Missões                       | Não. Todos os 4 atributos da tabela são indivisíveis. | Sim. A PK é o atributo "Nome_missão", a partir do qual todos os outros atributos podem ser deduzidos. O objetivo e a descrição são chaves candidatas, e os demais atributos também podem ser deduzidos a partir de qualquer um deles. | Não, todas as dependências funcionais são diretas.                 | 3ª forma normal |
| Jogador                       | Não. Todos os 4 atributos da tabela são indivisíveis. | Sim. A partir da PK "id" (um serial) é possível inferir qualquer outro atributo da tabela. Os demais atributos da tabela não são chaves candidatas, visto que não são únicos.                                                         | Não, todas as dependências funcionais são diretas.                 | 3ª forma normal |
| Sessao                        | Não. Todos os 4 atributos da tabela são indivisíveis. | Sim. A partir da PK "id" (um serial) é possível inferir qualquer outro atributo da tabela. Dos demais atributos,  apenas o token poderia ser uma chave candidata, e os demais atributos também dependem funcionalmente dele.          | Não, todas as dependências funcionais são diretas.                 | 3ª forma normal |
| Arma                          | Não. Todos os 3 atributos da tabela são indivisíveis. | Sim. A partir da PK "nome" é possível inferir qualquer outro atributo da tabela. Nenhum dos demais atributos é único, o que significa que não podem ser chaves candidatas.                                                            | Não, todas as dependências funcionais são diretas.                 | 3ª forma normal |
| Região                        | Não. Todos os 2 atributos da tabela são indivisíveis. | Sim. "Id" é uma PK e o outro atributo, "nome", é uma chave candidata.                                                                                                                                                                 | Não, todas as dependências funcionais são diretas.                 | 3ª forma normal |
| Classe                        | Não. Todos os 3 atributos da tabela são indivisíveis. | Sim. A tabela tem apenas dois atributos, sendo um deles a PK. Assim, existe dependência funcional.                                                                                                                                    | Não, todas as dependências funcionais são diretas.                 | 3ª forma normal |
| Habilidades                   | Não. Todos os 3 atributos da tabela são indivisíveis. | Sim. A partir da PK "nome" é possível inferir qualquer outro atributo da tabela. Nenhum dos demais atributos é único, o que significa que não podem ser chaves candidatas.                                                            | Não, todas as dependências funcionais são diretas.                 | 3ª forma normal |
| Efeitos_habilidades           | Não. Todos os 2 atributos da tabela são indivisíveis. | Sim. A tabela tem apenas dois atributos, sendo um deles a PK. Assim, existe dependência funcional.                                                                                                                                    | Não, todas as dependências funcionais são diretas.                 | 3ª forma normal |
| Personagem_habilidades        | Não. Todos os 2 atributos da tabela são indivisíveis. | A PK é composta por todos os atributos da tabela                                                                                                                                                                                      | Não, todas as dependências funcionais são diretas.                 | 3ª forma normal |
| Inimigo                       | Não. Todos os 3 atributos da tabela são indivisíveis. | Sim. A partir da PK "Id" é possível inferir qualquer outro atributo da tabela. "Nome" também é uma chave candidata e é possível deduzir os demais atributos a partir dele.                                                            | Não, todas as dependências funcionais são diretas.                 | 3ª forma normal |
| Inimigo_habilidades           | Não. Todos os 2 atributos da tabela são indivisíveis. | A PK é composta por todos os atributos da tabela                                                                                                                                                                                      | Não, todas as dependências funcionais são diretas.                 | 3ª forma normal |
| Combate                       | Não. Todos os 4 atributos da tabela são indivisíveis. | A PK é composta por todos os atributos da tabela                                                                                                                                                                                      | Não, todas as dependências funcionais são diretas.                 | 3ª forma normal |
| NPC                           | Não. Todos os 3 atributos da tabela são indivisíveis. | Sim. A partir da PK "Id" é possível inferir qualquer outro atributo da tabela. "Nome" também é uma chave candidata e é possível deduzir os demais atributos a partir dele.                                                            | Não, todas as dependências funcionais são diretas.                 | 3ª forma normal |
| Item                          | Não. Todos os 2 atributos da tabela são indivisíveis. | A partir da PK "Nome" é possível deduzir o outro atributo da tabela                                                                                                                                                                   | Não, todas as dependências funcionais são diretas.                 | 3ª forma normal |
| Efeitos_itens                 | Não. Todos os 2 atributos da tabela são indivisíveis. | A PK é composta por todos os atributos da tabela                                                                                                                                                                                      | Não, todas as dependências funcionais são diretas.                 | 3ª forma normal |
| Armadura                      | Não. Todos os 3 atributos da tabela são indivisíveis. | A partir da PK "Nome" é possível deduzir os demais atributos da tabela, que não são chaves candidatas.                                                                                                                                | Não, todas as dependências funcionais são diretas.                 | 3ª forma normal |
| Personagens_itens             | Não. Todos os 3 atributos da tabela são indivisíveis. | A partir da PK "(id_personagem, nome_item)" é possível deduzir o outro atributo da tabela, que não é chave candidata.                                                                                                                 | Não, todas as dependências funcionais são diretas.                 | 3ª forma normal |
| Participa_missoes             | Não. Todos os 2 atributos da tabela são indivisíveis. | A PK é composta por todos os atributos da tabela                                                                                                                                                                                      | Não, todas as dependências funcionais são diretas.                 | 3ª forma normal |
| Recompensa                    | Não. Todos os 3 atributos da tabela são indivisíveis. | A partir da PK "(nome_missao, nome_item)" é possível deduzir o outro atributo da tabela, que não é chave candidata.                                                                                                                   | Não, todas as dependências funcionais são diretas.                 | 3ª forma normal |

---

📜 **Script SQL**
- O script SQL utilizado para gerar o banco de dados está disponível no repositório do projeto no GitHub.
- Inclui a criação de todas as tabelas, índices, e a inserção de registros iniciais para teste.

---

📂 **Camada de Persistência**
- O projeto conta com uma camada de persistência que permite a interação entre a interface gráfica do jogo e o banco de dados.
- A arquitetura e o código fonte estão disponíveis no repositório do GitHub, junto com um diagrama que detalha essa camada.

---

🖥️ **Programa CRUD**
- Foi desenvolvido um programa com operações de CRUD (Create, Read, Update, Delete) para um conjunto de pelo menos três tabelas relacionadas.
- O código fonte do programa está disponível no repositório do GitHub.

---

👁️ **View e Procedure**
- O banco de dados implementa uma `View` para simplificar consultas complexas.
- Uma `Procedure` foi criada com comandos condicionais para automatizar operações frequentes no banco de dados.

---

📦 **Inserção de Dados Binários**
- O projeto inclui a funcionalidade de inserir dados binários, como fotos ou documentos, diretamente no banco de dados.

---

📖 **Como Executar**
Para executar o projeto, siga as etapas abaixo:

1. Clone o repositório do projeto:
   ```bash
   git clone [(https://github.com/edufrma/trabalho-banco-dados/)]
   ```

2. Execute o script SQL para criar o banco de dados:
   ```bash
      CREATE TABLE Regiao (
         id SERIAL PRIMARY KEY,
         Nome VARCHAR(255),
         Foto BYTEA
      );

      CREATE TABLE Jogador (
         id SERIAL PRIMARY KEY,
         Nome VARCHAR(255),
         Senha VARCHAR(255),
         Foto bytea
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
         Foto BYTEA,
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
         Nivel INTEGER,
         Foto BYTEA
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
         PRIMARY KEY (Hora, id_regiao, id_inimigo, id_personagem),
         FOREIGN KEY (id_regiao) REFERENCES Regiao(id),
         FOREIGN KEY (id_inimigo) REFERENCES Inimigo(id),
         FOREIGN KEY (id_personagem) REFERENCES Personagem(id)
      );

      CREATE TABLE NPC (
         id SERIAL PRIMARY KEY,
         Nome VARCHAR(255),
         Tipo VARCHAR(255),
         Foto BYTEA
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

      CREATE TABLE Sessao (
         id SERIAL PRIMARY KEY,
         id_jogador INTEGER,
         token VARCHAR(255),
         expiration TIMESTAMP NOT NULL,
         FOREIGN KEY (id_jogador) REFERENCES Jogador(id)
      );
   ```
3. Execute o seed para popular o banco de dados:
   ```bash
   node seed.js
  ```

4. Compile e execute o programa:
   ```bash
    npm run dev
  ```

5. Acesse o programa e explore as funcionalidades de gerenciamento de RPG!

---
