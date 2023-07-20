import { userModel } from '../../mongoDB/models/user.js'
import { hashPassword } from '../../../utils/bcrypt.js'


export const createUser = async (obj) => {
    try {
        const hashPass = await hashPassword(obj.password)

        const newObj = { ...obj, password: hashPass }

        const newUser = await userModel.create(newObj)

        return newUser
    } catch (error) {
        return error
    }
}