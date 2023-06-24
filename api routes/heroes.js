const express = require('express');
const router = express.Router();
const Hero = require('../api/models/heroes');
const Role = require('../api/models/roles')
const mongoose = require('mongoose');



//GETS ALL
router.get("/", async (req,res,next)=>{

   const result = await Hero.find();
   res.json({'heroes': result})

});

//GETS ONE BY ID
router.get("/:heroId", async (req,res,next)=>{

    const heroId = req.params._id;
    const hero = await Hero.findOne(heroId)
    res.json({hero})
 
 });


 //DELETES ONE BY ID
        router.delete("/:heroId", async (req,res,next)=>{
            const heroId = req.params._id;
            const result = await Hero.deleteOne(heroId);
            res.json({deletedCount: result.deletedCount});
        });
  

//UPDATES ONE BY ID
router.patch("/:heroId", async (req,res,next)=>{
        const heroId = req.params._id;
        const hero = await Hero.findOneAndUpdate({heroId}, req.body, {new: true});
        res.json({hero})
   });


//POST A NEW HERO
router.post("/", (req,res,next)=>{
            
    const newHero = new Hero({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        role: req.body.role
    });


    //write to database
    newHero.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Hero Saved",
            hero: {
                name: result.name,
                role: result.role,
                id: result.id,
                metadata:{
                    method: req.method,
                    hostname: req.hostname
                }
            }
        })
    })
    .catch(err =>{
        console.error(err.message);
        res.status(500).json({
            error:{
                messgae: err.message
            }
        })
    })

    });




module.exports = router