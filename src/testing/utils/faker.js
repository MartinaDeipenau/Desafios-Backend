import { faker, fakerES } from '@faker-js/faker'

// fakerES es en idioma Español

export const generateProduct = () => {
    return {
        _id: fakerES.database.mongodbObjectId(),
        title: fakerES.commerce.productName(),
        description: fakerES.commerce.productDescription(),
        thumbnail: fakerES.image.urlPicsumPhotos(),
        status: fakerES.datatype.boolean(),
        category: fakerES.commerce.department(),
        code: fakerES.string.uuid(),
        price: fakerES.commerce.price(),
        stock: fakerES.helpers.rangeToNumber({ min: 0, max: 50 })
    }
}
