const ensureAuthenticated = require('../Middlewares/Auth');
const express = require("express");
const ProductRouter = express.Router();
const { addproduct ,getproduct} = require('../Controllers/productController');

// const router = require('express').Router();

// ProductRouter.get('/', ensureAuthenticated, (req, res) => {
//     console.log('---- logged in user detail ---', req.user);
//     res.status(200).json([
//         {
//             name: "mobile",
//             price: 10000
//         },
//         {
//             name: "tv",
//             price: 20000
//         }
//     ])
// });
// ProductRouter.get('/', (req, res) => {
//     console.log('---- logged in user detail ---', req.user);
//     res.status(200).json([
//         {
//             name: "mobile",
//             price: 10000,
//             category: "Electronics"
//         },
//         {
//             name: "Tv",
//             price: 20000,
//             category: "Electronics"
//         },
//         {
//             name: "Apple",
//             price: 10,
//             category: "Fruits"
//         },
//         {
//             name: "Laptop",
//             price: 20000,
//             category: "Electronics"
//         },
//         {
//             name: "Spinach",
//             price: 10,
//             category: "Vegitable"
//         },
//         {
//             name: "Headphone",
//             price: 2000,
//             category: "Electronics"
//         }
//     ])
// });
ProductRouter.get('/getproducts',getproduct);

ProductRouter.post('/addproducts',addproduct);

module.exports = ProductRouter;