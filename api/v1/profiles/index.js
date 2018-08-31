const express = require('express');
const router = express.Router({ mergeParams: true });
var multer = require('multer');
const middleware = require("../../../middlewares");
const controller = require('./controller');
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const dir = '../../../uploadedimage/';
		//cb(null, 'src/assets/images')        
		fs.mkdir(dir, function (err) {
			if (!err) {
				fs.mkdir(dir, err => cb(err, dir));
			}
		});

		cb(null, dir)
	},
	filename: (req, file, cb) => {
		let filemime = file.mimetype;
		let ext = filemime.split("/")
		cb(null, file.fieldname + '-' + Date.now() + "." + ext[1])
	}
});

var upload = multer({
	storage: storage
});
router.get('/', middleware.authenticate, controller.find);
router.get('/list', controller.list);
router.get('/handle/:handle', controller.findHandle);
router.get('/user/:user_id', controller.findUser);
router.post('/create', middleware.authenticate, controller.create);
router.post('/add_experience', middleware.authenticate, controller.addExperience);
router.post('/add_education', middleware.authenticate, controller.addEducation);
router.delete('/experience/:id', middleware.authenticate, controller.removeExperience);
router.delete('/education/:id', middleware.authenticate, controller.removeEducation);
router.delete('/', middleware.authenticate, controller.remove);
router.post('/upload_profile_pic', middleware.authenticate,  upload.single('image'),  controller.uploadeProfilePic);



module.exports = router;