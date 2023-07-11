import { getProducts, getProductsById } from '../services/productService.js'

export const getAllProducts = async (req, res) => {
    try {
        const product = await getProducts(req.query)
        red.render('home', {
            products: product.docs,
            user: req.session.user,
        })
    } catch (error) {
        res.status(500).send('Error getting prods')
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params.id
    try {
        const product = await getProductsById({ _id: id })

        res.render('products', {
            title: product.title,
            price: product.price,
            stock: product.stock,
            thumbnail: product.thumbnail,
        })
    } catch (error) {
        return res.status(500).send('Error getting prods')
    }
}