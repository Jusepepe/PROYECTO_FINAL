import { ProductModel } from "../models/index.js";

export class ProductController{
    
    static async getProducts(req, res){
        const products = await ProductModel.getProducts();
        if(!products.length) return res.json({ message : "Tabla productos vacía"});

        res.json(products)
    }

    static async getProductbyID(req, res){
        const id = req.params.id;

        const product = await ProductModel.getProductbyID(id);
        if(!product) return res.json({ message : `No existe el producto con id : ${id}`});

        res.json(product)
    }

    static async createProduct(req, res){
        const { nombre, stock, precio } = req.body;

        const product = await ProductModel.createProduct(nombre,stock,precio);
        if(!product) return res.json({ message : "El producto no se pudo crear"});

        res.json(product)
    }

    static async increaseStock(req, res){
        const id = req.params.id;
        const quantity = req.params.quantity;

        let product = await ProductModel.getProductbyID(id);
        if(!product) return res.json({ message : `No existe el producto con id : ${id}`});

        product = await product.increment('stock', { by: quantity });

        res.json(product)

    }

}