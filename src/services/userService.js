import { userModel } from '../models/user.js'

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        return users
    } catch (error) {
        return error
    }
}

export const getUsersByE = async (email) => {
    try {
        const user = await userModel.findOne(email)
        return user
    } catch (error) {
        return error
    }
}