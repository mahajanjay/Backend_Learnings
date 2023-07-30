const model = require('../model/user');
const User = model.User;

exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
  };
  
exports.getUser = async (req, res) => {
    const id = req.params.id;
    // const post = data.find((d) => d.id === id);
    // if (post) {
    //   res.status(200).json(post);
    // } else {
    //   res.sendStatus(404);
    // }
    // console.log({id});
    const user = await User.findById(id);
    res.status(200).json(user);
  };
  
  exports.editUser = async (req, res) => {
    const id = req.params.id;
    try{
      const user = await User.findOneAndReplace({_id: id}, req.body);
      res.status(201).json(user); 
    } catch(err) {
      res.status(400).json(err);
    }
  };
  
  exports.editUserByField = async (req, res) => {
    const id = req.params.id;
    try {
      const doc = await User.findOneAndUpdate({_id:id}, req.body, {new: true});
      res.status(201).json(doc);
    } catch(err) {
      res.status(400).json(err);
    }
  };
  
  exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try{
      const doc = await User.findOneAndDelete({_id: id});
      res.status(201).json(doc);
    } catch(err) {
      res.status(400).json(err);
    }
  };
  