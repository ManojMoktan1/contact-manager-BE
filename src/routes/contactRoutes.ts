import { Router } from "express";
import * as contactController from "../controllers/contactController";

const router = Router();

router.post("/", contactController.getAllContacts);
router.get("/:id", contactController.getContactById);
router.post("/email", contactController.getContactByName);
router.post("/add", contactController.createContact);
router.put("/:id", contactController.updateContact);
router.delete("/:id", contactController.deleteContact);

export default router;
