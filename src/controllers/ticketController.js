const pool = require("../db/connect");

class TicketController {
  // Criar participante
static async registerParticipant(req, res) {
  const { nome, telefone } = req.body;

  if (!nome || !telefone) {
    return res.status(400).json({ message: "Preencha todos os campos." });
  }

  // Gerar código aleatório (6 dígitos)
  const codigo = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await pool.query(
      "INSERT INTO participantes (nome, telefone, codigo) VALUES (?, ?, ?)",
      [nome, telefone, codigo]
    );

    res.status(201).json({ 
      message: "Participante cadastrado com sucesso!", 
      data: { codigo } 
    });
  } catch (error) {
    console.error("Erro ao registrar participante:", error);
    res.status(500).json({ message: "Erro no servidor." });
  }
}

  // Listar todos participantes
  static async listParticipants(req, res) {
    try {
      const [rows] = await pool.query("SELECT * FROM participantes ORDER BY criado_em DESC");
      res.status(200).json(rows);
    } catch (error) {
      console.error("Erro ao listar participantes:", error);
      res.status(500).json({ message: "Erro no servidor." });
    }
  }

  // Buscar participante pelo código
  static async getParticipantByCode(req, res) {
    const { codigo } = req.params;

    try {
      const [rows] = await pool.query(
        "SELECT * FROM participantes WHERE codigo = ?",
        [codigo]
      );

      if (rows.length === 0)
        return res.status(404).json({ message: "Participante não encontrado." });

      res.status(200).json(rows[0]);
    } catch (error) {
      console.error("Erro ao buscar participante:", error);
      res.status(500).json({ message: "Erro no servidor." });
    }
  }

  // Fazer check-in
static async checkInParticipant(req, res) {
  const { codigo } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM participantes WHERE codigo = ?",
      [codigo]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Participante não encontrado." });

    const participante = rows[0];
    if (participante.check_in)
      return res.status(400).json({ message: "Check-in já realizado!" });

    await pool.query(
      "UPDATE participantes SET check_in = 1 WHERE codigo = ?",
      [codigo]
    );

    participante.check_in = 1; // marca o check-in atualizado

    res.status(200).json({
      message: "✅ Check-in realizado com sucesso!",
      participante, // retorna os dados do participante
    });
  } catch (error) {
    console.error("Erro no check-in:", error);
    res.status(500).json({ message: "Erro no servidor." });
  }
}
}

module.exports = TicketController;
