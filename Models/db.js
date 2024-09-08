const mongoose = require('mongoose');
const mongo_url="mongodb+srv://waytoraseena:RQaKonMssQn9OMQQ@cluster0.wk9tq.mongodb.net/auth_db?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongo_url)
.then(()=>{
    console.log("mongodb connecteddd")
}).catch(err=> {
    console.log("mongodb not connecteddd error",err)
})