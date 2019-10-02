module.exports = async function (req, res, proceed) {

    // If `req.user` is set
    if (req.user) {
      return proceed();
    }
  
    //--•
    // Otherwise, this request did not come from a logged-in user.
    return res.forbidden();
  
  };