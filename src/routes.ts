import { Router } from "express";
import { createUserController } from "./controller/user/createUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { authUserSchema, createUserSchema } from "./schemas/userSchema";
import { authUserController } from "./controller/user/authUserController";
import { DetailUserControler } from "./controller/user/DetailUserControler";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

router.post(
  "/users",
  validateSchema(createUserSchema),
  new createUserController().handle,
);

router.post(
  "/session",
  validateSchema(authUserSchema),
  new authUserController().handle,
);

router.get("/me", isAuthenticated, new DetailUserControler().handle);

export default router;
