function setCookie(res, token) {
  const expires = new Date(Date.now() + 10 * 1000);

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

module.exports = setCookie;
