const {Feed , User , Tag , FeedTag  } = require(`../models`)
class Controller{
    static home (req, res) {
    // res.send('Hello World!')
    res.render(`home`)
    

    }
    static getFeed(req,res){
        User.findAll({
        include: [
            {
                model: Feed
            }
        ]
    })
        .then(data => {
            // res.send(data)
            res.render(`feeds` , {data})
        })
        .catch(err => {
            res.send(err)
        })
    }
    static postFeed(req,res) {
        // res.send(req.body)
        // console.log(req.body);
        let newFeed = {
            user_id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        Feed.create(newFeed)
            .then(data => {
                res.redirect(`/feeds`)
            })
            .catch(err => {
                res.send(err)
            })
    }
}
module.exports = Controller