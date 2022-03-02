module.exports = (req,res,next)=>{
    if(!req.session.isLoggedIn){
        console.log("Authentication failed")
        return res.redirect('/admin/login');
    }
    next();
}