import { Router } from "express"
import { autorization } from '../middlewares/autorization.js'
import {
  createCart,
  getProductFromCart,
  deleteAllProductsFromCart,
  addProductTocart,
  updateQuantity,
  deleteProductFromCart,
  generatePucharse,
} from '../controllers/cart.controller.js'


const cartsRouters = Router()


cartsRouters.post('/', createCart)

cartsRouters.get('/:cid', getProductFromCart)

cartsRouters.delete('/:cid', deleteAllProductsFromCart)

cartsRouters.post('/:cid/product/:pid', addProductTocart) //, autorization(['user'])

cartsRouters.put('/:cid/product/:pid', updateQuantity)

cartsRouters.delete('/:cid/product/:pid', deleteProductFromCart)

cartsRouters.get('/:cid/purcharse', generatePucharse)

export default cartsRouters