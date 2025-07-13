import CreateKelas from '../controllers/Kelas.Control.Create.js'
import JoinKelasControl from '../controllers/Kelas.Control.Join.js'
import KelasTugasControl from '../controllers/Kelas.Control.Tugas.js'

import express from 'express'
import multer from 'multer'

const routeKelas = new express.Router()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `assets/`); // folder penyimpanan
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const UploadControl = multer({ storage: storage });

routeKelas.use(express.json())
routeKelas.post('/kelas',CreateKelas)
routeKelas.post("/join",JoinKelasControl)
routeKelas.post("/tugas",UploadControl.array('files',5),KelasTugasControl)

export default routeKelas