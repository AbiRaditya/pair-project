const {Feed , User , Tag , FeedTag , FeedUser } = require(`../models`)
class Controller{
    static home (req, res) {
    // res.send('Hello World!')
    // res.render(`home`)
    Feed.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })

    }
}
module.exports = Controller