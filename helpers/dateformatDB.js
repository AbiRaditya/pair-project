function dateformat(date) {
    let year = date.getFullYear()
    let month = date.getMonth()+ 1
    let day = date.getDate() 
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    if (month < 10) {
        return `${year}-0${month}-${day} ${hours}:${minutes}:${seconds}`
        
    }else{
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }
}
module.exports = dateformat