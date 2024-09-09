
SELECT p.Nome AS Personagem, c.Nome AS Classe, h.Nome AS Habilidade
FROM Personagem p
JOIN Classe c ON p.Nome_classe = c.Nome
JOIN Personagem_habilidades ph ON p.id = ph.id_personagem
JOIN Habilidades h ON ph.Nome_habilidade = h.Nome;

SELECT c.Hora, i.Nome AS Inimigo, p.Nome AS Personagem, r.Nome AS Regiao
FROM Combate c
JOIN Inimigo i ON c.id_inimigo = i.id
JOIN Personagem p ON c.id_personagem = p.id
JOIN Regiao r ON c.id_regiao = r.id;

SELECT m.Nome AS Missao, m.Objetivo, i.Nome AS Item, r.Quantidade
FROM Missoes m
JOIN Recompensa r ON m.Nome = r.Nome_missao
JOIN Item i ON r.Nome_item = i.Nome;

SELECT p.Nome AS Personagem, i.Nome AS Item, pi.Quantidade
FROM Personagem p
JOIN Personagens_itens pi ON p.id = pi.id_personagem
JOIN Item i ON pi.Nome_item = i.Nome;

SELECT m.Nome AS Missao, npc.Nome AS NPC, p.Nome AS Personagem
FROM Missoes m
JOIN NPC npc ON m.id_fornecedor = npc.id
JOIN Participa_missoes pm ON m.Nome = pm.Nome_missao
JOIN Personagem p ON pm.id_personagem = p.id;
