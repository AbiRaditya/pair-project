const {Feed , User , Tag , FeedTag  } = require(`../models`)
class Controller{
    static home (req, res) {

    // res.send('Hello World!')
    res.render(`home`, {title:`Home`})
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
            res.render(`feeds` , {data , title:`Feeds`})
        })
        .catch(err => {
            res.send(err)
        })

    }
    static postFeed(req,res) {
        // res.send(req.body)
        // console.log(req.body);
        // 
        let searchTag = req.body.content.split(` `)
        // console.log(req.body.content.split(` `));
        let foundTag = []
        let tempTag = []
        let newTag = []
        let objTag = []
        let objFT = []
        let objFT2 = []
        let allTagId = []
        let flag = false
        let feedId
        searchTag.forEach(element => {
            if (element[0] === `#`) {
                foundTag.push(element.slice(1))
            }
        });
        // console.log(foundTag);
        let tagId = []
        let newFeed = {
            user_id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        Feed.create(newFeed)
            .then(data => {
                if (foundTag.length === 0) {
                    res.redirect(`/feeds`)
                    
                }else{
                    return Tag.findAll({
                        where:{
                            name: foundTag
    
                    }})

                }
            })
            .then(data => {
                
                data.forEach(element => {
                    tagId.push(element.id)
                    tempTag.push(element.name)
                });
                // res.send(data)
                // console.log(data);
                // console.log(foundTag);
                const filtered = foundTag.filter(
                    function(e) {
                    return this.indexOf(e) < 0;
                    },
                    tempTag
                );
                // res.send(filtered)
                newTag = filtered
                // console.log(newTag);
                return Feed.findAll({
                    where: {
                        createdAt: newFeed.createdAt
                    }
                })
            })
            .then(data => {
                // res.send(data)
                feedId = data[0].id
                if (newTag.length > 0){
                    // Tag.bulkCreate
                    newTag.forEach(e => {
                        objTag.push({name: e})
                    });
                    console.log(objTag,`<<<<<<<<<<<<<<<<<<<<< INI`);
                    return Tag.bulkCreate(objTag)
                }else{
                    flag = true
                    tagId.forEach(el => {
                        objFT.push({
                            createdAt:new Date() ,
                            updatedAt:new Date(),
                            feedID: feedId,
                            tagID: el
                        })
                    });
                    console.log(objFT);
                    return FeedTag.bulkCreate(objFT)
                }
            })
            .then(data => {
                if (!flag){

                    return Tag.findAll({
                            where:{
                                name: foundTag
        
                        }})
                }else{
                    console.log(`line 125`);
                    res.redirect(`/feeds`)
                }
            })
            .then(data => {
                data.forEach(el => {
                    allTagId.push(el)
                });
                allTagId.forEach(el => {
                        objFT2.push({
                            createdAt:new Date() ,
                            updatedAt:new Date(),
                            feedID: feedId,
                            tagID: el
                        })
                    });
                    return FeedTag.bulkCreate(objFT2)
            })
            .then(data => {
                res.redirect(`/feeds`)
            })
            .catch(err => {
                res.send(err)
            })
    }
}
module.exports = Controller