const tokenService = require("./token");

const securityService = {

    isConnected(req,res,next){
        res.locals.user = tokenService.decode(req);
        if(!res.locals.user){
            console.log(req.url);
            next(new Error("Vous devez être authentitifié"));
        }
        else{
            next();
        }
    }
};

module.exports = securityService;
