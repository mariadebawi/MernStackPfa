import Item from '../models/item.model'

const itemSerializer = data => ({
    id: data.id,
    name: data.name,
    desc: data.desc,
    quantity: data.quantity,
    quote: data.quote,
    price: data.price,
   // image : data.image
});

// Retrieve all data
exports.findAll =  (req, res) => {
    Item.find()
    .then(async data => {
        const items = await Promise.all(data.item(itemSerializer));
        res.send(items);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving items."
        });
    });
};

// Retrieve data with pagination
exports.findPagination = async (req, res) => {
    const { page = 1, limit = 5, name = "" } = req.query;

    let query = {}
      if (name && name !== "null") {
        query = { name: new RegExp(`${name}+`, "i") }
    }

    const paginated = await Item.paginate(
        query,
        {
            page,
            limit,
            lean: true,
            sort: { updatedAt: "desc" }
        }
    )
    
    const { docs } = paginated;
    const items = await Promise.all(docs.map(itemSerializer));

    delete paginated["docs"];
    const meta = paginated

    res.json({ meta, items });
};



exports.findOne = (req, res) => {
    Item.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    message: "item not found with id " + req.params.id
                });
            }
            const item = itemSerializer(data)
            res.send(item);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "item not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving item with id " + req.params.id
            });
        });
};

exports.create = (req, res) => {
    if(!req.body.name) {
         return res.status(400).send({
             message: "item name can not be empty"
         });
    }

    const item = new Item({
        name: req.body.name.trim(),
        desc: req.body.desc.trim(),
        quantity: req.body.quantity.trim(),
        price: req.body.price.trim(),
        image:req.body.image,
        quote: req.body.quote,

    });

    item.save()
    .then(data => {
        const item = itemSerializer(data)
        res.send(item);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the item."
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "item name can not be empty"
        });
    }

    Item.findByIdAndUpdate(req.params.id, {
        name: req.body.name.trim(),
        price: req.body.price,
        name: req.body.name.trim(),
        desc: req.body.desc.trim(),
        quantity: req.body.quantity,
        quote: req.body.quote,
        image:req.body.image
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "item not found with id " + req.params.id
            });
        }
        const item = itemSerializer(data)
        res.send(item);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "item not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating item with id " + req.params.id
        });
    });
};

exports.delete = (req, res) => {
  Item.findByIdAndRemove(req.params.id)
     .then(item => {
         if(!item) {
             return res.status(404).send({
                 message: "item not found with id " + req.params.id
             });
         }
         res.send({ id: req.params.id, message: "item deleted successfully!" });
     }).catch(err => {
         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
             return res.status(404).send({
                 message: "item not found with id " + req.params.id
             });
         }
         return res.status(500).send({
             message: "Could not delete item with id " + req.params.id
         });
     });
};
