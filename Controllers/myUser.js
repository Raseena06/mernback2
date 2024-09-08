const userModel = require('../Models/userSchema');

exports.Home = async (req, res, next) => {

    //   res.send('<h1>welcome</h1>')

    console.log(req.body);

    res.send('<h1>Hello ' + req.body.name + ' added</h1>')

}




exports.about = async (req, res, next) => {

    res.send('<h1>about hii</h1>')


}




exports.getUsersNameTestCookie1 = async (req, res, next) => {

    res.cookie('name',req.params.name);

    res.send('<p>cookie set <a href="/user">view here </a>')




}

exports.getUsersNameTestCookie2 = async (req, res, next) => {

  

     res.send(req.cookies.name)

     // notworking here

}

// ee11356fa1de4ee9b7e818b9a271c17c 

// https://opencagedata.com/api#

