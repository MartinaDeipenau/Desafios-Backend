import CustomError from '../errors/customError.js'
import EErrors from '../errors/enumError.js'

const autorization = (role) => {
    return (req, res, next) => {
        if (!req.isAuthenticated()) {
            CustomError.createError({
                name: 'Unauthenticated',
                cause: 'User not logged',
                message: 'Debes iniciar sesion para realizar esta accion',
                code: EErrors.AUTORIZATION_ERROR
            })
        } else {
            if (role.includes(req.user.role)) {
                return next()
            } else {
                CustomError.createError({
                    name: 'Unauthorized',
                    cause: 'User role not allowed',
                    message: 'No tienes permisos para realizar esta accion',
                    code: EErrors.AUTORIZATION_ERROR
                })
            }
        }
    }
}

export default autorization