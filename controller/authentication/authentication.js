const MongoClient = require('mongodb').MongoClient;

class Authentication {
    constructor() {
        
    };

    doLogin(user='', password='') {
        return new Promise((resolve, reject) => {
            // Connect to DB
            const uri = "mongodb+srv://domjon64:I3iUTp7j7L8SzuRZ@game-kattu.mongodb.net";
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            client.connect(err => {
                const collection = client.db("game").collection("users");
                // perform actions on the collection object
                collection.findOne({ 'username': user }, function (err, user) {
                    if(user !== null) {
                        resolve({ 'user': user, 'user_exist': true });
                    } else {
                        reject({ 'user_exist': false });
                    };
                });

                if(err) {
                    client.close();
                    reject(err);
                };
            });
        });
       
    };

    doRegister(user='', password='') {

    };

};

module.exports = Authentication;