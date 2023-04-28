const ActiveUser = require('../models/activeUser_model');
const utility_functions = require('../utilities/utility_functions');

const setActiveUser = async (req, res) => {
  console.log(`Function name: ${utility_functions.returnFuncName()}\n${req.body}\n`);
  try {
    ActiveUser.create({
      identifier: req.body.identifier,
      username: req.body.username,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      profilePicture: req.body.profilePicture,
      age: req.body.age,
      friends: req.body.friends,
      following: req.body.following,
      savedEvents: req.body.savedEvents,
      joinedEvents: req.body.joinedEvents
    })
    res.json(req.body);
    res.status(201);
  } catch (error) {
    console.log(`Error message for function: ${utility_functions.returnFuncName()}\n${error}\n`);
    res.status(400);
  }
};

const getActiveUser = async (req, res) => {
  try {
    const activeUser = await ActiveUser.find({});
    console.log('activeuser', activeUser);
    if (activeUser.length != 0) {
      res.json(activeUser[0]);
    } else {
      res.json(false)
    }
    res.status(201);
  }
  catch (error) {
    // res.json(false)
    console.log(`Error message for function: ${utility_functions.returnFuncName()}\n${error}\n`);
    res.status(400);
  }
}

const deleteActiveUser= async(req, res) => {
  console.log('delete', req.body.username)
  try{
    await ActiveUser.findOneAndRemove({username: req.body.username});
    res.json(req.body);
    res.status(201);
  }
  catch (error) {
    console.log(`Error message for function: ${utility_functions.returnFuncName()}\n${error}\n`);
    res.status(400);
  }
}

module.exports = {
  setActiveUser,
  getActiveUser,
  deleteActiveUser
};
