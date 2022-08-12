import { Router } from "express";
import * as contactController from "../controllers/contactController";

const router = Router();

router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContactById);
router.post('/email', contactController.getContactByName);
router.post('/', contactController.createContact);
router.put('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact);


export default router;