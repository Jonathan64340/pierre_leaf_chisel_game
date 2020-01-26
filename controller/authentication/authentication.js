const MongoClient = require('mongodb').MongoClient;
const brcypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class Authentication {
    constructor() {

        // First login to db
        const uri = process.env.DB_CONN;
        this.client = new MongoClient("mongodb+srv://domjon64:7qGdLVXlbYUyNYOg@game-kattu.mongodb.net", { useNewUrlParser: true, userUnifiedTopology: true });
        this.connectionReady = true;
        
    };

    doLogin(user='', password='') {
        return new Promise((resolve, reject) => {
            // Connect to DB
            if(user.length > 1 && password.length == 0 && this.connectionReady) {
                this.client.connect(err => {
                    console.log(this.client)
                    const collection = this.client.db("game").collection("users");
                    // perform actions on the collection object
                    collection.findOne({ 'username': user }, function (err, user) {
                        if(user !== null) {
                            resolve({ 'user': user, 'user_exist': true });
                        } else {
                            console.log('Reject ligne 25')
                            reject({ 'user_exist': false });
                        };
                    });

                    if(err) {
                        console.log('Reject ligne 32')
                        this.client.close();
                        reject(err);
                    };
                }); 
            } else {
                let that = this;
                this.client.connect(err => {
                    const collection = this.client.db("game").collection("users");
                    // perform actions on the collection object
                    collection.findOne({ 'username': user }, async function (err, user) {
                        if(user !== null) {
                            console.log(password, user.password)
                            await brcypt.compare(password, user.password, err)
                            .then(usr => {
                                // resolve({ 'user': user, 'user_exist': true });
                                    if(usr) {
                                        resolve({ validCredentials: usr, access_token: that.generateJWTToken(user) });
                                    } else {
                                        resolve({ validCredentials: usr });
                                    }
                                })
                                .catch(err => {
                                    console.log('Reject ligne 53')
                                    reject(err);
                                })
                        } else {
                            console.log('Reject ligne 56')
                            reject({ 'user_exist': false });
                        };
                    });

                    if(err) {
                        this.client.close();
                        console.log('Reject ligne 64')
                        reject(err);
                    };
                }); 
            }
            
        });
       
    };

    doRegister(userData) {
        let that = this;
        return new Promise((resolve, reject) => {
            // Connect to DB
            if(this.connectionReady) {
                this.client.connect(err => {
                    const collection = this.client.db("game").collection("users");
                    // perform actions on the collection object
                    collection.insertOne(userData)
                        .then(isRegistered => {
                            // console.log(isRegistered)
                            console.log(isRegistered.insertedId)
                            const newUser = Object.assign({}, { isRegistered, id_: isRegistered.insertedId })
                            resolve({newUser, access_token: that.generateJWTToken(userData)})
                        })
                        .catch(err => {
                            reject(err)
                        });
                });
            }
        });
    };

    generateJWTToken(userData) {
        return jwt.sign(userData, process.env.SECRET_KEY);
    };

    verifyJWTToken(req, res, next) {
        const bearerHeader = req.headers['x-access-token'] || req.headers['authorization'];
        console.log('headers ********', req.headers)

        if (bearerHeader) {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;

            jwt.verify((req.token), process.env.SECRET_KEY, function (err, decoded) {
                if(err) {
                    res.sendStatus(401);
                }
            })

            next();
          } else {
            // Forbidden
            res.sendStatus(401);
          }
    };

};

module.exports = Authentication;