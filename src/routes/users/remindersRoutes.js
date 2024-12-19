import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationReminder, validateUpdateReminder } from "../../middlewares/validation/user/reminderValidators.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { RemindersControllers } from "../../controllers/users/remindersControllers.js";

const route = Router()

const remindersControllers = new RemindersControllers()

route.get("/:id/reminders", validateId, validationResult, remindersControllers.getRemindersController) 
route.post("/:id/reminders", validateId, validateCreationReminder, validationResult, remindersControllers.createReminderController) 
route.patch("/:id/reminders/:reminderId", validateId, validateUpdateReminder, validationResult, remindersControllers.updateReminderController) 
route.delete("/:id/reminders/:reminderId", validateId, validationResult, remindersControllers.deleteReminderController) 

export default route
