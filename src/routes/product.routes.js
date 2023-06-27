import { Router } from 'express'
import { productModel } from '../models/products.js'

const productsRouters = Router()

productsRouters.get('/', async (req, res) => {
  try {
    const sort = req.query.sort === 'desc' ? -1 : (req.query.sort = 0)
    const category = req.query.category
    const status = req.query.status
    const query = {}
    category ? (query.category = category) : ''
    status ? (query.status = status) : ''

    const options = {
      limit: parseInt(req.query.limit) || 8,
      page: parseInt(req.query.page) || 1,
      sort: { price: sort },
      lean: true,
    }

    const product = await productModel.paginate(query, options)
    product.status = 'success'

    res.render('home', {
      product: product,
      user: req.session.user,
    })
  } catch (error) {
    console.log(error)

    res.status(500).send('Error')
  }
})

productsRouters.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const product = await productModel.findOne({ _id: id })

    res.render('products', {
      title: product.title,
      price: product.price,
      stock: product.stock,
      thumbnail: product.thumbnail,
    })
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
  } catch (error) {
    console.log(error)
    res.status(500).send('Error delete product')
  }
})

export default productsRouters