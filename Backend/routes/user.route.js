import express from 'express';
import { register , login , logout, alluser, deleteUser,  } from "../controllers/user.controller.js";
import { createEntry, getEntry } from '../controllers/createEntry.controller.js';
import secureRoute from '../middleware/secureRoute.js';


const router = express.Router();
// User API
router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)


router.post("/journal/:userId", createEntry);
router.get("/all-journal/:userId", secureRoute, getEntry );
router.get("/all-user", secureRoute, alluser );
router.delete("/delete/:userId", secureRoute, deleteUser);

export default router;