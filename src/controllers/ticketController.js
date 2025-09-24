const db = require("../db/connect"); // Certifique-se que connect.js usa mysql2/promise
const crypto = require("crypto");

// Gera código aleatório de 6 caracteres
function gerarCodigoAleatorio(length = 6) {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let codigo = "";
  for (let i = 0; i < length; i++) {
    const idx = crypto.randomInt(0, caracteres.length);
    codigo += caracteres[idx];
  }
  return codigo;
}

class TicketController {
  // Cadastrar participante
  static async registerParticipant(req, res) {
    try {
      const { nome, telefone } = req.body;

      if (!nome || !telefone) {
        return res.status(400).json({ error: "Nome e telefone são obrigatórios." });
      }

      // Garante código único
      let codigo;
      let isUnique = false;

      while (!isUnique) {
        codigo = gerarCodigoAleatorio();
        const [rows] = await db.execute(
          "SELECT id FROM participantes WHERE codigo = ?",
          [codigo]
        );
        if (rows.length === 0) isUnique = true;
      }

      const [result] = await db.execute(
        "INSERT INTO participantes (nome, telefone, codigo) VALUES (?, ?, ?)",
        [nome, telefone, codigo]
      );

      res.status(201).json({
        message: "Participante cadastrado com sucesso!",
        data: {
          id: result.insertId,
          nome,
          telefone,
          codigo
        }
      });
    } catch (err) {
      console.error("Erro ao cadastrar participante:", err);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  // Consultar participante pelo código
  static async getParticipantByCode(req, res) {
    try {
      const { codigo } = req.params;

      const [rows] = await db.execute(
        "SELECT id, nome, telefone, codigo, check_in, criado_em FROM participantes WHERE codigo = ?",
        [codigo]
      );

      if (rows.length === 0) {
        return res.status(404).json({ error: "Código não encontrado." });
      }

      res.json(rows[0]);
    } catch (err) {
      console.error("Erro ao buscar participante:", err);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  // Realizar check-in
  static async checkInParticipant(req, res) {
    try {
      const { codigo } = req.params;

      const [rows] = await db.execute(
        "SELECT id, nome, check_in FROM participantes WHERE codigo = ?",
        [codigo]
      );

      if (rows.length === 0) {
        return res.status(404).json({ error: "Código não encontrado." });
      }

      const participante = rows[0];

      if (participante.check_in) {
        return res.status(400).json({ message: "Participante já realizou o check-in." });
      }

      await db.execute(
        "UPDATE participantes SET check_in = 1 WHERE id = ?",
        [participante.id]
      );

      res.json({ message: `Check-in realizado para ${participante.nome}.` });
    } catch (err) {
      console.error("Erro ao realizar check-in:", err);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
}

module.exports = TicketController;
