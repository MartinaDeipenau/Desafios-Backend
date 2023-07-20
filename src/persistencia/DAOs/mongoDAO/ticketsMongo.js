import { ticketModel } from '../../mongoDB/models/tickets.js'

export const newTicket = async (obj) => {
    try {
        const ticket = await ticketModel.create(obj)
        return ticket
    } catch (error) {
        return error
    }
}