// Router - route.js
// Imports modules
const express = require('express');
const router = express.Router();
const Breadcrumb_ = require('../public/javascripts/breadcrumb/breadcrumb.js');
const url = require('url');
const Authenticate = require('../controller/authentication/authentication.js');
const bcrypt = require('bcryptjs');

// middleware that is specific to this router
router.get('/', function (req, res) {
    // Get location
    let Breadcrumb = new Breadcrumb_();
    Breadcrumb.setBreadcrumb(req.path);

    res.render('onboarding/index', { breadcrumb: Breadcrumb.data.location, current_path: req.path });
    
});

// Define route to access on dashboard
router.get('/dashboard', function (req, res) {
    // Check user before redirect
    // Get location
    let Breadcrumb = new Breadcrumb_();
    Breadcrumb.setBreadcrumb(req.path);
    res.render('dashboard/index', { breadcrumb: Breadcrumb.data.location, current_path: req.path });
});

// Define route to logout user
router.get('/api/logout', function (req, res) {
    // Get location
    let Breadcrumb = new Breadcrumb_();
    Breadcrumb.setBreadcrumb(req.path);
    
    res.render('onboarding/index', { breadcrumb: Breadcrumb.data.location, current_path: req.path, action: 'logout' });
});

// Authenticate user
router.post('/api/login', function (req, res) {
    return new Promise((resolve, reject) => {
        // Get username
        let parse_url = url.parse(req.url, true);
        let query = parse_url.query['user'].toString();

        console.log(parse_url.query)
        let query_password = '';
        if(parse_url.query['password']) {
            query_password = parse_url.query['password'].toString();
        }
    
        // Call controller to verify if user exist or not and call action
        let auth = new Authenticate();
        if(typeof query === 'string') {
            auth.doLogin(query, query_password)
            .then(user => {
                        resolve(user);
                        res.send(user);
                })
                .catch(err => {
                    reject(err);
                    res.sendStatus(404);
                });
        };

    });
});

// Authenticate user
router.post('/api/register', function (req, res) {
    return new Promise((resolve, reject) => {
        const userData = {};
        bcrypt.hash(req.body.params.password, 10)
            .then(passwordHash => {
                let auth = new Authenticate();
                Object.assign(userData, { username: req.body.params.user, password: passwordHash, avatar_url: req.body.params.avatar_url });
                console.log(userData)
                   // Call controller to verify if user exist or not and call action
                auth.doRegister(userData)
                .then(userRegistered => {
                    console.log(userRegistered)
                    res.sendStatus(200);
                    })
                    .catch(err => {
                        reject(err);
                        res.sendStatus(500);
                    });
            })
            .catch(err => {
                console.log(err);
            });
     
    });
});

// Define route to return JWT Token to pass bearer on request
router.post('/api/access_token', function (req, res) {
    return new Promise((resolve, reject) => {
        // Call controller to verify if user exist or not and call action
        let auth = new Authenticate();
        auth.doLogin(req.body.username)
                .then(user => {
                        if(user.user_exist) {
                            resolve(user);
                            res.sendStatus(200);
                        };
                        console.log('utilisateur authentifié !')
                    })
                    .catch(err => {
                        reject(err);
                        console.log('utilisateur non authentifié !')
                        res.sendStatus(401);
                    });
    });
    
});

// Redirect to dashboard or login if user is not logged in
router.get('*', function (req, res) {
    // TODO check user with cookie ??
    res.redirect('/');
});

module.exports = router;
