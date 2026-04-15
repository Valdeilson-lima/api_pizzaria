import { Router } from "express";
import { createUserController } from "./controller/user/createUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { authUserSchema, createUserSchema } from "./schemas/userSchema";
import { authUserController } from "./controller/user/authUserController";
import { DetailUserControler } from "./controller/user/DetailUserControler";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controller/category/CrateCategoryController";
import { isAdmin } from "./middlewares/isAdmin";
import { createCategorySchema } from "./schemas/categorySchema";

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

router.post(
  "/categories",
  isAuthenticated,
  isAdmin,
  validateSchema(createCategorySchema),
  new CreateCategoryController().handle,
);

export default router;
