const router = require('express').Router()
const Item = require('../models/itemModel')

  // get all items
const getItems = (req, res, next) => {
  Item.find()
  .then(items => res.status(200).json(items))
  .catch(err => res.status(400).json("Error getting Items"))
}

//   post Items
const postItems =  async (req, res) => {
    const { name, price, image} = req.body
    const newItem = await new Item({
        name,
        price,
        image
    })

    newItem
    .save()
    .then((items) =>{
        return res.status(200).json({
          message: "Item Uploaded Successfully!",
          items
        });
    })
    .catch((error) =>{
        console.log(error);
    });
};

// show one item with Id
const showItem = (req, res, next) => {
    Item.findById(req.params.id)
      .then(item => res.json(item))
      .catch(err => res.status(400).json('Error: ' + err));
  };


// edit route
const editItem = (req, res, next) => {
    Item.findById(req.params.id, (err, foundItem) =>{
        if(err){
            console.log(err)
        } else{
            res.status(200).json(foundItem)
        }
    });
};

  //   update fleet
  const updateItem = (req, res, next) => {
    Item.findById(req.params.id)
      .then(item => {
        item.name = req.body.name
        item.image = req.body.image
        item.price = req.body.price

        item.save()
          .then((item) => res.status(200).json({
            message: 'Item updated!',
            item
          }))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  };

//   delete
const deleteItem = (req, res, next) => {
    Item.findByIdAndRemove(req.params.id)
      .then(() => res.status(200).json({
      message: 'Item deleted'
      }))
      .catch(err => res.status(400).json('Error: ' + err));
  };

router.get('/', getItems)
router.post("/", postItems);
router.get("/:id", showItem);
router.get("/edit/:id", editItem);
router.put("/:id", updateItem);
router.delete("/delete/:id", deleteItem);

module.exports = router
