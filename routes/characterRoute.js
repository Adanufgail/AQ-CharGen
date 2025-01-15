var express = require('express');
var router = express.Router();
var characterModel = require('../models/characterModel.js');

/* 
 * GET CHARACTER BY NAME
 */

async function getCharacterByName (req, res, next)
{
    let findCharacter
    try
    {
        findCharacter = await characterModel.find({name: req.params.characterName}).exec();
        if(findCharacter.length == 0)
        {
            return res.status(404).json({message: "Cannot find character "+req.params.characterName});
        }
    }
    catch(err){res.status(500).json({message: err.message})}
    res.specificCharacter = findCharacter;
    next();
}

module.exports = router;

/* 
 * GET ALL CHARACTERS
 * http://URL/character/
 */

router.get('/', async (req, res) =>
{
    try
    {
        const charactersAll = await characterModel.find();
        res.json(charactersAll);
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
})

/* 
 * CREATE CHARACTER
 */

router.post('/', async (req, res) =>
{
    const newCharacter = new characterModel({
        name: req.body.name,
        path: req.body.path,
        owner: "0",
        public: true
    });
    try
    {
        const saveCharacter = await newCharacter.save();
        res.status(201).json(saveCharacter);
    }
    catch(err){res.status(400).json({message: err.message})}
})

/* 
 * LOAD CHARACTER
 */

router.get('/:characterName', getCharacterByName, (req, res) =>
{
    console.log("DEBUG: "+res.specificCharacter);
    res.json(res.specificCharacter);
})

/* 
 * UPDATE CHARACTER
 */

router.patch('/', async (req, res) =>
{
    
})

/* 
 * DELETE A CHARACTER
 */

router.delete('/:characterName', getCharacterByName, async (req, res) =>
{
    console.log(res.specificCharacter);
    try
    {
        await res.specificCharacter.deleteOne();
        res.json({message: "Deleted character "+res.specificCharacter.name})
    }
    catch(err){res.status(500).json({message: err.message})}
})