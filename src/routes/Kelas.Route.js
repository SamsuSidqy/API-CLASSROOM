import CreateKelas from '../controllers/Kelas.Control.Create.js'
import JoinKelasControl from '../controllers/Kelas.Control.Join.js'
import KelasTugasControl from '../controllers/Kelas.Control.Tugas.js'
import AnnounchControleCreate from '../controllers/Announch.Control.Create.js'
import AsigsmentControlCreate from '../controllers/Asigsment.Control.Create.js'
import ListKelasControl from '../controllers/Kelas.Control.List.js'
import ListTugasKelasControl from '../controllers/Kelas.Control.ListTugas.js'
import DetailTugasControl from '../controllers/Kelas.Control.DetailTugas.js'

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
routeKelas.get('/kelas',ListKelasControl)
routeKelas.post("/join",JoinKelasControl)
routeKelas.get('/tugas/:idKelas',ListTugasKelasControl)
routeKelas.get('/tugas/detail/:idTugas',DetailTugasControl)
routeKelas.post("/tugas",UploadControl.array('lampiran',5),KelasTugasControl)
routeKelas.post("/announch",UploadControl.array('lampiran',5),AnnounchControleCreate)
routeKelas.post("/asigsment",UploadControl.array('lampiran',10),AsigsmentControlCreate)

export default routeKelas