import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function FilesOpens(req, res) {
	const filename = req.params.filename;
	console.log(__dirname)	
	const filePath = path.join(__dirname, '../../assets/', filename);
	console.log(filePath)
	fs.access(filePath, fs.constants.F_OK, (err) => {
		if (err) {
			return res.status(404).send('File not found');
		}
		res.sendFile(filePath);
	});
}
