import express from 'express';
import pg from 'pg';

const { Pool } = pg;

const app = express();
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'RPG',
  password: 'password',
  port: 5432,
});

app.get('/jogador/imagem/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT Foto FROM Jogador WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length > 0) {
      const imageBuffer = result.rows[0].foto;
      res.setHeader('Content-Type', 'image/png'); 
      res.send(imageBuffer); 
    } else {
      res.status(404).send('Imagem não encontrada');
    }
  } catch (error) {
    console.error('Erro ao buscar a imagem', error);
    res.status(500).send('Erro ao buscar a imagem');
  }
});

app.listen(4000, () => {
  console.log('Servidor rodando na porta 3000');
});
