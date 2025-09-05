const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const authMiddleware = require('../middleware/authMiddleware');

// 🔓 Removed authMiddleware from POST
router.post('/', newsController.createNews);

router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);
router.delete('/:id',authMiddleware, newsController.deleteNews);
router.put('/:id',  newsController.updateNews);
// router.get('/', newsController.getAllNews);
// router.get('/:id', newsController.getNewsById);
// router.delete('/:id', authMiddleware, newsController.deleteNews);
// router.put('/:id', authMiddleware, newsController.updateNews);

module.exports = router;
