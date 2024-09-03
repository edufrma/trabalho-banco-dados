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
   git clone [(https://github.com/edufrma/trabalho-banco-dados/]
   ```

2. Execute o script SQL para criar o banco de dados:
   ```bash
   colocar aqui
   ```

3. Compile e execute o programa:
   ```bash
    npm run dev
  ```

4. Acesse o programa e explore as funcionalidades de gerenciamento de RPG!

---
