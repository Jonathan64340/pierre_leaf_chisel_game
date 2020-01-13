// Router - route.js
// Imports modules
const express = require('express');
const router = express.Router();
const Breadcrumb_ = require('../public/javascripts/breadcrumb/breadcrumb.js');

// middleware that is specific to this router
router.get('/', function (req, res) {
    let Breadcrumb = new Breadcrumb_();
    Breadcrumb.setBreadcrumb(req.path);
    res.render('onboarding/index', { breadcrumb: Breadcrumb.data.location });
});

// Define route to acces profile user
router.get('/profile', function (req, res) {
     res.send('Vous devez être connecté !');
});

module.exports = router;
