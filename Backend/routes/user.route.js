import express from 'express';
import { register , login , logout,  } from "../controllers/user.controller.js";
import { createEntry, getEntry } from '../controllers/createEntry.controller.js';


const router = express.Router();
// User API
router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)


router.post("/journal/:userId", createEntry);
router.get("/all-journal/:userId", getEntry );


export default router;