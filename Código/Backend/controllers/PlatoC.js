import formidable, {errors as formidableErrors} from "formidable"
import { BadRequestError } from "../lib/Errors.js"
import { S3ClientAccess } from "../storage.js"
import { PassThrough } from "stream"
import { Upload } from "@aws-sdk/lib-storage"
import PlatoService from "../services/PlatoService.js"

export const putPlato = async(req, res) => {
	const uploads = []
  
	const form = formidable({ 
		maxFiles: 1, 
		maxFileSize: 5 * 1024 * 1024,
		filter: function ({mimetype}) {
			return mimetype && mimetype.includes("image")
		},
		fileWriteStreamHandler: function(file) {
			const passThroughStream = new PassThrough()
			const params = {
				Bucket: process.env.BUCKET_NAME,
				Key: `platos/${file.newFilename}`,
				Body: passThroughStream,
				ContentType: file.mimetype,
			}
			const upload = new Upload({
				client: S3ClientAccess(),
				params
			})
			const uploadPromise = upload.done()
				.then((data) => {
					file.location = process.env.MEDIA_URL + "/" + data.Key
				})
  
			uploads.push(uploadPromise)
  
			return passThroughStream
		}
	})
  
	try {
		const [fields, file] = await form.parse(req)
		await Promise.all(uploads)
		if(file.file && file.file[0]) {
			req.body = {...JSON.parse(fields.datos), imagen: file.file[0].location}
		} else {
			req.body = {...JSON.parse(fields.datos)}
		}
		const result = await PlatoService.putPlato(req)
		return res.status(201).send(result)
	} catch (err) {
		console.log(err)
		if (err.code === formidableErrors.biggerThanMaxFileSize) {
			throw new BadRequestError("El archivo es demasiado grande")
		} else {
			throw new BadRequestError("Error al subir la imagen")
		}
	}
}

export const deletePlato = (req, res) => {
	PlatoService.deleteOne(req)
		.then(() => res.status(204).send())
		.catch((err) => {
			console.log(err)
			throw new BadRequestError("Error al eliminar el plato")
		})
}

export const getPlatos = (req, res, next) => {
	PlatoService.getPlatos(req)
		.then((platos) => res.send(platos))
		.catch((err) => {
			next(err)
		})
}
