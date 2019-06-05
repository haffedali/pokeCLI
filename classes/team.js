//create a class that takes in 3 mon as an argument and builds an array based on that
module.exports = class Team{
    constructor(mon1, mon2, mon3){
        this.team = [...mon1, ...mon2, ...mon3]
    }
}