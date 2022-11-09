const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
  const dbPostData = await Post.findAll({ include: User });
  const posts = dbPostData.map((project) => project.get({ plain: true }));
  res.render('homepage', { posts, logged_in: req.session.logged_in });
});

router.get('/dashboard', async (req, res) => {  
  if (req.session.logged_in) {
    const dbPostData = await Post.findAll({where: {
      user_id: req.session.user_id
    }, include: User });
    const posts = dbPostData.map((project) => project.get({ plain: true }));
    res.render('dashboard', { posts, logged_in: req.session.logged_in});
  } else {
    res.render('login', {logged_in: req.session.logged_in});
  }
});

router.get('/dashboard/new-post', async (req, res) => {  
    res.render('post-form', {logged_in: req.session.logged_in});
});

router.get('/dashboard/posts/:id', async (req, res) => {  
    const dbPostData = await Post.findByPk(req.params.id);
    const post = dbPostData.get({ plain: true });
    console.log(post)
    res.render('edit-post', { post, logged_in: req.session.logged_in});
});

router.get('/login', async (req, res) => {  
  res.render('login', { logged_in: req.session.logged_in} );
});

router.get('/posts/:id', async (req, res) => {
  const dbPostData = await Post.findByPk(req.params.id, {include: User});

  const dbCommentData = await Comment.findAll({
    where: {
      post_id: req.params.id 
    },
  include: User})

  const post = dbPostData.get({ plain:true })
  const comments = dbCommentData.map((comment) => comment.get({plain:true}))
  res.render('post', {post, comments, logged_in: req.session.logged_in})
})

module.exports = router;
