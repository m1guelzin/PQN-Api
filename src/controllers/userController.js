const db = require("../db/connect");
const bcrypt = require("bcrypt");

// Para simplificar, vamos criar um admin inicial no banco
// Lembre-se: em produção nunca use senha em texto puro

class UserController {
  // Registrar usuário admin (pode usar para criar outro admin se quiser)
  static async registerAdmin(req, res) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ error: "Nome, email e senha são obrigatórios." });
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(senha, 10);

      const [result] = await db.execute(
        "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
        [nome, email, hashedPassword]
      );

      return res.status(201).json({
        message: "Admin registrado com sucesso!",
        id: result.insertId,
        nome,
        email
      });
    } catch (err) {
      console.error("Erro ao registrar admin:", err);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  // Login do admin
  static async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ error: "Email e senha são obrigatórios." });
      }

      const [rows] = await db.execute(
        "SELECT * FROM usuarios WHERE email = ?",
        [email]
      );

      if (rows.length === 0) {
        return res.status(401).json({ error: "Email ou senha inválidos." });
      }

      const user = rows[0];

      // Verifica senha
      const match = await bcrypt.compare(senha, user.senha);
      if (!match) {
        return res.status(401).json({ error: "Email ou senha inválidos." });
      }

      // Retorna dados do usuário (sem senha)
      return res.status(200).json({
        id: user.id,
        nome: user.nome,
        email: user.email
      });
    } catch (err) {
      console.error("Erro no login:", err);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
}

module.exports = UserController;
