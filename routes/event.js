import { Router } from "express";
import * as controllers from "../controllers/event.js"

const router = Router();

router.get("/", controllers.getEvents);
router.get("/:id", controllers.getEvent);
router.post("/", controllers.createEvent);
router.put("/:id", controllers.updateEvent);
router.delete("/:id", controllers.deleteEvent);

export default router;