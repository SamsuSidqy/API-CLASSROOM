import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function ProfileOpens(req, res) {
	const filename = req.params.filename;
	const filePath = path.join(__dirname, '../../profile/', filename);
	fs.access(filePath, fs.constants.F_OK, (err) => {
		if (err) {
			return res.status(404).send('File not found');
		}
		res.sendFile(filePath);
	});
}
