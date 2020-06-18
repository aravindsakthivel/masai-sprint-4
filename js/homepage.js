function pageLoad(){
    var loginRegisterBlock = document.getElementById('login_register_block')
    var loginBlock = document.getElementById('login_block')
    var registerBlock = document.getElementById('register_block')

    loginRegisterBlock.setAttribute('style', "margin-top:250px")
    loginBlock.style.display = "none"
    registerBlock.style.display = "none"
}


function toLogin(){
    var loginBlock = document.getElementById('login_block')
    var loginRegisterBlock = document.getElementById('login_register_block')
    var registerBlock = document.getElementById('register_block')
    registerBlock.style.display = "none"
    loginBlock.setAttribute('style', "margin-top:250px")
    loginRegisterBlock.style.display = "none"
    loginBlock.style.display = ""
    var loginForm = document.getElementById('login_form')
    loginForm.addEventListener('submit', function(){
        getUserDataLogin()
    })
}


function getUserDataLogin(){
    event.preventDefault()
    var dispResult = document.getElementById('result')
    dispResult.innerText = ""
    var children = event.target.querySelectorAll('.login_data')
    var userName = children[0].value
    var userPassword = children[1].value
    // console.log(username, userPassword)
    var userData = JSON.parse(localStorage.getItem('registeredUsers')) || []
    var loggedInData = JSON.parse(localStorage.getItem('userLoginData')) || []
    if (userData.length !== 0){
        for (var i = 0 ; i < userData.length; i++){
            if (userData[i].Username === userName && userData[i].Password === userPassword){


                // every login details
                var logData = {
                    loggedInUser : userData[i].Username,
                    loggedtime : Date().split("").slice(0, 24).join("")
                }
                loggedInData.push(logData)
                localStorage.setItem('userLoginData', JSON.stringify(loggedInData))

                // temporary data for dashboard usage
                var logDataTemp = {
                    loggedUser : userData[i].Username,
                    FirstName : userData[i].first_name
                }
                localStorage.setItem('loggedUser', JSON.stringify(logDataTemp))


                location.href = "dashboard.html"
                break
            }
            else if (userData[i].Username === userName && userData[i].Password !== userPassword){
                dispResult.innerText = 'Wrong password'
                break
            }
            else if(i === userData.length - 1){
                dispResult.innerText = 'Please register first'
            }
        }
    }
    else{
        dispResult.innerText = 'Please register first'
    }
}


function toRegister(){
    var loginRegisterBlock = document.getElementById('login_register_block')
    var registerBlock = document.getElementById('register_block')
    registerBlock.setAttribute('style', "margin-top:150px")
    registerBlock.style.display = ""
    loginRegisterBlock.style.display = "none"
    var registerForm = document.getElementById('register_form')
    registerForm.addEventListener('submit', function(){
        getUserDataRegister()
    })
}


function getUserDataRegister(){
    event.preventDefault()
    var dispResult = document.getElementById('result_reg')
    dispResult.innerText = ""
    var children = event.target.querySelectorAll('.register_data')
    var userFirstName = children[0].value
    var userLastName = children[1].value
    var userName = children[2].value
    var userPassword = children[3].value
    var userEmail = children[4].value
    var userMobile = children[5].value

    // console.log(userFirstName,userLastName, userName,userEmail,userMobile, userPassword)
    var userData = JSON.parse(localStorage.getItem('registeredUsers')) || []
    if(userData.length !== 0){
        var flag = true
        for (var i = 0; i < userData.length; i++){
            if (userData[i].Username === userName){
                dispResult.textContent = 'The username is not available'
                flag = false
            }
            else if (userData[i].Usermobile === userMobile){
                dispResult.textContent = 'The mobile is already used'
                flag = false
            }
            else if (userData[i].Useremail === userEmail){
                dispResult.textContent = 'The email is already used'
                flag = false
            }
            else if (i === (userData.length - 1) && flag === true){
                console.log(i)
                var newUser = new CustomerInput(userFirstName,userLastName,userName,userEmail,userMobile,userPassword)
                userData.push(newUser.structureData())
                console.log(userData)
                localStorage.setItem('registeredUsers', JSON.stringify(userData))
                var success = document.getElementById('success')
                var div = document.createElement("div")
                div.innerText = "Registration complete! "
                var logbtn = document.createElement("button")
                logbtn.setAttribute('class', 'btn btn-primary')
                logbtn.addEventListener('click', toLogin)
                logbtn.textContent = "Click here to login!"
                div.append(logbtn)
                success.append(div)
                break
            }
        }
    }
    else{
        var newUser = new CustomerInput(userFirstName,userLastName,userName,userEmail,userMobile,userPassword)
        userData.push(newUser.structureData())
        localStorage.setItem('registeredUsers', JSON.stringify(userData))
        console.log(userData)
        var success = document.getElementById('success')
        var div = document.createElement("div")
        div.innerText = "Registration complete! "
        var logbtn = document.createElement("button")
        logbtn.setAttribute('class', 'btn btn-primary')
        logbtn.addEventListener('click', toLogin)
        logbtn.textContent = "Click here to login!"
        div.append(logbtn)
        success.append(div)
    }
}


function CustomerInput(firstname, lastname, username, email, mobile, password){
    this.firstname = firstname
    this.lastname = lastname
    this.username = username
    this.email = email
    this.mobile = mobile
    this.password = password
    this.structureData = function(){
        var output = {Username:this.username, Password:this.password, Usermobile:this.mobile, Useremail:this.email,first_name:this.firstname,last_name:this.lastname}
        return output
    }
}


window.addEventListener('load', function(){
    pageLoad()

    loginBtn = document.getElementById('login_btn')
    loginBtn.addEventListener('click', toLogin)

    registerBtn = document.getElementById('register_btn')
    registerBtn.addEventListener('click', toRegister)
})