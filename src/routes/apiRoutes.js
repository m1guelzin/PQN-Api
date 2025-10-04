const express = require("express");
const TicketController = require("../controllers/ticketController");
const UserController = require("../controllers/userController");

const router = express.Router();

// Participantes
router.post("/participantes", TicketController.registerParticipant);
router.get("/participantes", TicketController.listParticipants);
router.get("/participantes/:codigo", TicketController.getParticipantByCode);
router.post("/participantes/:codigo/checkin", TicketController.checkInParticipant);

// Admin
router.post("/admin/register", UserController.registerAdmin);
router.post("/admin/login", UserController.login);
router.get("/admin", UserController.listUsers);

module.exports = router;
