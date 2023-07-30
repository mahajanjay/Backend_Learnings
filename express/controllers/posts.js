const model = require("../model/post");
const Post = model.Post;
// const data = require('../data.json')

exports.getAllPosts = async (req, res) => {
  // res.status(200).send('Hello');
  const query = Post.find();
  console.log(req.query);
  if(req.query && req.query.sort) {
    const posts = await query.sort({[req.query.sort]: req.query.order}).limit(req.query.limit).exec();
    res.json(posts);
  } else {
    const posts = await query.exec();
    res.json(posts);
  }
};

exports.getPost = async (req, res) => {
  const id = req.params.id;
  // const post = data.find((d) => d.id === id);
  // if (post) {
  //   res.status(200).json(post);
  // } else {
  //   res.sendStatus(404);
  // }
  // console.log({id});
  const post = await Post.findById(id);
  res.status(200).json(post);
};

exports.createPost = (req, res) => {
  // data.push(req.body);
  const post = new Post(req.body);
  post.save().then(doc => {
    console.log(doc);
    res.status(201).json(doc);
  }, err => {
    console.log(err);
    res.status(400).json(err);
  });
};

exports.editPost = async (req, res) => {
  const id = req.params.id;
  try{
    const post = await Post.findOneAndReplace({_id: id}, req.body);
    res.status(201).json(post); 
  } catch(err) {
    res.status(400).json(err);
  }
};

exports.editPostByField = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Post.findOneAndUpdate({_id:id}, req.body, {new: true});
    res.status(201).json(doc);
  } catch(err) {
    res.status(400).json(err);
  }
};

exports.deletePost = async (req, res) => {
  const id = req.params.id;
  try{
    const doc = await Post.findOneAndDelete({_id: id});
    res.status(201).json(doc);
  } catch(err) {
    res.status(400).json(err);
  }
};
