const user = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  // req.isLoggedIn=true;//this req is dead after sending response 
  //res.setHeader('Set-Cookie', 'isLoggedIn:true;Max-age=100;Domaine=domane;Secure;HttpOnly')//a voir les autres options
  user.findById('6320570c365690d10f9ccff3')
  .then(user => {
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save(err => {
      console.log(err);
      res.redirect('/');
    });
  })
  .catch(err => console.log(err));
}

exports.postLogout=(req,res,next)=>{
  console.log("ici")
  req.session.destroy(()=>{
    res.redirect('/')
  });
}