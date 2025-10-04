const pool = require("./connect");

async function testConnect() {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("✅ Conexão com o banco de dados realizada com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco de dados:", error);
  }
}

module.exports = testConnect;
