const {Feed , User , Tag , FeedTag  } = require(`../models`)
class Controller{
    static home (req, res) {

    res.render(`home`, {title:`Home`})
    }
    static getFeed(req,res){
        // console.log(req.session , `<<<<< ini di controller`);
        User.findAll({
        include: [
            {
                model: Feed
            }
        ]
    })
        .then(data => {
            res.render(`feeds` , {data , title:`Feeds`})
        })
        .catch(err => {
            res.send(err)
        })

    }
    static postFeed(req,res) {
        
        let searchTag = req.body.content.split(` `)
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
            user_id: req.session.userId,
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
                const filtered = foundTag.filter(
                    function(e) {
                    return this.indexOf(e) < 0;
                    },
                    tempTag
                );
                newTag = filtered
                return Feed.findAll({
                    where: {
                        createdAt: newFeed.createdAt
                    }
                })
            })
            .then(data => {
                feedId = data[0].id
                if (newTag.length > 0){
                    newTag.forEach(e => {
                        objTag.push({name: e})
                    });
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
                    res.redirect(`/feeds`)
                }
            })
            .then(data => {
                data.forEach(el => {
                    allTagId.push(el)
                });
                allTagId.forEach(ele => {
                        objFT2.push({
                            createdAt:new Date() ,
                            updatedAt:new Date(),
                            feedID: feedId,
                            tagID: ele.id
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
    static getSearchTags(req,res){
        // res.send(`ini search tags`)
        res.render(`searchtag` , {title: `Search post By Tag`})
    }
    static postSearchTags(req,res){
        // console.log(req.body.tag.slice(1));
        let userN = []
        let tagFind = req.body.tag.slice(1)
        let feedByTags 
        let ftData = []
        Tag.findAll({
            include: Feed,
            where: {
                name:tagFind
            }
        })
            .then(data => {
                // ftData = data
                // res.send(data)
                // res.render(`feedbytag` , {data , title:`Feed By Tag`})
                feedByTags = data
                data[0].Feeds.forEach(element => {
                    ftData.push(element.user_id)
                });
                console.log(ftData);
                return User.findAll({
                    where:{
                        id:ftData
                    }
                })

            })
            .then(data => {
                // res.send(data)
                data.forEach(el => {
                    userN.push(
                        {
                            user_id: el.id,
                            username: el.username
                        }
                    )
                });
                // res.send(userN)
                res.render(`feedbytag` , { feedByTags , userN , title: `Feed By Tags`})


            })
            .catch(err => {
                res.send(err)
            })

    }
}
module.exports = Controller