modue.exports = class Status {
    constructor(status) {
        this.status = status;
        this.remainingTurns = null;
    }

    apply() {
        switch (this.status) {
            case "paralyzed":
                return this.para();

            case "burn":
                return this.burn();

            case "freeze":
                return this.freeze();

            case "sleep":
                return this.sleep();

            case "poison1":
                return this.poison(0)

            case "poison2":
                return this.poison(1)
        }
    }

    poison(deg) {

    }
    para() {

    }
    sleep() {

    }
    burn() {

    }
    freeze() {

    }

    fixStatus(status){
        switch (status) {
            case "paralyzed":
                return 

            case "burn":
                return 

            case "freeze":
                return 

            case "sleep":
                return 

            case "poison1":
                return 

            case "poison2":
                return 
        }
    }
}