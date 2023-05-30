import { Router } from 'express'
import { productModel } from '../models/products.js'

const productsRouters = Router()

productsRouters.get('/', async (req, res) => {
  try {
    const sort = req.query.sort === 'desc' ? -1 : 1
    const query = req.query.query || ''
    const filter = query ? { category: query } : {}

    console.log(filter)
    console.log(query)

    const options = {
      limit: parseInt(req.query.limit) || 8,
      page: parseInt(req.query.page) || 1,
      sort: { price: sort },
    }

    const products = await productModel.paginate(filter, options)

    res.send(products)
  } catch (err) {
    res.status(500).send('Error getting products')
  }
})

productsRouters.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const product = await productModel.findOne({ _id: id })

    res.send({ products: product })
    // res.render('products', {
    //   title: product.title,
    //   price: product.price,
    //   stock: product.stock,
    // })
  } catch (error) {
    console.log(error)
    res.status(500).send('Error getting product')
  }
})

productsRouters.post('/', async (req, res) => {
  const {
    title,
    description,
    price,
    thumbnail,
    status,
    category,
    code,
    stock,
  } = req.body
  await productModel.create({
    title,
    description,
    price,
    thumbnail,
    status,
    category,
    code,
    stock,
  })
  res.send('Product added successfully')
})

productsRouters.put('/:id', async (req, res) => {
  const id = req.params.id

  const {
    title,
    description,
    price,
    thumbnail,
    status,
    category,
    code,
    stock,
  } = req.body

  const message = await productModel.updateOne(
    { _id: id },
    {
      title,
      description,
      price,
      thumbnail,
      status,
      category,
      code,
      stock,
    }
  )
  res.send(message)
})

productsRouters.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    await productModel.deleteOne({ _id: id })

    res.send('Product deleted')
  } catch (err) {
    console.log(err)
    res.status(500).send('Error deleting product')
  }
})

export default productsRouters