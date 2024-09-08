const mongoose = require("mongoose")


const productModel = require('../Models/ProductSchema');
const addproduct = async (req, res) => {
    try {
      const addproduct = await productModel.create(req.body)
      res.status(201)
        .json({
          message: "Signup successfully",
          status:"success",
          success: true,
          data:{addproduct}
        })

    }
    catch (err) {
      res.status(500)
        .json({
          message: "Internal server errror",
          success: false
        })
    }
  }
  const getproduct = async (req, res) => {
    try {
      const products = await productModel.find()
      if(products?.length > 0){
        res.status(201)
        .json({
          message: "produts",
          status:"success",
          success: true,
          results:products.length,
          data:{products}
        })
      }
     

    }
    catch (err) {
      res.status(500)
        .json({
          message: "Internal server errror",
          success: false
        })
    }
  }
  
module.exports = {
    addproduct,getproduct
  }