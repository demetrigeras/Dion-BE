import { Router } from "express";
import * as controllers from "../controllers/profile.js"

const router = Router();

router.get("/", controllers.getProfiles);
router.get("/:id", controllers.getProfile);
router.post("/", controllers.createProfile);
router.put("/:id", controllers.updateProfile);
router.delete("/:id", controllers.deleteProfile);

export default router;