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
  listProductsByCategorySchema,
  listProductSchema,
} from "./schemas/productSchema";
import { ListProductController } from "./controller/product/ListProductController";
import { DeleteProductController } from "./controller/product/DeleteProductControler";
import { ListProductsByCategoryController } from "./controller/product/ListProductsByCategoryController";
import {
  addItemSchema,
  createOrderSchema,
  detailOrderSchema,
  removeItemSchema,
  sendOrderSchema,
} from "./schemas/orderSchema";
import { CreateOrderController } from "./controller/order/CreateOrderController";
import { ListOrdersController } from "./controller/order/ListOrdersController";
import { AddItemController } from "./controller/order/AddItemController";
import { RemoveItemController } from "./controller/order/RemoveItemController";
import { DetailOrderController } from "./controller/order/DetailOrderController";
import { SendOrderController } from "./controller/order/SendOrderController";

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

router.get(
  "/category/product",
  isAuthenticated,
  validateSchema(listProductsByCategorySchema),
  new ListProductsByCategoryController().handle,
);

router.delete(
  "/product",
  isAuthenticated,
  isAdmin,
  new DeleteProductController().handle,
);

router.post(
  "/order",
  isAuthenticated,
  validateSchema(createOrderSchema),
  new CreateOrderController().handle,
);

router.get("/orders", isAuthenticated, new ListOrdersController().handle);

router.get(
  "/order/detail",
  isAuthenticated,
  validateSchema(detailOrderSchema),
  new DetailOrderController().handle,
);

router.post(
  "/order/add",
  isAuthenticated,
  validateSchema(addItemSchema),
  new AddItemController().handle,
);

router.delete(
  "/order/remove",
  isAuthenticated,
  validateSchema(removeItemSchema),
  new RemoveItemController().handle,
);

router.put(
  "/order/send",
  isAuthenticated,
  validateSchema(sendOrderSchema),
  new SendOrderController().handle,
);

export default router;
