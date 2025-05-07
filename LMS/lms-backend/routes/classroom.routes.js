const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroom.controller');
const protect = require('../middlewares/auth');
const permit = require('../middlewares/role');
const { addAssignment, addSection } = require('../controllers/classroom.controller');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the upload/assignments directory exists and is a folder
const assignmentUploadPath = path.join(__dirname, '..', 'upload', 'assignments');

if (fs.existsSync(assignmentUploadPath)) {
  const stat = fs.statSync(assignmentUploadPath);
  if (!stat.isDirectory()) {
    // If it's a file, delete it
    fs.unlinkSync(assignmentUploadPath);
    fs.mkdirSync(assignmentUploadPath, { recursive: true });
  }
} else {
  fs.mkdirSync(assignmentUploadPath, { recursive: true });
}

// Configure multer for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/assignments/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.pdf') {
      return cb(new Error('Only PDFs allowed'), false);
    }
    cb(null, true);
  }
});

// Routes for classrooms

// Only admin can create a classroom
router.post(
  '/create-classroom',
  protect,
  permit('admin'),
  classroomController.createClassroom
);

// Only admin can assign students
router.post(
  '/assign-students',
  protect,
  permit('admin'),
  classroomController.assignStudentsToClassroom
);

// Only admin can assign tutor
router.post(
  '/assign-tutor',
  protect,
  permit('admin'),
  classroomController.assignTutorToClassroom
);

// Only admin can view all classrooms
router.get(
  '/get-all-classrooms',
  protect,
  permit('admin'),
  classroomController.getAllClassrooms
);


// Students can see their own classrooms
router.get(
  '/my-classrooms',
  protect,
  permit('student'),
  classroomController.getMyClassrooms
);

// Tutors can add assignments
router.post('/add-assignment', protect, permit('tutor', 'admin'), addAssignment);

// Add section route
router.post('/add-section', protect, permit('tutor', 'admin'), addSection);

// Student submits PDF for assignment
router.post(
  '/submit-assignment/:assignmentId',
  protect,
  permit('student'),
  upload.single('pdf'),
  classroomController.submitAssignment
);

// Students can view all their assignments for their classrooms
router.get(
    '/my-assignments',
    protect,
    permit('student'),
    classroomController.getMyAssignments
  );
  

module.exports = router;
