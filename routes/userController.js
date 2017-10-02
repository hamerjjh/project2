const express = require('express')
const router = express.Router({ mergeParams: true })

const Schema = require("../db/schema.js");
const UserModel = Schema.UserModel;