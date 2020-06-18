var data = JSON.parse(localStorage.getItem('loggedUser')) || []
console.log(data.loggedUser)
// console.log((Date().split("").slice(11, 15).join("")))
var dataExpense = []
var income = 0
var just_check = JSON.parse(localStorage.getItem(data.loggedUser))
if (just_check !== null){
    console.log(just_check)
    console.log(just_check[0].expenses[0])
}


function pageLoad(){
    var expensesBlock = document.getElementById('expenses_block')
    expensesBlock.style.display = 'none'
    if (data.length !== 0){
        var profileName = document.getElementById('profile_name')
        profileName.innerText = "Welcome! " + data.FirstName
    }
}


function income_block(){
    console.log('data')
    var incomeForm = document.getElementById('income_form')
    incomeForm.addEventListener('submit', getIncomeData)
}


function getIncomeData(){
    event.preventDefault()
    var children = event.target.querySelector("#monthly_income").value
    income = children
    console.log(income)
}


function progressBarManipulation(){

}


function displayExpenseBlock(){
    var expensesBlock = document.getElementById('expenses_block')
    expensesBlock.style.display = ''
    var expensesForm = document.getElementById('expenses_form')
    if(event.target.textContent === 'Add your Expense' || event.target.textContent === "Close box"){
        showHideBox()
    }
    // console.log(event.target.textContent)
    expensesForm.addEventListener('submit', function(){
        getExpenseData()
    })
}

function showHideBox(){
    if(event.target.textContent === 'Add your Expense'){
        var expensesBlock = document.getElementById('expenses_block')
        expensesBlock.style.display = ''
        event.target.textContent = "Close box"
    }
    else if(event.target.textContent === "Close box"){
        var expensesBlock = document.getElementById('expenses_block')
        expensesBlock.style.display = 'none'
        event.target.textContent = 'Add your Expense'
    }
}


function getExpenseData(){
    event.preventDefault()
    // var children = document.querySelectorAll('expense_data')
    var userExpense = JSON.parse(localStorage.getItem(data.loggedUser)) || []
    var date = document.getElementById('date').value
    console.log(date)
    var transport = Number(document.getElementById('transport').value) || 0
    var foodOthers = Number(document.getElementById('food_&_others').value) || 0
    var rent = Number(document.getElementById('rent').value) || 0
    var medicineHealth = Number(document.getElementById('medicine_&_health').value) || 0
    var others = document.getElementById('others').value || 'NONE'
    console.log(date, transport, foodOthers, rent, medicineHealth, others)
    var allData = new CreateLedger(date, transport, foodOthers, rent, medicineHealth, others)
    allData.structureData()
    dataExpense.push(allData.structureData())
    // var user = data.loggedUser
    var user = {
        expenses: dataExpense,
        monthly_income : Number(income)
    }
    console.log(user)
    userExpense.push(user)
    localStorage.setItem(data.loggedUser, JSON.stringify(userExpense))
}

function CreateLedger(date, transport, foodother, rent, medicinehealth, others){
    this.date = date,
    this.transport = transport,
    this.foodOther = foodother,
    this.rent = rent,
    this.medicineHealth = medicinehealth,
    this.others = others
    this.structureData = function(){
        // console.log(this.transport)
        var output = {day:[this.date, this.transport, this.foodOther, this.rent, this.medicineHealth, this.others]}
        return output
    }
}


function structureOutputData(){

}
window.addEventListener('load', function(){
    pageLoad()

    var expensesBlockDisplay = document.getElementById('expense_card_display')
    expensesBlockDisplay.addEventListener('click', displayExpenseBlock)

})

