import app from "./index.js"
import { connectDB } from "./connection.js"
import {
	S3Client,
	ListBucketsCommand,
	ListObjectsV2Command,
	GetObjectCommand,
	PutObjectCommand
} from "@aws-sdk/client-s3"

const S3 = new S3Client({
	region: "auto",
	endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
	  accessKeyId: ACCESS_KEY_ID,
	  secretAccessKey: SECRET_ACCESS_KEY,
	},
})
console.log(
	await S3.send(
	  new ListBucketsCommand("")
	)
)  
app.listen(process.env.PORT, () => {
	console.log("El servidor está inicializado en el puerto " + process.env.PORT)
	connectDB()
})