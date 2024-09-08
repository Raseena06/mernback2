const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");


const UserSchema = new mongoose.Schema(

    {
        name: {

            type: String,

            required: true,

        },

        email: {

            type: String,
            required: true,
            unique: true

        },

        password: {

            type: String,
            required: true,

            // default: 8

        },
       

    },

    

    // ---It is a standard practice to have timestamps(createdAt & updatedAt) field for each document inserted into the collection.

    {

        timestamps: {

            createdAt: true,

            updatedAt: true

        }

    }

)

const userModel = mongoose.model("users", UserSchema) //(collection name,schema name) // this will create collectuion with this sname

module.exports = userModel
