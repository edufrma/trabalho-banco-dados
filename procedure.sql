
CREATE OR REPLACE PROCEDURE checar_participacao_missao(
IN personagem_id INT,
IN missao_nome VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
-- checando existencia do personagem...
IF NOT EXISTS(
SELECT 1 FROM personagem 
WHERE id = personagem_id
) THEN
RAISE EXCEPTION 'Personagem % nao registrado.', personagem_id;
END IF;

-- checando existencia da missao...
IF NOT EXISTS(
SELECT 1 FROM missoes WHERE nome = missao_nome
) THEN
RAISE EXCEPTION 'Missao % nao registrada.', missao_nome;
END IF;

-- checando se o personagem faz missao...
IF NOT EXISTS(
SELECT 1 FROM participa_missoes 
WHERE id_personagem = personagem_id AND nome_missao = missao_nome
) THEN
RAISE EXCEPTION 'Personagem % nao esta na missao %', personagem_id, missao_nome;
END IF;

RAISE NOTICE 'Personagem % esta na missao %', personagem_id, missao_nome;

END 
$$;

CREATE OR REPLACE PROCEDURE completar_missao(
    IN personagem_id INT,
    IN missao_nome VARCHAR
)
LANGUAGE plpgsql
AS $$
DECLARE
recompensa_nome VARCHAR;
recompensa_quantidade INT;
BEGIN
    -- Checa se personagem esta participando da missao.
    CALL checar_participacao_missao(personagem_id, missao_nome);

-- recupera o nome do item que é recompensa da missao
SELECT nome_item INTO recompensa_nome FROM recompensa WHERE nome_missao = missao_nome;
-- recupera a quantidade desse item que a missao da
SELECT quantidade INTO recompensa_quantidade FROM recompensa WHERE nome_missao = missao_nome;

    -- Remove a participacao do personagem da missao
    DELETE FROM Participa_missoes
    WHERE id_personagem = personagem_id AND nome_missao = missao_nome;

    -- Adiciona os itens da missão ao inventário do personagem
    IF EXISTS(
SELECT 1 FROM personagens_itens
WHERE id_personagem = personagem_id AND nome_item = recompensa_nome
) THEN
-- se existe, da um update pra adicionar quantidade
UPDATE personagens_itens
SET quantidade = quantidade + recompensa_quantidade
WHERE id_personagem = personagem_id AND nome_item = recompensa_nome;
ELSE
INSERT INTO personagens_itens(id_personagem, nome_item, quantidade)
VALUES (personagem_id, recompensa_nome, recompensa_quantidade);
END IF;

    RAISE NOTICE 'Missao % completada com sucesso. % itens % foram adicionados no inventario do personagem %.', missao_nome, recompensa_quantidade, recompensa_nome, personagem_id;
END
$$;
