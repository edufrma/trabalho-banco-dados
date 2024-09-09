CREATE VIEW personagens_em_missoes AS
SELECT
	personagem.nome AS nome_personagem,
	personagem.nivel,
	missoes.nome AS nome_missao,
	missoes.descricao
FROM personagem
JOIN participa_missoes ON participa_missoes.id_personagem = personagem.id
JOIN missoes ON participa_missoes.nome_missao = missoes.nome;
