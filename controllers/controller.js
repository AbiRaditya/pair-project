const {Feed , User , Tag , FeedTag  } = require(`../models`)
class Controller{
    static home (req, res) {
    res.send('Hello World!')
    // res.render(`home`)
    

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
}
module.exports = Controller