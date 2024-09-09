import pg from 'pg';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';

const { Pool } = pg;

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'RPG',
  password: 'password',
  port: 5432,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function seed() {
  try {
    await pool.query('DELETE FROM sessao;');
    await pool.query('DELETE FROM recompensa;');
    await pool.query('DELETE FROM participa_missoes;');
    await pool.query('DELETE FROM missoes;');
    await pool.query('DELETE FROM personagens_itens;');
    await pool.query('DELETE FROM armadura;');
    await pool.query('DELETE FROM arma;');
    await pool.query('DELETE FROM efeitos_itens;');
    await pool.query('DELETE FROM item;');
    await pool.query('DELETE FROM npc;');
    await pool.query('DELETE FROM combate;');
    await pool.query('DELETE FROM inimigo_habilidades;');
    await pool.query('DELETE FROM inimigo;');
    await pool.query('DELETE FROM personagem_habilidades;');
    await pool.query('DELETE FROM personagem;');
    await pool.query('DELETE FROM efeitos_habilidades;');
    await pool.query('DELETE FROM habilidades;');
    await pool.query('DELETE FROM classe;');
    await pool.query('DELETE FROM regiao;');

    const jogadores = [
      { nome: 'admin', senha: '$2b$10$YYi2vDGZaCf1rqYbQ1YGZe9/4C5xwG2MxaA7.u9TwozgnFH0GlETO', foto: 'image.png' },
      { nome: 'TesteJogador', senha: '$2b$10$YYi2vDGZaCf1rqYbQ1YGZe9/4C5xwG2MxaA7.u9TwozgnFH0GlETO', foto: 'image.png' },
      { nome: 'GamerKarlach', senha: '$2b$10$YYi2vDGZaCf1rqYbQ1YGZe9/4C5xwG2MxaA7.u9TwozgnFH0GlETO', foto: 'image.png' },
      { nome: 'ShadowheartFan', senha: '$2b$10$YYi2vDGZaCf1rqYbQ1YGZe9/4C5xwG2MxaA7.u9TwozgnFH0GlETO', foto: 'image.png' },
      { nome: 'ArcaneWizard', senha: '$2b$10$YYi2vDGZaCf1rqYbQ1YGZe9/4C5xwG2MxaA7.u9TwozgnFH0GlETO', foto: 'image.png' },
      { nome: 'RogueMaster', senha: '$2b$10$YYi2vDGZaCf1rqYbQ1YGZe9/4C5xwG2MxaA7.u9TwozgnFH0GlETO', foto: 'image.png' },
    ];

    const loadImage = (filename) => {
      const imagePath = path.join(__dirname, 'src', 'assets', filename);
      return fs.readFileSync(imagePath);
    };

    for (const jogador of jogadores) {
      const jogadorExistente = await pool.query('SELECT * FROM Jogador WHERE Nome = $1', [jogador.nome]);

      if (jogadorExistente.rows.length === 0) {
        const jogadorBuffer = loadImage(jogador.foto);
        await pool.query(`
          INSERT INTO Jogador (Nome, Senha, Foto) 
          VALUES ($1, $2, $3);
        `, [jogador.nome, jogador.senha, jogadorBuffer]);
      } else {
        console.log(`Jogador com o nome ${jogador.nome} já existe e não será inserido novamente.`);
      }
    }

    const regioes = [
      { nome: 'Underdark', foto: 'underdark.jpg' },
      { nome: 'Astral Plane', foto: 'astral.jpg' },
      { nome: 'Blighted Village', foto: 'blighted.jpg' },
      { nome: 'Emerald Grove', foto: 'grove.png' },
      { nome: 'Moonrise Towers', foto: 'moonrise.jpg' },
    ];

    const regioesBuffers = regioes.map(regiao => loadImage(regiao.foto));

    const regioesValues = regioes.map((regiao, index) => `('${regiao.nome}', $${index + 1})`).join(', ');
    const regioesResult = await pool.query(`
      INSERT INTO Regiao (Nome, Foto) VALUES 
        ${regioesValues}
      RETURNING id;
    `, regioesBuffers);

    const [underdarkId, silvanusId, villageId, emeraldGroveId, moonriseId] = regioesResult.rows.map(row => row.id);

    await pool.query(`
      INSERT INTO Classe (Nome, Recurso) VALUES 
        ('Barbarian', 'Rage'),
        ('Cleric', 'Divine Power'),
        ('Wizard', 'Mana'),
        ('Rogue', 'Sneak Attack'),
        ('Fighter', 'Action Surge'),
        ('Druid', 'Wild Shape'),
        ('Warlock', 'Pact Magic'); 
    `);

    await pool.query(`
      INSERT INTO Habilidades (Nome, Custo, Dano) VALUES 
        ('Cleave', 10, 40), 
        ('Turn Undead', 15, 0), 
        ('Fireball', 20, 60), 
        ('Sneak Attack', 5, 25), 
        ('Second Wind', 10, 0), 
        ('Mind Blast', 25, 50),
        ('Darkness', 15, 0), 
        ('Burrow Attack', 20, 30), 
        ('Hex', 10, 15);
    `);

    await pool.query(`
      INSERT INTO Efeitos_habilidades (efeito, Nome_habilidade) VALUES 
        ('AoE Damage', 'Cleave'),
        ('Control Undead', 'Turn Undead'),
        ('Burning', 'Fireball'),
        ('Critical Damage', 'Sneak Attack'),
        ('Healing', 'Second Wind');
    `);

    const personagens = [
      { nome: 'Karlach', nivel: 12, controlador: 1, classe: 'Barbarian', foto: 'karlach.png' },
      { nome: 'Shadowheart', nivel: 10, controlador: 1, classe: 'Cleric', foto: 'shadowheart.png' },
      { nome: 'Gale', nivel: 14, controlador: 1, classe: 'Wizard', foto: 'gale.png' },
      { nome: 'Astarion', nivel: 8, controlador: 1, classe: 'Rogue', foto: 'astarion.png' },
      { nome: `Lae''zel`, nivel: 15, controlador: 1, classe: 'Fighter', foto: 'laezel.png' },
      { nome: 'Wyll', nivel: 15, controlador: 1, classe: 'Fighter', foto: 'wyll.png'},
      { nome: 'Halsin', nivel: 20, controlador: 1, classe: 'Druid', foto: 'halsin.png'},
    ];

    const personagensBuffers = personagens.map(personagem => loadImage(personagem.foto));

    const personagensValues = personagens.map((personagem, index) => `('${personagem.nome}', ${personagem.nivel}, ${personagem.controlador}, '${personagem.classe}', $${index + 1})`).join(', ');
    const personagensResult = await pool.query(`
      INSERT INTO Personagem (Nome, Nivel, Controlador, Nome_classe, Foto) VALUES 
        ${personagensValues}
      RETURNING id;
    `, personagensBuffers);

    const [karlachId, shadowheartId, galeId, astarionId, laezelId] = personagensResult.rows.map(row => row.id);

    await pool.query(`
      INSERT INTO Personagem_habilidades (id_personagem, Nome_habilidade) VALUES 
        (${karlachId}, 'Cleave'),
        (${shadowheartId}, 'Turn Undead'),
        (${galeId}, 'Fireball'),
        (${astarionId}, 'Sneak Attack'),
        (${laezelId}, 'Second Wind');
    `);

    const inimigos = [
      { nome: 'Mind Flayer', nivel: 18, foto: 'flayer.jpg' },
      { nome: 'Raphael', nivel: 12, foto: 'raphael.png' },
      { nome: 'Spectator', nivel: 8, foto: 'spectator.png' },
      { nome: 'Bulette', nivel: 16, foto: 'bulette.png' },
      { nome: 'Hag', nivel: 20, foto: 'hag.png' },
    ];

    const inimigosBuffers = inimigos.map(inimigo => loadImage(inimigo.foto));

    const inimigosValues = inimigos.map((inimigo, index) => `('${inimigo.nome}', ${inimigo.nivel}, $${index + 1})`).join(', ');
    const inimigoResult = await pool.query(`
      INSERT INTO Inimigo (Nome, Nivel, Foto) VALUES 
        ${inimigosValues}
      RETURNING id;
    `, inimigosBuffers);

    const [mindFlayerId, raphaelId, spectatorId, buletteId, hagId] = inimigoResult.rows.map(row => row.id);

    await pool.query(`
      INSERT INTO Inimigo_habilidades (id_inimigo, Nome_habilidade) VALUES 
        (${mindFlayerId}, 'Mind Blast'),
        (${raphaelId}, 'Darkness'),
        (${spectatorId}, 'Cleave'),
        (${buletteId}, 'Burrow Attack'),
        (${hagId}, 'Hex');
    `);

    const npcs = [
      { nome: 'Volo', tipo: 'Quest Giver', foto: 'volo.png' },
      { nome: `Ze''vlor`, tipo: 'Quest Giver', foto: 'zevlor.png' },
      { nome: 'Kagha', tipo: 'Quest Giver', foto: 'kagha.jpg' },
      { nome: 'Whithers', tipo: 'Camp follower', foto: 'withers.png' },
      { nome: 'Minthara', tipo: 'Antagonist', foto: 'minthara.jpg' },
    ];

    const npcsBuffers = npcs.map(npc => loadImage(npc.foto));

    const npcsValues = npcs.map((npc, index) => `('${npc.nome}', '${npc.tipo}', $${index + 1})`).join(', ');
    const npcResult = await pool.query(`
      INSERT INTO NPC (Nome, Tipo, Foto) VALUES 
        ${npcsValues}
      RETURNING id;
    `, npcsBuffers);

    const [voloId, zevlorId, kaghaId, halsinId, mintharaId] = npcResult.rows.map(row => row.id);

    await pool.query(`
      INSERT INTO Item (Nome, Preço) VALUES 
        ('Sword of Justice', 500.00),
        ('Sorrow', 450.00),
        ('Blooded Greataxe', 400.00),
        ('Amulet of Selune', 300.00),
        ('Boots of Speed', 200.00),
        ('Magic Missile Wand', 350.00), 
        ('Crossbow', 150.00),
        ('Adamantine Splint Armor', 600.00), 
        ('Leather Armor of Agility', 250.00), 
        ('Robes of the Archmage', 550.00), 
        ('Chainmail of Command', 400.00), 
        ('Helm of Balduran', 100.00),
        ('Potion of Healing', 50.00), 
        ('Potion of Greater Healing', 100.00),
        ('Potion of Superior Healing', 200.00),
        ('Potion of Invisibility', 500.00),
        ('Potion of Speed', 300.00);
    `);

    await pool.query(`
      INSERT INTO Efeitos_itens (efeito, Nome_item) VALUES 
        ('Increased Strength', 'Sword of Justice'),
        ('Lifesteal', 'Sorrow'),
        ('Bonus Damage', 'Blooded Greataxe'),
        ('Healing Aura', 'Amulet of Selune'),
        ('Haste', 'Boots of Speed');
    `);

    await pool.query(`
      INSERT INTO Arma (Nome, Ataque, Tipo) VALUES 
        ('Sword of Justice', 50, 'Melee'),
        ('Sorrow', 45, 'Melee'),
        ('Blooded Greataxe', 60, 'Melee'),
        ('Magic Missile Wand', 35, 'Ranged'),
        ('Crossbow', 40, 'Ranged');
    `);

    await pool.query(`
      INSERT INTO Armadura (Nome, Defesa, Tipo) VALUES 
        ('Adamantine Splint Armor', 60, 'Heavy'),
        ('Leather Armor of Agility', 30, 'Light'),
        ('Robes of the Archmage', 20, 'Robes'),
        ('Chainmail of Command', 50, 'Heavy'),
        ('Helm of Balduran', 15, 'Helmet');
    `);

    await pool.query(`
      INSERT INTO Missoes (Nome, Objetivo, Descricao, id_fornecedor) VALUES 
        ('Find the Nightsong', 'Retrieve the Nightsong from the Underdark', 'A legendary artifact lies hidden in the Underdark', ${voloId}),
        ('Save the Grove', 'Protect the Emerald Grove from goblin invaders', 'Defend the Grove from the goblin horde', ${zevlorId}),
        ('Rescue the Druid Halsin', 'Rescue Halsin from the goblin camp', 'Find and rescue the druid Halsin from his captors', ${kaghaId}),
        ('Defeat the Hag', 'Kill Auntie Ethel', 'Defeat the hag in her lair deep in the swamp', ${mintharaId}),
        ('Escape the Mind Flayer Ship', 'Survive the attack and escape the ship', 'Escape from the ship of the Mind Flayers', ${halsinId});
    `);

    await pool.query(`
      INSERT INTO Combate (Hora, id_regiao, id_inimigo, id_personagem) VALUES 
        ('2024-09-01 14:30:00', ${underdarkId}, ${mindFlayerId}, ${karlachId}),
        ('2024-09-02 16:00:00', ${villageId}, ${raphaelId}, ${shadowheartId}),
        ('2024-09-03 11:15:00', ${emeraldGroveId}, ${spectatorId}, ${galeId}),
        ('2024-09-05 09:45:00', ${silvanusId}, ${buletteId}, ${astarionId}),
        ('2024-09-06 20:30:00', ${moonriseId}, ${hagId}, ${laezelId});
    `);

    await pool.query(`
      INSERT INTO Participa_missoes (id_personagem, Nome_missao) VALUES 
        (${karlachId}, 'Find the Nightsong'),
        (${shadowheartId}, 'Save the Grove'),
        (${galeId}, 'Rescue the Druid Halsin'),
        (${astarionId}, 'Defeat the Hag'),
        (${laezelId}, 'Escape the Mind Flayer Ship');
    `);

    await pool.query(`
      INSERT INTO Recompensa (Nome_missao, Nome_item, Quantidade) VALUES 
        ('Find the Nightsong', 'Sword of Justice', 1),
        ('Save the Grove', 'Amulet of Selune', 1),
        ('Rescue the Druid Halsin', 'Blooded Greataxe', 1),
        ('Defeat the Hag', 'Boots of Speed', 1),
        ('Escape the Mind Flayer Ship', 'Crossbow', 1);
    `);

    await pool.query(`
      INSERT INTO Personagens_itens (id_personagem, Nome_item, Quantidade) VALUES 
        (${karlachId}, 'Sword of Justice', 1),
        (${karlachId}, 'Potion of Healing', 2),
        (${shadowheartId}, 'Amulet of Selune', 1),
        (${shadowheartId}, 'Potion of Greater Healing', 1),
        (${galeId}, 'Blooded Greataxe', 1),
        (${galeId}, 'Potion of Superior Healing', 1),
        (${astarionId}, 'Boots of Speed', 1),
        (${astarionId}, 'Potion of Invisibility', 1),
        (${laezelId}, 'Crossbow', 1),
        (${laezelId}, 'Potion of Speed', 1);
    `);

    console.log('Seed concluído com sucesso');
  } catch (err) {
    console.error('Erro ao executar o seed', err);
  } finally {
    pool.end();
  }
}

seed();
