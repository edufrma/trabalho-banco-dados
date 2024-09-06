import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./database.js";
import authRouter from "./routers/auth.routers.js";
import personagemRouter from "./routers/character.router.js";
import npcRouter from "./routers/npc.router.js";
import skillsRouter from "./routers/skills.router.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(personagemRouter);
app.use(npcRouter);
app.use(skillsRouter);

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Servidor rodando' });
});

db.connect()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso");
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados. O servidor não foi iniciado.", err);
  });

export default app;
