var express = require('express');
var router = express.Router();
var Inventory = require('../models/inventory.js');

/* GET home page. */
router.get('/allInventory', function (req, res, next) {
  Inventory.find({}, function(err, inventory) {
    if (!err){
      console.log(inventory);
      res.json(inventory);
    } else {throw err;}
  });
});

router.post('/addInventory', function(req, res, next) {
  console.log(req.body.upc);

  var upc = req.body.upc;
  var location = req.body.location;
  Inventory.find({ upc: upc, location: location }, function (err, inventory) {
    if (err) {
      console.log("error");
    } else {
      console.log(inventory);
      if(inventory.length === 0){
        // create a new user
        var newInventory = Inventory({
          upc: upc,
          location: location
        });

        // save the user
        newInventory.save(function(err) {
          if (err) throw err;

          console.log('Inventory created!');
        });
      } else {
        Inventory.findByIdAndUpdate(inventory[0]._id, { $inc: { qty: 1 }})
        .exec(function(err, inv) {
          if (err) {
            throw err;
          }
          else {
            console.log(inv);
          }
        });
      }
    }
  })
  res.send("hi");
});

module.exports = router;
