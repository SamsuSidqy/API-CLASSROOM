import express from "express"
import {
	RegisterControl,
	LoginControl,
	RefreshTokenControl
} from '../controllers/Users.Control.js'

import ListPeopleKelasControl from '../controllers/Kelas.Control.ListPeople.js'
import UpdateUsersControl from '../controllers/Users.Control.Update.js'

import Authorization from '../middleware/Authorization.js'
import multer from 'multer'
import uniqueFilename from 'unique-filename'
import path from 'path';

const routeUsers = new express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `profile/`); // folder penyimpanan
  },
  filename: function (req, file, cb) {
  	const ext = path.extname(file.originalname);
  	const uniqueName = path.basename(uniqueFilename(''));
     cb(null, uniqueName + ext);
  }
});
const UploadControl = multer({ storage: storage });


routeUsers.use(express.json())
routeUsers.post("/register", RegisterControl)
routeUsers.post("/login", LoginControl)
routeUsers.get("/refresh",Authorization,RefreshTokenControl)
routeUsers.get("/people/:kodeKelas",Authorization,ListPeopleKelasControl)
routeUsers.put("/people/update",Authorization,UploadControl.single('profile'),UpdateUsersControl)

export default routeUsers