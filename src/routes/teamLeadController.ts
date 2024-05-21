import express, { Router } from "express";
import {
  getAllTeamLeads,
  teamLeadLogin,
  teamLeadRegister,
} from "../controller/teamLeadAuthController";

const router: Router = express.Router();

// login route
router.post("/login", teamLeadLogin);

// signup route
router.post("/signup", teamLeadRegister);

//get all TeamLead
router.get("/", getAllTeamLeads);

export default router;
