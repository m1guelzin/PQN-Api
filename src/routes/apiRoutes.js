const express = require("express");
const TicketController = require("../controllers/ticketController");
const UserController = require("../controllers/userController");

const router = express.Router();

// Rotas de compradores
router.post("/participantes", TicketController.registerParticipant);
router.get("/participantes/:codigo", TicketController.getParticipantByCode);
router.post("/participantes/:codigo/checkin", TicketController.checkInParticipant);

// Rotas de admin
router.post("/admin/register", UserController.registerAdmin);
router.post("/admin/login", UserController.login);

module.exports = router;
