const MongoClient = require('mongodb').MongoClient;

class Authentication {
    constructor() {

        // First login to db
        const uri = process.env.DB_CONN;
        this.client = new MongoClient(uri, { useNewUrlParser: true, userUnifiedTopology: true });
        
    };

    doLogin(user='', password='') {
        return new Promise((resolve, reject) => {
            // Connect to DB
            this.client.connect(err => {
                const collection = this.client.db("game").collection("users");
                // perform actions on the collection object
                collection.findOne({ 'username': user }, function (err, user) {
                    if(user !== null) {
                        resolve({ 'user': user, 'user_exist': true });
                    } else {
                        reject({ 'user_exist': false });
                    };
                });

                if(err) {
                    console.log('error de connexion')
                    this.client.close();
                    reject(err);
                };
            });
        });
       
    };

    doRegister(user='', password='') {

    };

};

module.exports = Authentication;