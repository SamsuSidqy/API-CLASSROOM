import CreateKelas from '../controllers/Kelas.Control.Create.js'
import JoinKelasControl from '../controllers/Kelas.Control.Join.js'
import KelasTugasControl from '../controllers/Kelas.Control.Tugas.js'
import AnnounchControleCreate from '../controllers/Announch.Control.Create.js'
import AsigsmentControlCreate from '../controllers/Asigsment.Control.Create.js'
import ListKelasControl from '../controllers/Kelas.Control.List.js'
import ListTugasKelasControl from '../controllers/Kelas.Control.ListTugas.js'
import DetailTugasControl from '../controllers/Kelas.Control.DetailTugas.js'
import MyAsigsmentControl from '../controllers/Asigsment.Control.MyAsigsment.js'
import TeacherAsigsmentControl from '../controllers/Asigsment.Control.TeacherAsigsment.js'
import UpdateKelasControl from '../controllers/Kelas.Control.Update.js'

import express from 'express'
import multer from 'multer'
import uniqueFilename from 'unique-filename'
import path from 'path';
import Authorization from '../middleware/Authorization.js'

const routeKelas = new express.Router()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `assets/`); // folder penyimpanan
  },
  filename: function (req, file, cb) {
  	const ext = path.extname(file.originalname);
  	const uniqueName = path.basename(uniqueFilename(''));
     cb(null, uniqueName + ext);
  }
});
const UploadControl = multer({ storage: storage });

routeKelas.use(express.json())
routeKelas.post('/kelas',Authorization,CreateKelas)
routeKelas.put('/kelas/:kodeKelas',Authorization,UpdateKelasControl)
routeKelas.get('/kelas',Authorization,ListKelasControl)
routeKelas.post("/join",Authorization,JoinKelasControl)
routeKelas.get('/tugas/:idKelas',Authorization,ListTugasKelasControl)
routeKelas.get('/tugas/detail/:idTugas',Authorization,DetailTugasControl)
routeKelas.get('/asigsment/:idKelas',Authorization,MyAsigsmentControl)
routeKelas.get('/teacher/:idKelas',Authorization,TeacherAsigsmentControl)
routeKelas.post("/tugas",Authorization,UploadControl.array('lampiran',5),KelasTugasControl)
routeKelas.post("/announch",Authorization,UploadControl.array('lampiran',5),AnnounchControleCreate)
routeKelas.post("/asign",Authorization,UploadControl.array('lampiran',5),AsigsmentControlCreate)

export default routeKelas