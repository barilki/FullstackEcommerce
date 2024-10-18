import { Router } from "express";
import { createProduct, getProductById, listProducts, updateProduct, deleteProduct } from "./productsController";

const router = Router();

router.get('/', listProducts);

router.get('/:id', getProductById);

router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;