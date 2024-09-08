const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");


const ProductSchema = new mongoose.Schema(

    {
        name: {

            type: String,

            required: true,

        },

       price: {

            type: String,
            required: true,
            

        },

        category: {

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

const productModel = mongoose.model("products", ProductSchema) //(collection name,schema name) // this will create collectuion with this sname

module.exports = productModel
