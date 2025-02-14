import { UserModel } from "./user.model.js";
import { ProductModel } from "./product.model.js";
import { CartModel } from "./cart.model.js";
import { OrderModel } from "./order.model.js";
import { PaymentModel } from "./payment.model.js";

// Relation between Users and Carts
UserModel.hasOne(CartModel, {
    foreignKey: 'userID',
})
CartModel.belongsTo(UserModel, {
    foreignKey: 'userID',
})

// Relation between Users and Payments
UserModel.hasMany(PaymentModel, {
    foreignKey: 'userID',
})
PaymentModel.belongsTo(UserModel, {
    foreignKey: 'userID',
})

// Relation between Orders and Payments
CartModel.hasOne(PaymentModel, {
    foreignKey: 'cartID',
})
PaymentModel.belongsTo(CartModel, {
    foreignKey: 'cartID',
})

// Relation between Carts and Products
CartModel.belongsToMany(ProductModel, { through: OrderModel })
ProductModel.belongsToMany(CartModel, { through: OrderModel })


export { UserModel, ProductModel, CartModel, OrderModel, PaymentModel}

