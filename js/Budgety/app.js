//BUDGET Controller
var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    Expense.prototype.calcPercentage = function(totalIncome) {
        if(totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    }

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    }

    var data = {
        allItems : {
            exp : [],
            inc : []
        },
        totals : {
            exp : 0,
            inc : 0
        },
        budget : 0,
        percentage : -1
    }

    return {

        addItem : function(type, des, val) {
            var newItem;

            //get new ID
            if(data.allItems[type].length !== 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 1;
            }
            //new item based on type
            if(type === 'exp') {
                newItem = new Expense(ID, des, val);

            } else 
                newItem = new Income(ID, des,val);
            
            //push that kind of item in the array
            data.allItems[type].push(newItem);

            return newItem;
        },

        deleteItem : function(type, id) {
            var expIds, index;

            expIds = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = expIds.indexOf(id);

            data.allItems[type].splice(index, 1);

        },

        calculateBudget : function() {

            // Calculate total income and expenses
            calculateTotal('inc');
            calculateTotal('exp');
            data.budget = data.totals.inc - data.totals.exp;

            // Calculate the percentage of income we spent
            if(data.totals.inc > 0) {
                data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
            } else {
                data.percentage = -1;
            }

        },

        calculatePercentages : function() {
            data.allItems.exp.forEach(function(cur) {
                cur.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function(cur) {
                return cur.getPercentage();
            });
            return allPerc;
        },

        getBudget : function() {

            return {
                budget: data.budget,
                totalInc : data.totals.inc,
                totalExp : data.totals.exp,
                percentage : data.percentage
            }

        },

        testing : function() {
            console.log(data);
        }

    }

})();

//UI Controller
var UIController = (function() {

    var DOMStrings = {
        inputType : '.add__type',
        inputValue : '.add__value',
        inputDescription : '.add__description',
        buttonAdd : '.add__btn',
        incomeContainer : '.income__list',
        expensesContainer : '.expenses__list',
        budgetLabel : '.budget__value',
        incomeLabel : '.budget__income--value',
        expensesLabel : '.budget__expenses--value',
        expensesPercentageLabel : '.budget__expenses--percentage',
        container : '.container',
        expensePercentages : '.item__percentage',
        dateLabel : '.budget__title--month'
    }
    
    var formatNumber = function(number) {
        //no regexp for now
        if(number === 0) return '0.00';
        var numberInt, numberDec, numberParts, separators, shift, finalInt, sign;
        

        ( number < 0 ) ? sign = '-' : sign = '';
        number = Math.abs(number);
        number = number.toFixed(2);
        number = number.toString();

        numberParts = number.split('.');
        numberInt = numberParts[0];
        numberDec = numberParts[1];

        //calculate how many thousand separators to add. this is one solution, with the formula
        finalInt = '';
        if(numberInt.length > 3) {

            separators = Math.ceil(numberInt.length / 3) -1;

            //add necessary 'shift' according to how many numbers are there before the first separator
            shift = numberInt.length % 3;
            finalInt += numberInt.substring(0, shift);
            if (shift === 0) finalInt += numberInt.substring(0, 3);

            for(var i = 1; i <= separators; i++) {
                //now add the separators as many times as we need, each time "moving" for 3 places in the original string
                //but if shift === 0 it's now 3 is to account for cases like when we need 1 separator but have 6 numbers
                finalInt += ',';
                if(shift === 0) shift = 3;
                finalInt += numberInt.substring(shift + (i-1)*3, shift + i*3);
            }

        } else {

            return sign + number;

        }

        return sign + finalInt + '.' + numberDec;
    }

    var nodelistForEach = function(list, callback) {

        for(var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }

    }

    return {

        getInput : function() {
            return {
                type : document.querySelector(DOMStrings.inputType).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
                description: document.querySelector(DOMStrings.inputDescription).value
            }
        },

        getDOMStrings : function() {
            return DOMStrings;
        },

        addListItem : function(obj, type) {

            var HTML, newHTML, element;

            //Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                HTML = `<div class="item clearfix" id="inc-%id%"><div class="item__description">
                </div>%description%<div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
            } else if(type === 'exp') {
                element = DOMStrings.expensesContainer;
                HTML = `<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div>
                        <div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">30%</div>
                        <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div></div></div>`;
            }
            
            //Replace the placeholder text with actual data
            newHTML = HTML.replace('%id%', obj.id);
            newHTML = newHTML.replace('%value%', formatNumber(obj.value));
            newHTML = newHTML.replace('%description%', obj.description);

            console.log(newHTML);
            //Insert the HTML in the DOM 
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

        },

        deleteListItem : function(type, id) {

            var itemID = type + '-' + id;
            document.querySelector('#' + itemID).remove();

        },

        clearFields : function() {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current) {
                
                current.value = null;

            });

            fieldsArr[0].focus();

        },

        displayBudget : function(obj) {

            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget);
            document.querySelector(DOMStrings.incomeLabel).textContent = '+' + formatNumber(obj.totalInc);
            document.querySelector(DOMStrings.expensesLabel).textContent = '-' + formatNumber(obj.totalExp);

            if(obj.percentage > 0) {
                document.querySelector(DOMStrings.expensesPercentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.expensesPercentageLabel).textContent = '---';
            }

        },

        updatePercentages : function(percentages) {

            var elemList = document.querySelectorAll('.item__percentage');
            if(elemList) {

                nodelistForEach(elemList, function(curr, index) {

                    if(percentages[index] !== '-1') {
                        curr.textContent = percentages[index] + '%';
                    } else curr.textContent = '---';

                });

            }

        },

        displayDate : function() {
            var now, year, month;
            now = new Date();
            year = now.getFullYear();

            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ' ' + year;
        },

        changeType : function() {

            var fields = document.querySelectorAll(DOMStrings.inputType + ',' + DOMStrings.inputDescription + ',' + DOMStrings.inputValue);

            nodelistForEach(fields, function(current) {

                current.classList.toggle('red-focus');

            });

            document.querySelector(DOMStrings.buttonAdd).classList.toggle('red');

        }

    }

})();

