import { Request, Response } from "express";
import { db } from "../../db/index";
import { productsTable } from "../../db/productsSchema";
import { eq, lt, gte, ne } from 'drizzle-orm';

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(productsTable);
    res.status(201).json(products);
  } catch (e) {
    res.status(500).json(e);
  }
}


export async function getProductById(req: Request, res: Response) {
  try {
    const id  = parseInt(req.params.id);
    const [product] = await db.select().from(productsTable).where(eq(productsTable.id, id));
    if(!product){
      res.status(404).send({message: 'Product not found'});
    }
    else{
      res.json(product);
    }
  } catch (e) {
    res.status(500).json(e);
  }
}


export async function createProduct(req: Request, res: Response) {
  try {
    const [product] = await db.insert(productsTable).values(req.body).returning();
    res.status(201).json(product);
  } catch (e) {
    res.status(500).json(e);
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const id  = parseInt(req.params.id);
    const [product] = await db.update(productsTable)
      .set(req.body)
      .where(eq(productsTable.id, id))
      .returning();
      
      if(!product) {
        res.status(404).send({message: "Product was not found"});
      }else{
        res.json(product);      }
  } catch (e) {
    res.status(500).json(e);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const id  = parseInt(req.params.id);
    const [deletedProduct] = await db.delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();

      if(!deletedProduct) {
        res.status(404).send({message: "Product was not found"});
      }else{
        res.status(204).send();
      }
  } catch (e) {
    res.status(500).json(e);
  }
}