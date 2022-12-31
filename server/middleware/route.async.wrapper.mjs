
export default fn => (req, res, next) => fn(req, res, next).catch(next);


// export default fn => (req, res, next) => {
//       fn(req,res,next).catch(next);
// };
//  .catch((err)=> next(err))

// export default fn => (req, res, next) => {
//       fn(req,res,next).catch((err)=>{
//           if(err.status) next(err);
//           else next(new HttpException(500,'something went wrong...'))
//       });
// };

// // CREATES A NEW USER
// router.post("/", raw( async (req, res, next) => {
//     //look for existing user...
//     //if user exist - throe 400 error
//     throw new BadRequest(400,'user already exist');
//     const user = await user_model.create(req.body);
//     res.status(200).json(user);
// }) );