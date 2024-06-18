import express from "express";
import bodyParser from "body-parser";
import sql from "msnodesqlv8";

const app = express();
const PORT = 3000;
const connectionString = "server=DSN1191061628;Database=produtos_db;Trusted_Connection=Yes;Driver={Sql Server Native Client 11.0}";

app.use(bodyParser.json());

// Buscar todos os produtos
app.get("/produtos", (req, res) => {
    sql.query(connectionString, "SELECT * FROM produtos", (erro, rows) => {
        if (erro) {
            res.status(500).json("Erro Interno de Servidor");
        } else {
            res.status(200).json(rows);
        }
    });
});

// Buscar um produto específico por ID
app.get("/produtos/:id", (req, res) => {
    const { id } = req.params;
    sql.query(connectionString, `SELECT * FROM produtos WHERE id = ${id}`, (erro, rows) => {
        if (erro) {
            res.status(500).json("Erro Interno do Servidor");
        } else {
            res.status(200).json(rows);
        }
    });
});

// Criar um novo produto
app.post("/produtos", (req, res) => {
    const { descricao, custo, preco } = req.body;
    sql.query(
        connectionString,
        `INSERT INTO produtos (descricao, custo, preco) VALUES ('${descricao}', ${custo}, ${preco})`,
        (erro, rows) => {
            if (erro) {
                res.status(500).json("Erro Interno de Servidor");
            } else {
                res.status(201).json("Produto cadastrado com sucesso!");
            }
        }
    );
});

// Atualizar um produto por ID
app.put("/produtos/:id", (req, res) => {
    const { id } = req.params;
    const { descricao, custo, preco } = req.body;
    sql.query(
        connectionString,
        `UPDATE produtos SET descricao = '${descricao}', custo = ${custo}, preco = ${preco} WHERE id = ${id}`,
        (erro, rows) => {
            if (erro) {
                res.status(500).json("Erro Interno de Servidor");
            } else {
                res.status(200).json("Produto atualizado com sucesso!");
            }
        }
    );
});

// Deletar um produto por ID
app.delete("/produtos/:id", (req, res) => {
    const { id } = req.params;
    sql.query(
        connectionString,
        `DELETE FROM produtos WHERE id = ${id}`,
        (erro, rows) => {
            if (erro) {
                res.status(500).json("Erro Interno de Servidor");
            } else {
                res.status(200).json("Produto excluído com sucesso!");
            }
        }
    );
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
