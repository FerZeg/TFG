import { Router } from "express"
import { deleteMesa, putMesa } from "../../../../controllers/MesaC.js"
import { permissionController } from "../../../../controllers/PermissionC.js"

const mesasRouter = Router({ mergeParams: true })

mesasRouter.delete("/:mesaId", permissionController("admin"), deleteMesa)
mesasRouter.put("/:mesaId",  permissionController("admin"), putMesa)

export default mesasRouter