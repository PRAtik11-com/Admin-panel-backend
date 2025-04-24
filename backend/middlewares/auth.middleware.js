const auth = (req, res, next) => {
  const { role, password  } = req.body || req.query
 
  if (role === "admin" && password  === "saveEarth") {
    next();
  } else {
    res.status(403).json({ message: "Not Authorized" });
  }
}

module.exports = auth;
