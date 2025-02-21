module.exports = (req, res, next) => {
    if(req.isAuthenticated()) {
        if(req.user.rol!="superadmin"){
           return res.status(200).render("welcome", { user: false });
        }
        return next();
    }
    req.flash('error_msg', 'Inicie sesión');
    res.redirect('/login');
}