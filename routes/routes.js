// Router - route.js
// Imports modules
const express = require('express');
const router = express.Router();
const Breadcrumb_ = require('../public/javascripts/breadcrumb/breadcrumb.js');

// middleware that is specific to this router
router.get('/', function (req, res) {
    // Get location
    let Breadcrumb = new Breadcrumb_();
    Breadcrumb.setBreadcrumb(req.path);
    res.render('onboarding/index', { breadcrumb: Breadcrumb.data.location, current_path: req.path });
});

// Define route to access on dashboard
router.get('/dashboard', function (req, res) {
    // Get location
    let Breadcrumb = new Breadcrumb_();
    Breadcrumb.setBreadcrumb(req.path);
    res.render('dashboard/index', { breadcrumb: Breadcrumb.data.location, current_path: req.path });
});

// Redirect to dashboard or login if user is not logged in
router.get('*', function (req, res) {
    // TODO check user with cookie ??
    res.redirect('/');
});

module.exports = router;
