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
      { nome: 'TesteJogador', senha: '$2b$10$YYi2vDGZaCf1rqYbQ1YGZe9/4C5xwG2MxaA7.u9TwozgnFH0GlETO', foto: 'testejogador.png' },
      { nome: 'GamerKarlach', senha: '$2b$10$YYi2vDGZaCf1rqYbQ1YGZe9/4C5xwG2MxaA7.u9TwozgnFH0GlETO', foto: 'karlach.png' },
      { nome: 'ShadowheartFan', senha: '$2b$10$YYi2vDGZaCf1rqYbQ1YGZe9/4C5xwG2MxaA7.u9TwozgnFH0GlETO', foto: 'shadowheart.png' },
      { nome: 'ArcaneWizard', senha: '$2b$10$YYi2vDGZaCf1rqYbQ1YGZe9/4C5xwG2MxaA7.u9TwozgnFH0GlETO', foto: 'gale.png' },
      { nome: 'RogueMaster', senha: '$2b$10$YYi2vDGZaCf1rqYbQ1YGZe9/4C5xwG2MxaA7.u9TwozgnFH0GlETO', foto: 'astarion.png' },
    ];

    const loadImage = (filename) => {
      const imagePath = path.join(__dirname, 'src', 'assets', filename);
      return fs.readFileSync(imagePath);
    };

    const jogadorBuffers = jogadores.map(jogador => loadImage(jogador.foto));

    const jogadorValues = jogadores.map((jogador, index) => `('${jogador.nome}', '${jogador.senha}', $${index + 1})`).join(', ');
    await pool.query(`
      INSERT INTO Jogador (Nome, Senha, Foto) 
      VALUES 
        ${jogadorValues};
    `, jogadorBuffers);

    const regioes = [
      { nome: 'Underdark', foto: 'underdark.png' },
      { nome: 'Grove of Silvanus', foto: 'grove_of_silvanus.png' },
      { nome: 'Blighted Village', foto: 'blighted_village.png' },
      { nome: 'Emerald Grove', foto: 'emerald_grove.png' },
      { nome: 'Moonrise Towers', foto: 'moonrise_towers.png' },
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
        ('Fighter', 'Action Surge');
    `);

    await pool.query(`
      INSERT INTO Habilidades (Nome, Custo, Dano) VALUES 
        ('Cleave', 10, 40), -- Barbarian
        ('Turn Undead', 15, 0), -- Cleric
        ('Fireball', 20, 60), -- Wizard
        ('Sneak Attack', 5, 25), -- Rogue
        ('Second Wind', 10, 0), -- Fighter
        ('Mind Blast', 25, 50), -- Inimigo: Mind Flayer
        ('Darkness', 15, 0), -- Inimigo: Drow Warrior
        ('Burrow Attack', 20, 30), -- Inimigo: Bulette
        ('Hex', 10, 15); -- Inimigo: Hag
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
      { nome: 'Lae\'zel', nivel: 15, controlador: 1, classe: 'Fighter', foto: 'laezel.png' },
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
      { nome: 'Mind Flayer', nivel: 18, foto: 'mind_flayer.png' },
      { nome: 'Drow Warrior', nivel: 12, foto: 'drow_warrior.png' },
      { nome: 'Goblin Chief', nivel: 8, foto: 'goblin_chief.png' },
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

    const [mindFlayerId, drowWarriorId, goblinChiefId, buletteId, hagId] = inimigoResult.rows.map(row => row.id);

    await pool.query(`
      INSERT INTO Inimigo_habilidades (id_inimigo, Nome_habilidade) VALUES 
        (${mindFlayerId}, 'Mind Blast'),
        (${drowWarriorId}, 'Darkness'),
        (${goblinChiefId}, 'Cleave'),
        (${buletteId}, 'Burrow Attack'),
        (${hagId}, 'Hex');
    `);

    const npcs = [
      { nome: 'Volo', tipo: 'Quest Giver', foto: 'volo.png' },
      { nome: 'Ze\'vlor', tipo: 'Quest Giver', foto: 'zevlor.png' },
      { nome: 'Kagha', tipo: 'Quest Giver', foto: 'kagha.png' },
      { nome: 'Halsin', tipo: 'Healer', foto: 'halsin.png' },
      { nome: 'Minthara', tipo: 'Antagonist', foto: 'minthara.png' },
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
        ('Helm of Balduran', 100.00); 
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
        ('2024-09-02 16:00:00', ${villageId}, ${drowWarriorId}, ${shadowheartId}),
        ('2024-09-03 11:15:00', ${emeraldGroveId}, ${goblinChiefId}, ${galeId}),
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
        (${shadowheartId}, 'Amulet of Selune', 1),
        (${galeId}, 'Blooded Greataxe', 1),
        (${astarionId}, 'Boots of Speed', 1),
        (${laezelId}, 'Crossbow', 1);
    `);

    console.log('Seed concluído com sucesso');
  } catch (err) {
    console.error('Erro ao executar o seed', err);
  } finally {
    pool.end();
  }
}

seed();
