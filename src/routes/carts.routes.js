import { Router } from "express"
import { cartModel } from '../models/carts.js'


const cartsRouters = Router()

// POST
cartsRouters.post('/', async (req, res) => {
  const cart = await cartModel.create({})
  res.send(cart)
})

// GET
cartsRouters.get('/:cid', async (req, res) => {
  const cid = req.params.cid
  const cart = await cartModel.find({ _id: cid })
  res.send(cart)
})

// DELETE
cartsRouters.delete('/:cid', async (req, res) => {
  try {
    const cid = req.params.cid
    const cart = await cartModel.findById({ _id: cid })
    cart.products = []

    await cartModel.updateOne({ _id: cid }, cart)

    res.send('Removed products')
  } catch (err) {
    console.log(err)
    res.status(500).send('Error removing products')
  }
})

cartsRouters.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cid = req.params.cid
    const pid = req.params.pid
    const { quantity } = req.body

    const cart = await cartModel.findById({ _id: cid })
    const addProductTocart = {
      id_product: pid,
      quantity: quantity,
    }
    cart.products.push(addProductTocart)

    await cartModel.updateOne({ _id: cid }, cart)

    res.send('Product added to cart')
  } catch (err) {
    console.log(err)
    res.status(500).send('Error adding product to cart')
  }
})

// PUT

cartsRouters.put('/:cid/product/:pid', async (req, res) => {
  try {
    const cid = req.params.cid
    const pid = req.params.pid
    const { quantity } = req.body
    const cart = await cartModel.findById({ _id: cid })

    const productOfCart = cart.products
    const productIndex = productOfCart.findIndex(
      (prod) => prod.id_product == pid
    )

    productOfCart[productIndex].quantity = quantity

    await cartModel.updateOne({ _id: cid }, { products: productOfCart })
    res.send('Updated product quantities')
  } catch (err) {
    console.log(err)
    res.status(500).send('Error updating product quantities')
  }
})

// DELETE

cartsRouters.delete('/:cid/product/:pid', async (req, res) => {
  try {
    const cid = req.params.cid
    const pid = req.params.pid
    const cart = await cartModel.findById({ _id: cid })

    const productOfCart = cart.products
    const productIndex = productOfCart.findIndex(
      (prod) => prod.id_product == pid
    )

    productOfCart.splice(productIndex, 1)

    await cartModel.updateOne({ _id: cid }, { products: productOfCart })

    res.send('Product removed')
  } catch (err) {
    console.log(err)
    res.status(500).send('Error removing product')
  }
})

export default cartsRouters