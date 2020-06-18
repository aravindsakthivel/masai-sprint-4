var data = JSON.parse(localStorage.getItem('loggedUser')) || []
console.log(data.loggedUser)
// console.log((Date().split("").slice(11, 15).join("")))
var dataExpense = []
var income = 10000
// var just_check = JSON.parse(localStorage.getItem(data.loggedUser))
// if (just_check !== null){
//     console.log(just_check)
//     console.log(just_check[0].expenses[0].day.length)
// }


function pageLoad(){
    var d_table = document.getElementById('output_table')
    d_table.style.display = "none"
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
    income = children || 10000
    console.log(income)
}


function display_table(){
    var d_table = document.getElementById('output_table')
    d_table.style.display = ""
    var d_body = document.getElementById('table_body')
    d_body.innerHTML = ""
    var just_check = JSON.parse(localStorage.getItem(data.loggedUser))
    var transportBill = 0
    var food_OthersBill = 0
    var rentBill = 0
    var medicine_HealthBill = 0
    var others = 'NONE'
    for (var i = 0 ; i < just_check.length; i++){
        var table_row = document.createElement('tr')
        // console.log(just_check[i])
        for (var j = 0; j < just_check[just_check.length - 1].expenses[i].day.length; j++){
            var heading = document.createElement('td')
            // heading.setAttribute('scope', 'row')
            heading.innerText = just_check[just_check.length - 1].expenses[i].day[j]
            table_row.append(heading)
        }
        transportBill += just_check[just_check.length - 1].expenses[i].day[1]
        food_OthersBill += just_check[just_check.length - 1].expenses[i].day[2]
        rentBill += just_check[just_check.length - 1].expenses[i].day[3]
        medicine_HealthBill += just_check[just_check.length - 1].expenses[i].day[4]
        d_body.append(table_row)
    }
    d_table.append(d_body)
    // structuring expenses
    console.log(transportBill,food_OthersBill, rentBill, medicine_HealthBill)
    var total_bill = transportBill + food_OthersBill + rentBill + medicine_HealthBill
    console.log(total_bill)
    progressBarManipulation(total_bill)
}

function progressBarManipulation(data){
    var incBar = document.getElementById('inc')
    var speBar = document.getElementById('spe')
    incBar.innerText = income - data
    speBar.innerText = data
    var incCal = ((income - data) / 100)
    incBar.style.width = incCal + "%"
    speBar.style.width = (100 - incCal)+ "%"
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

    var dispTable = document.getElementById('display_table')
    dispTable.addEventListener('click', display_table)

    var incomeBlock = document.getElementById('income_block')
    incomeBlock.addEventListener('click', income_block)

})

