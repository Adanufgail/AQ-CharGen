var express = require('express');
var router = express.Router();
var partListModel = require('../models/partListModel.js');

/* 
 * GET LIST BY NAME
 */

async function getPartListByName (req, res, next)
{
    let findPartList
    try
    {
        findPartList = await partListModel.find({name: req.params.listName}).exec();
        if(findPartList.length == 0)
        {
            return res.status(404).json({message: "Cannot find partlist "+req.params.listName});
        }
    }
    catch(err){res.status(500).json({message: err.message})}
    res.specificPartList = findPartList;
    next();
}

module.exports = router;

/* 
 * GET ALL LISTS
 */

router.get('/', async (req, res) =>
{
    try
    {
        const partListsAll = await partListModel.find();
        res.json(partListsAll);
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
})

/* 
 * CREATE LIST
 */

router.post('/', async (req, res) =>
{
    const newPartList = new partListModel({
        name: req.body.name,
        path: req.body.path,
        owner: "0",
        public: true
    });
    try
    {
        const savePartList = await newPartList.save();
        res.status(201).json(savePartList);
    }
    catch(err){res.status(400).json({message: err.message})}
})

/* 
 * LOAD LIST
 */

router.get('/:listName', getPartListByName, (req, res) =>
{
    console.log("DEBUG: "+res.specificPartList);
    res.json(res.specificPartList);
})

/* 
 * UPDATE LIST
 */

router.patch('/', async (req, res) =>
{
    
})

/* 
 * DELETE A LIST
 */

router.delete('/:listName', getPartListByName, async (req, res) =>
{
    console.log(res.specificPartList);
    try
    {
        await res.specificPartList.deleteOne();
        res.json({message: "Deleted partlist "+res.specificPartList.name})
    }
    catch(err){res.status(500).json({message: err.message})}
})