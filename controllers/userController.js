// Note: You have to edit only this file
const User = require('../models/userModel');

// Registering user into database
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Failed to create user', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Get User From a Particular id
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    console.error('Failed to get user details', err);
    res.status(500).json({ error: 'Failed to get user details' });
  }
};

// Updating User
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    user.set(req.body);
    await user.save();
    res.json({ message: 'User details updated successfully' });
  } catch (err) {
    console.error('Failed to update user details', err);
    res.status(500).json({ error: 'Failed to update user details' });
  }
};

// Deleting User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    await user.remove();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Failed to delete user', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = { createUser, getUser, updateUser, deleteUser };
