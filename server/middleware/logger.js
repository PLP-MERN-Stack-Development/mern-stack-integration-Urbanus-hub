const logger=(req,res,next)=>{
 
    try {
        console.log(`path: ${req.path} visited by ${req.user._id , req.user.role} at ${new Date().toLocaleString()}`);
        next()
    } catch (error) {
        next(error)
    }


}

export default logger;