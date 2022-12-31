/* 
  if there is an error thrown in the DB, asyncMiddleware
  will pass it to next() and express will handle the error */
import raw from "../../middleware/route.async.wrapper.mjs";
import user_model from "./user.model.mjs";
import express from 'express';
import log from '@ajar/marker';
import joi from 'joi';




const router = express.Router();

// parse json req.body on post routes
router.use(express.json())
const schema = joi.object({
  first_name: joi.string().alphanum()
  .min(3)
  .max(10)
  .required(),
  last_name: joi.string().alphanum()
  .min(3)
  .max(10)
  .required(),
  email:joi.string().email().required() ,
  phone:joi.string().pattern(new RegExp('^[0-9]{10}$')).required()
})

// CREATES A NEW USER
// router.post("/", async (req, res,next) => {
//    try{
//      const user = await user_model.create(req.body);
//      res.status(200).json(user);
//    }catch(err){
//       next(err)
//    }
// });

// CREATES A NEW USER
router.post("/", raw( async (req, res) => {
    // const user = await user_model.create(req.body);
    const user = await schema.validateAsync(req.body);
    res.status(200).json(user);
}) );

// for pagination http://localhost:3030/api/users/?page=3&items=10
// GET ALL USERS
router.get( "/",raw(async (req, res) => {
  const page = req.query.page;
  const items = req.query.items;
    const users = await user_model.find()
                                  .select(`-_id
                                          first_name 
                                          last_name
                                          email 
                                          phone`).skip(Number(items)).limit(Number(page));
  console.log(page, items)
 res.status(200).json(users);
    
  })  
);

//http://localhost:3030/query?name=peleg&color=blue
router.get('/query', (req, res) => {
  res.status(200).json(req.query.name)
})


// GETS A SINGLE USER
router.get("/:id",raw(async (req, res) => {
    const user = await user_model.findById(req.params.id)
                                    // .select(`-_id 
                                    //     first_name 
                                    //     last_name 
                                    //     email
                                    //     phone`);
    if (!user) return res.status(404).json({ status: "No user found." });
    res.status(200).json(user);
  })
);
// pagination. the url will be: 

// UPDATES A SINGLE USER
router.put("/:id",raw(async (req, res) => {
    const user = await user_model.findByIdAndUpdate(req.params.id,req.body, 
                                                    {new: true, upsert: true }).select(`-_id 
                                                      first_name 
                                                   last_name 
                                                      email
                                                        phone`);
    // const check_user = await schema.validateAsync(user);
    console.log(user);
    res.status(200).json(user);
  })
);


// DELETES A USER
router.delete("/:id",raw(async (req, res) => {
    const user = await user_model.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).json({ status: "No user found." });
    res.status(200).json(user);
  })
);


export default router;
