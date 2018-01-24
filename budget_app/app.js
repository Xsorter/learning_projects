var budgetController = (function(){

	var Expense = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		} 
	}

	return {
		addItem: function(type, descr, val){
			var newItem, ID;

			//create new id
			if(data.allItems[type].length > 0){
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;	
			} else {
				ID = 0;
			}
			

			//create new item based on 'inc' or 'exp'
			if(type === 'exp'){
				newItem = new Expense (ID, descr, val);
			}else if(type === 'inc'){
				newItem = new Income (ID, descr, val);
			}

			//push it into data structure	
			data.allItems[type].push(newItem);

			//return new element
			return newItem;

		},

		//testing method to output in console
		testing: function(){
			console.log(data);
		}
	}

})();










var uiController = (function(){

	var DOMstrings = {
		inputType : '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputButton: '.add__btn',
		incomeContainer: '.income__list',
		expenceContainer: '.expenses__list'
	};

	return {
		getInput: function(){
			return {
				type: document.querySelector(DOMstrings.inputType).value, //will be inc or exp
				description: document.querySelector(DOMstrings.inputDescription).value, 
				value: document.querySelector(DOMstrings.inputValue).value
			}
		},

		addListItem: function(obj, type){

			//create html string with placeholder text
			var html, newHtml, element;

			if (type === 'inc'){
				element = DOMstrings.incomeContainer;
				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if (type === 'exp'){
				element = DOMstrings.expenceContainer;
				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}

			
			//replace placeholder text with data
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);

			//insert html into DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);


		},

		clearFields: function(){
			var fields, fieldsArr;
			fields = document.querySelectorAll (DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach(function(current, index, array){
				current.value = "";
			});

			fieldsArr[0].focus();
		},

		getDOMstrings: function(){
			return DOMstrings;
		}
	}

})();









var controller = (function(budgetCtrl, uiCtrl){

	var setupEventListeners = function(){

		var DOM = uiCtrl.getDOMstrings();
		document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function(event){
			if(event.keyCode === 13 || event.which === 13){
				ctrlAddItem();
			}
		});

	}

	
	var ctrlAddItem = function(){

		var input, newItem, renderUI;

		//1 - get the data from input field
		input = uiCtrl.getInput();

		//2 - add item to budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);

		//3 - add the item to UI
		renderUI = uiCtrl.addListItem(newItem, input.type);

		//4 - clear fields
		uiCtrl.clearFields();


		console.log(input);
	};

	return {
		init: function(){
			console.log('init started');
			setupEventListeners();
		}
	}

})(budgetController, uiController);









controller.init();