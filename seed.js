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
    await pool.query('DELETE FROM jogador;');
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

    const imagePath = path.join(__dirname, 'src', 'assets', 'image.png');
    const imageBuffer = fs.readFileSync(imagePath);

    await pool.query(`
      INSERT INTO Jogador (Nome, Senha, Foto) 
      VALUES ($1, $2, $3)
    `, ['TesteJogador', '$2b$10$YYi2vDGZaCf1rqYbQ1YGZe9/4C5xwG2MxaA7.u9TwozgnFH0GlETO', imageBuffer]);
    
    await pool.query(`
      INSERT INTO Regiao (Nome) VALUES 
      ('Underdark'),
      ('Grove of Silvanus'),
      ('Blighted Village'),
      ('Emerald Grove'),
      ('Moonrise Towers');
    `);

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

    const result = await pool.query(`
      INSERT INTO Personagem (Nome, Nivel, Controlador, Nome_classe) VALUES 
      ('Karlach', 12, 'Jogador 1', 'Barbarian'),
      ('Shadowheart', 10, 'Jogador 2', 'Cleric'),
      ('Gale', 14, 'Jogador 3', 'Wizard'),
      ('Astarion', 8, 'Jogador 4', 'Rogue'),
      ('Lae''zel', 15, 'Jogador 5', 'Fighter')
      RETURNING id;
    `);

    const [karlachId, shadowheartId, galeId, astarionId, laezelId] = result.rows.map(row => row.id);

    await pool.query(`
        INSERT INTO Personagem_habilidades (id_personagem, Nome_habilidade) VALUES 
        (${karlachId}, 'Cleave'),
        (${shadowheartId}, 'Turn Undead'),
        (${galeId}, 'Fireball'),
        (${astarionId}, 'Sneak Attack'),
        (${laezelId}, 'Second Wind');
    `);

    const inimigoResult = await pool.query(`
        INSERT INTO Inimigo (Nome, Nivel) VALUES 
        ('Mind Flayer', 18),
        ('Drow Warrior', 12),
        ('Goblin Chief', 8),
        ('Bulette', 16),
        ('Hag', 20)
        RETURNING id;
    `);
  
    const [mindFlayerId, drowWarriorId, goblinChiefId, buletteId, hagId] = inimigoResult.rows.map(row => row.id);
    
    await pool.query(`
        INSERT INTO Inimigo_habilidades (id_inimigo, Nome_habilidade) VALUES 
        (${mindFlayerId}, 'Mind Blast'),
        (${drowWarriorId}, 'Darkness'),
        (${goblinChiefId}, 'Cleave'),
        (${buletteId}, 'Burrow Attack'),
        (${hagId}, 'Hex');
    `);
  
    const npcResult = await pool.query(`
      INSERT INTO NPC (Nome, Tipo) VALUES 
      ('Volo', 'Quest Giver'),
      ('Ze''vlor', 'Quest Giver'),
      ('Kagha', 'Quest Giver'),
      ('Halsin', 'Healer'),
      ('Minthara', 'Antagonist')
      RETURNING id;
    `);

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

    console.log('Seed completed successfully');
  } catch (err) {
    console.error('Error running seed', err);
  } finally {
    pool.end(); 
  }
}

seed();
