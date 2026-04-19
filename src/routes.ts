import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";
import { createUserController } from "./controller/user/createUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { authUserSchema, createUserSchema } from "./schemas/userSchema";
import { authUserController } from "./controller/user/authUserController";
import { DetailUserControler } from "./controller/user/DetailUserControler";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controller/category/CrateCategoryController";
import { ListCategoryController } from "./controller/category/ListCategoryController";
import { isAdmin } from "./middlewares/isAdmin";
import { createCategorySchema } from "./schemas/categorySchema";
import { CreateProductController } from "./controller/product/CrateProductController";
import {
  createProductSchema,
  listProductSchema,
} from "./schemas/productSchema";
import { ListProductController } from "./controller/product/ListProductController";

const router = Router();
const upload = multer(uploadConfig);

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

router.get("/category", isAuthenticated, new ListCategoryController().handle);

router.post(
  "/product",
  isAuthenticated,
  isAdmin,
  upload.single("file"),
  validateSchema(createProductSchema),
  new CreateProductController().handle,
);

router.get(
  "/products",
  isAuthenticated,
  validateSchema(listProductSchema),
  new ListProductController().handle,
);

export default router;