//Main Controller
var MainController = (function(budgetCtrl, UICtrl) {

    var DOM = UICtrl.getDOMStrings();

    var setupEventListeners = function() {
        document.querySelector(DOM.buttonAdd).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event) {

            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
    }

    var updateBudget = function() {

        //calculate the budget
        budgetCtrl.calculateBudget();

        //return the budget
        var budget = budgetCtrl.getBudget();

        //display the budget on the UI
        UICtrl.displayBudget(budget);
    }

    var updatePercentages = function() {

        //calculate the percentages
        budgetCtrl.calculatePercentages();

        //return them
        var percentages = budgetCtrl.getPercentages();

        //update UI
        UICtrl.updatePercentages(percentages);

    }

    var ctrlAddItem = function() {
        
            var input, newItem;
            //get the input field value
            input = UICtrl.getInput();
            if(input.description !== '' && !isNaN(input.value) && input.value > 0) {

            //add item to budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //add item to the UI
            UICtrl.addListItem(newItem, input.type);

            //clear fields
            //UICtrl.clearFields();

            //update and display on the UI
            updateBudget();

            //update percentages
            updatePercentages();

        }

    }

    var ctrlDeleteItem = function(event) {

        var itemID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID) {

            type = itemID.split('-')[0];
            splitID = parseInt(itemID.split('-')[1]);

            budgetCtrl.deleteItem(type, splitID);

            UICtrl.deleteListItem(type, splitID);

            updateBudget();

            updatePercentages();
        }
    }

    return {
        init : function() {
            setupEventListeners();
            UICtrl.displayDate();
            UICtrl.displayBudget({
                budget : 0,
                totalInc : 0,
                totalExp : 0,
                percentage : -1
            });
        }
    }

})(budgetController, UIController);

MainController.init();
