const Item = require('../../schemas/DashItemSchema');
const Dashboard = require('../../schemas/DashPropertiesSchema');

const router = require('express').Router();

router.post('/new', (req, res) => {
    new Dashboard({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image || '',
    })
    .save().then(()=> {
        console.log('Dashboard saved');
        res.redirect('/all.html');
    })
})

router.post('/new/:id/item', (req, res) => {
    new Item({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image || '',
        link: req.body.link,
        dashId: req.params.id,
    })
    .save().then(()=> {
        console.log('Item saved');
        res.redirect('/');
    })
})

router.post('/:id', (req, res) => {
    Dashboard.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image || '',
    }).then(()=> {
        console.log('Dashboard updated');
        res.redirect('/');
    }).catch(err => {
        console.log(err);
        res.redirect('/all.html');
    })
})

router.delete('/item/:id', (req, res) => {
    Item.deleteOne({_id: req.params.id}).then(()=> {
        console.log('Item deleted');
        res.redirect('/');
    })
})

router.delete('/:id', (req, res) => {
    Dashboard.deleteOne({_id: req.params.id}).then(()=> {
        console.log('Dashboard deleted');
    })
    Item.deleteMany({dashId: req.params.id}).then(()=> {
        console.log('Items deleted');
    })
    res.status(200).send();
})

router.get('/:id/items', (req, res) => {
    Item.find({dashId: req.params.id}).exec((err, items)=> {
        console.log('got items');
        res.json(items);
    })
})

router.get('/all', (req, res) => {
    Dashboard.find({}).exec((err, dashboards)=> {
        console.log('got all dashboards');
        res.json(dashboards.map(dashboard => {
                return {
                    id: dashboard._id,
                    title: dashboard.title,
                    description: dashboard.description,
                    image: dashboard.image,
                }
            })
        );
    })
})

router.get('/:id', (req, res) => {
    try{
            Dashboard.findById(req.params.id).exec((err, dashboard)=> {
            console.log('got dashboard by id');
            if(!dashboard) return res.redirect('/all.html');
            res.json({
                id: dashboard._id,
                title: dashboard.title,
                description: dashboard.description,
                image: dashboard.image,
            });
        })
    }catch(err) {
        console.log(err);
        res.redirect('/all.html');
    }
})

module.exports = router;