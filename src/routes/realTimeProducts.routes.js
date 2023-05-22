import { Router } from 'express'
import { ProductManager } from '../productManager.js'

const realTimeRouters = Router()

const myProductManager = new ProductManager('./products.txt')

realTimeRouters.get('/', async (req, res) => {

  req.io.on('connection', async (socket) => {
    console.log('client connected')

    const products = await myProductManager.getProducts() 

    req.io.emit('products', products) 

    socket.on('newProduc', async (product) => {
      

      myProductManager.addProduct(product)

      req.io.emit('products', products) 
    })
  })

  res.render('realTimeProducts')
})

export default realTimeRouters