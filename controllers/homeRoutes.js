const router = require('express').Router();
const { Post, User } = require('../models');

router.get('/', async (req, res) => {
  const dbPostData = await Post.findAll({ include: User });
  const posts = dbPostData.map((project) => project.get({ plain: true }));
  res.render('homepage', { posts, logged_in: req.session.logged_in });
});

router.get('/dashboard', async (req, res) => {  
  res.render('login');
});

router.get('/login', async (req, res) => {  
  res.render('login');
});

module.exports = router;
