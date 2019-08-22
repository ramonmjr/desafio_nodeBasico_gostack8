const express = require("express");

const server = express();

server.use(express.json());

projetos = [];
requisicoes = 0;

server.use((req, res, next) => {
  reuq = requisicoes + 1;
  console.log(` o número de requisições é: ${reuq}`);
  next();
  requisicoes = reuq;
});

function checkIdExistsInArray(req, res, next) {
  const { id } = req.params;
  if (!projetos[id]) {
    return res.status(400).json({ error: "User not found on database!" });
  }

  return next();
}

server.get("/projects", (req, res) => {
  return res.json(projetos);
});

server.post("/projects", (req, res) => {
  const project = req.body;
  projetos.push(project);

  return res.json(projetos);
});

server.post("/projects/:id/tasks", checkIdExistsInArray, (req, res) => {
  const { title } = req.body;
  console.log(title);
  const { id } = req.params;

  projetos[id].tasks.push(title);

  return res.json(projetos[id]);
});

server.put("/projects/:id", checkIdExistsInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projetos[id].title = title;

  return res.json(projetos[id]);
});

server.delete("/projects/:id", checkIdExistsInArray, (req, res) => {
  const { id } = req.params;

  projetos.splice(id);

  return res.json(projetos);
});

server.listen("3333");
