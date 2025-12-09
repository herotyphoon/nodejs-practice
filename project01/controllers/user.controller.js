const User = require('../models/user.model.js');

async function handleGetAllUsers(req, res) {
    const allDBUsers = await User.find({});
    return res.json(allDBUsers);
}

async function handleCreateUser(req, res) {
    const body = req.body;
    const searchValidation = !body || !body.first_name || !body.email || !body.gender || !body.job_title
    if (searchValidation) res.status(400).send(JSON.stringify({error: 'Please fill all fields'}));
    const addUser = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });
    return res.status(201).json({msg: 'User Created Successfully'});
}

async function handleGetUserByID(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
}

async function handlePatchUser(req, res) {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json({ msg: 'User Updated Successfully' });
    } catch (err) {
        return res.status(400).json({ error: 'User not found' });
    }
}

async function handleDeleteUser(req, res) {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({ msg: 'User Delete Successfully' });
    } catch (err) {
        return res.status(400).json({ error: 'User not found' });
    }
}

module.exports = {
    handleGetAllUsers,
    handleCreateUser,
    handleGetUserByID,
    handlePatchUser,
    handleDeleteUser
};