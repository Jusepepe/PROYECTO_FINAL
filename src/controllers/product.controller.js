import { ProductModel } from "../models/index.js";

export class ProductController{
    
    static async getProducts(req, res){
        try{
        const products = await ProductModel.getProducts();
        if(!products.length) return res.json({ message : "Tabla productos vacía"});

        res.json(products)
    }catch{}
    }

    static async getProductbyID(req, res){
        try{
        const id = req.params.id;

        const product = await ProductModel.getProductbyID(id);
        if(!product) return res.json({ message : `No existe el producto con id : ${id}`});

        res.json(product)
        
    }catch{}
    }

    static async createProduct(req, res){
        try{
        const { nombre, stock, precio } = req.body;

        const product = await ProductModel.createProduct(nombre,stock,precio);
        if(!product) return res.json({ message : "El producto no se pudo crear"});

        res.json(product)
    }catch{}
    }

    static async increaseStock(req, res){
        try{
        const id = req.params.id;
        const quantity = req.params.quantity;

        let product = await ProductModel.getProductbyID(id);
        if(!product) return res.json({ message : `No existe el producto con id : ${id}`});

        product = await product.increment('stock', { by: quantity });

        res.json(product)
    }catch{}

    }

}