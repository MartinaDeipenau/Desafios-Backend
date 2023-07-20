import { Router } from 'express'
import { autorization } from '../middlewares/autorization.js'
import {
  getAllProducts,
  getProductById,
  postNewProduct,
  putProduct,
  deleteProduct,
} from '../controllers/product.controller.js'

const productsRouters = Router()

productsRouters.get('/', getAllProducts)

productsRouters.get('/:id', getProductById)

productsRouters.post('/', autorization(['admin']), postNewProduct)

productsRouters.put('/:id', autorization(['admin']), putProduct)

productsRouters.delete('/:id', autorization(['admin']), deleteProduct)

export default productsRouters