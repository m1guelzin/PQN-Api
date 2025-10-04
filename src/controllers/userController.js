const pool = require("../db/connect");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "chave_secreta_pqn"; // altere em produção

class UserController {
  // Registrar admin
  static async registerAdmin(req, res) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: "Preencha todos os campos." });
    }

    try {
      const [exists] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
      if (exists.length > 0) {
        return res.status(400).json({ message: "E-mail já cadastrado." });
      }

      const hash = await bcrypt.hash(senha, 10);
      await pool.query("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)", [
        nome,
        email,
        hash,
      ]);

      res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      console.error("Erro ao criar admin:", error);
      res.status(500).json({ message: "Erro no servidor." });
    }
  }

  // Login
  static async login(req, res) {
    const { email, senha } = req.body;

    try {
      const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
      if (rows.length === 0)
        return res.status(404).json({ message: "Usuário não encontrado." });

      const user = rows[0];
      const valid = await bcrypt.compare(senha, user.senha);

      if (!valid)
        return res.status(401).json({ message: "Senha incorreta." });

      const token = jwt.sign({ id: user.id, nome: user.nome }, SECRET, { expiresIn: "1h" });

      res.status(200).json({
        message: "Login bem-sucedido!",
        token,
        user: { id: user.id, nome: user.nome, email: user.email },
      });
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).json({ message: "Erro no servidor." });
    }
  }

  // Listar usuários (opcional)
  static async listUsers(req, res) {
    try {
      const [rows] = await pool.query("SELECT id, nome, email, criado_em FROM usuarios");
      res.status(200).json(rows);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({ message: "Erro no servidor." });
    }
  }
}

module.exports = UserController;
