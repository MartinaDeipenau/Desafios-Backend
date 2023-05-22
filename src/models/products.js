import { Schema, model } from 'mongoose'

const productSchema = new Schema({
  title: { 
    type: String,
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  thumbnail: [],
  status: { 
    type: Boolean, 
    default: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  code: { 
    type: String, 
    unique: true 
  },
  stock: { 
    type: Number, 
    required: true 
  },
})

export const productModel = model('product', productSchema)