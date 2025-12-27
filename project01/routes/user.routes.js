const express = require('express');

const {
    handleGetAllUsers,
    handleCreateUser,
    handleGetUserByID,
    handlePatchUser,
    handleDeleteUser
} = require('../controllers/user.controller.js');

const Router = express.Router();

Router.route('/')
    .get(handleGetAllUsers)
    .post(handleCreateUse)

Router.route('/:id')
    .get(handleGetUserByID)
    .patch(handlePatchUser)
    .delete(handleDeleteUser);

module.exports = Router;