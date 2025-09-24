const db = require("./connect");

async function testConnect() {
  try {
    const query = `SELECT 'Conexão bem-sucedida' AS Mensagem`;
    const [rows] = await db.query(query); // <-- sem callback
    console.log(rows[0].Mensagem); // deve exibir: Conexão bem-sucedida
  } catch (error) {
    console.error("Erro ao executar a consulta", error);
  }
}

module.exports = testConnect;
