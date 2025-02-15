import { CartModel, ProductModel } from "../models/index.js";

export class CartController{

    static async createCart(req, res){
        try{
        const userID = req.session.user.id;
        const cart = await CartModel.createCart(userID);

        if(!cart) return res.json({ message : "No se pudo crear el carrito"});

        return res.json(cart)
    }catch{}
    }

    static async addProduct(req, res){
        try{
        const cartID = req.session.user.cartID;
        const userID = req.session.user.id;
        const productID = req.params.product;
        const quantity = req.params.quantity;

        const cart = await CartModel.getCartbyID(cartID);
        if(!cart || (userID !== cart.userID)){
            return res.json({ message: "No se encontró el paquete"})
        }

        const product = await ProductModel.getProductbyID(productID);

        if(!product)return res.json({ message: "No se encontró el producto"});
        if(product.stock < quantity) return res.json({ message: "No hay suficiente stock"});

        await cart.addProduct(product, { through : { quantity } } );

        res.json({ message: "Se añadió el producto", product })
    }catch{}
    }

    static async removeProduct(req, res){

        try{

        const cartID = req.session.user.cartID;
        const productID = req.params.product;

        const cart = await CartModel.getCartbyID(cartID);

        if(!cart) return res.json({ message: "No se encontró el paquete"});

        const products = await cart.getProducts({ where: {id : productID} });
        const product = products[0];

        if(!product) return res.json({ message: "No se encontró el producto"});

        await cart.removeProduct(product);
        res.json({ message: "Se removió el producto"})
    }catch{}
    }

    static async getCarts(req, res){

        try{
        const carts = await CartModel.getCarts();
        if(!carts) return res.json({ message : "Tabla de carritos vacía" });
        res.json(carts)
    }catch{}
    }

    static async getProducts(req, res){
        try{
        const cartID = req.session.user.cartID;
        console.log(cartID)
        const cart = await CartModel.getCartbyID(cartID);
        if(!cart) return res.json({ message: "No se encontró el carrito"});

        const products = await cart.getProducts();

        if(!products.length) return res.json({ message : "Carrito sin productos" });

        res.json(products)
    }catch{}
    }

}