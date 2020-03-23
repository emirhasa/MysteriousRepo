// //lambda expressions

// var obj = {
//     prices : [],
//     foreach : function(callback) {
//         for(let i=0; i < this.prices.length; i++) {
//             callback(this.prices[i], i, this.prices);
//         }
//     },
//     map : function(callback) {
//         for(let i=0; i < this.prices.length; i++) {
//             this.prices[i] = callback(this.prices[i], i, this.prices);
//         }
//     },
//     print : function() {
//         this.foreach(elem => console.log(elem));
//     }
// }

// somePrices = [100, 46, 43, 99];

// obj.prices = somePrices;
// obj.foreach(curr => curr = curr - curr*0.1);
// obj.map((curr, index) => `Item ${(index+1)} discounted price: ${(curr - curr*0.1)}`);
// obj.print();

// var newObj = {
//     type : 'ter',
//     color : 'marine',
//     rate : 5
// }

// var { rate, type, color } = newObj;

// function multipleParams() {

//     console.log(arguments);

// }

// multipleParams(10, 500, 30);

//********************************************* */
//Park administration
//********************************************* */

//Administration of a small town needs data storage and reports for parks/streets.
//The town has 3 parks and 4 streets, with the option to add more
//All parks and streets have a name and a build year
//parks have number of trees in the park as well as area
//streets have lengths and sizes(tiny, small, normal, big, huge)

//2 kinds of reports:
//Park report and street report

//Park report contains:
//1. Average age for all the parks
//2. Tree density listed for each park
//3. Name of park that has more than a 1000 trees

//Street report contains:
//1. Total and average length of streets
//2. List of streets classified by size, default size is normal

let TownAdministration = {

    name : 'Pachooga',
    townID : 'P4CH00G4',
    population : 2342,
    printedReports : 0,
    streets : new Map(), 
    parks : new Map(), 

    addStreet : function(...streets) {
        for(let street of streets) 
        this.streets.set(this.streets.size + 1, street);
    },

    addPark : function(...parks) {
        for(let park of parks)
        this.parks.set(this.parks.size + 1, park);
    },

    showInfo: function() {
        //console log parks and streets
        console.log("Parks: --------------")
        if(this.parks.size > 0 ) {
            for(let [key,value] of this.parks.entries()) {
                console.log(value.about());
            }
        } else {
            console.log("No parks to show yet.")
        }

        console.log("Streets: ------------")    
        if(this.streets.size > 0) {
            for(let [key,value] of this.streets.entries()) {
                console.log(value.about());
            }
        } else {
            console.log("No streets to show yet.");
        }
    },

    removeStreet : function(streetID) {
        if(this.streets.has(streetID)) { 
            this.streets.delete(streetID) ? console.log(`Street deleted.`) : console.log(`Problem deleting street.`);
        }
        else console.log(`Couldn't find specified street.`);
    },

    removePark : function(parkID) {
        if(this.parks.has(parkID)) { 
            this.parks.delete(parkID) ? console.log(`Park deleted.`) : console.log(`Problem deleting street.`);
        }
        else console.log(`Couldn't find specified park.`);
    },

    getReport : function() {

        //ask the user what kind of report he wants
        //print the report in console
        let type = prompt('Would you like a park or street report? (Type in: park or street)');
        this.printReport(type, (successful) => {
            if(successful) {
                this.printedReports++;
            } else {
                this.getReport();
            }
        });

    },

    printReport : function(type, callback) {

        if(type === 'park') {
            //print park report
            this.printParksReport();
            callback(true);
        } else if (type === 'street') {
            this.printStreetsReport();
            //print street report
            callback(true);
        } else {
            this.printErrorMessage();
            callback(false);
        }

    },

    printParksReport : function() {

        console.log('---------------');
        console.log(`Printing parks report.`);

        let ageSum, ageAvg;
        ageSum = 0;

        for(let [key, value] of this.parks.entries()) {
            let treeDensity = value.numberOfTrees / value.area;
            console.log(`${value.name} tree density is ${treeDensity.toFixed(1)} trees per km^2.`);
            ageSum += value.getAge();
        }

        ageAvg = ageSum / this.parks.size;

        console.log(`Average age for all the parks is ${ageAvg} years.`);
        console.log(`Featured park(s) with more than a 1000 trees(Yay green Earth!): `);
        let featuredParks = Array.from(this.parks.values()).filter(park => park.numberOfTrees >= 1000);

        if(featuredParks.length > 0) {
            for(let featuredPark of featuredParks) {
                console.log(`Name: ${featuredPark.name}`);
                console.log(featuredPark.about());
            }
        } else {
            console.log(`No featured parks yet.`);
        }

        console.log(`Successfully printed report.`);
        console.log('***************');

    },

    printStreetsReport : function() {

        console.log('---------------');

        if(this.streets.size > 0) {
            let streetLengthTotal = 0, streetLengthAvg = 0;

            for(let street of streets) {
                console.log(street.about());
                streetLengthTotal += street.length;
            }

            streetLengthAvg = Math.round(streetLengthTotal / this.streets.size);
            streetLengthTotal = Math.round(streetLengthTotal);

            console.log(`The total street length is ${streetLengthTotal}m and the average street length is ${streetLengthAvg}m.`);

        } else {    
            console.log('No streets registered in the town yet.');
        }




        console.log(`Successfully printed report.`);
        console.log('***************');
    },

    printErrorMessage : function() {

        console.log('---------------');
        console.log('Error printing report. Did you specify the report type correctly? Try again.');
        console.log('***************');

    }

}

class TownElement {

    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }

    getAge() {
        return 2020 - this.buildYear;
    }

}

class Park extends TownElement {

    constructor(name, buildYear, numberOfTrees, area) {
        super(name, buildYear);
        this.numberOfTrees = numberOfTrees;
        this.area = area;
    }

    about() {
        return `${this.name} was built in ${this.buildYear}. The park has ${this.numberOfTrees} trees, and stretches on an area of ${this.area}km^2`;
    }

}

class Street extends TownElement {

    constructor(name, buildYear, length, size = 'normal') {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }

    about() {
        return `Street name: ${this.name} was built in ${this.buildYear}. Length: ${this.length}m with a ${this.size} size.`;
    }

}

park1 = new Park('Central Park', 1965, 7500, 9);
park2 = new Park('Northern Park', 2010, 676, 2);
park3 = new Park('Eastern Park', 1975, 855, 4);
park4 = new Park('Southern Park', 1975, 1005, 3);
park5 = new Park('Western Park', 1975, 985, 4);

TownAdministration.addPark(park1, park2, park3, park4, park5);

street1 = new Street('Central boulevard', 1968, 300);
street2 = new Street('Northern avenue', 2008, 500, 'small');
street3 = new Street('Eastern st.', 1975, 400, 'big');
street4 = new Street('Western avenue', 1974, 650 );

streets = [street1, street2, street3, street4];

TownAdministration.addStreet(...streets);
//TownAdministration.removePark(3);
//TownAdministration.showInfo();

TownAdministration.getReport();

