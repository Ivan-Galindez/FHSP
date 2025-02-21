module.exports = (req, res, next) => {
    if(req.isAuthenticated()) {
        if(req.user.state!="active"){
           return res.status(200).render("block", { user: false });
        }
        return next();
    }
    req.flash('error_msg', 'Inicie sesión');
    res.redirect('/login');
}