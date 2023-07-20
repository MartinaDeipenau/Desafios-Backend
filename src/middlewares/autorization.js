export const autorization = (role) => {
    return (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ Error :'Debes iniciar sesion para realizar esta accion'})
        } else {
            if (role.includes(req.user.role)) {
                return next ()
            } else {
                return res.status(401).json ({ Error : 'No tienes permiso para realizar esta accion'})
            }
        }
    }
}

export default autorization