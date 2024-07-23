import express from 'express'
import multer from 'multer';

import { userProfile } from '../controllers/user';

const userRouter = express();

// file storage
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/assets');
	},
	filename: function (req, file, cb){
		cb(null, file.originalname)
	}
})
const upload = multer({ storage })

/* ROUTES */
userRouter.post('profile', upload.single('photo'), userProfile);

export default userRouter