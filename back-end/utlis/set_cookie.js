function setCookie(res, token) {
  const expires = new Date(Date.now() + 10 * 1000);


  // http true means only acces server not a client side  and secure false if not a production mode set in a best practice otherwise proper work in a true mode
  res.cookie("token", token, {
    
    httpOnly: true,  
    secure: true,
    maxAge: 3600 * 1000, // 1 hour in milliseconds
  });

  res.cookie("isAuth", token, {
    httpOnly: false,
    secure: false,
    maxAge: 3600 * 1000, // 1 hour in milliseconds
  });
}





// res.cookie("token", token, {
//   httpOnly: false,
//   expires: expires,
//   secure: false, // Should be true in production with HTTPS
// });


module.exports = setCookie;
