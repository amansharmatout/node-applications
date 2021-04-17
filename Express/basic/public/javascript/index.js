function show() {
    let sp = document.getElementById('sp').checked
    if (sp) {
        var pass = document.getElementById('pass')
        var cpass = document.getElementById('cpass')
        pass.type = "text"
        cpass.type = "text"
    } else {
        var pass = document.getElementById('pass')
        var cpass = document.getElementById('cpass')
        pass.type = "password"
        cpass.type = "password"
    }
}
function validate() {
    let fname = document.getElementById('fname').value
    let lname = document.getElementById('lname').value
    let username = document.getElementById('username').value
    let phone = document.getElementById('phone').value
    let address = document.getElementById('address').value
    let city = document.getElementById('city').value
    let state = document.getElementById('state').value
    let zip = document.getElementById('zip').value
    let pass = document.getElementById('pass').value
    let cpass = document.getElementById('cpass').value

    if (!fname) {
        console.log("first name should not be empty.")
        document.getElementById('fname').style.borderColor = "red";
        red(document.getElementById('fname'))
        return false;
    }
    if (!alphanumeric(fname)) {
        document.getElementById('fname').style.borderColor = "red";
        console.log('please enter valid first name')
        red(document.getElementById('fname'))
        return false;
    }
    document.getElementById('fname').style.borderColor = "#ced4da";
    if (!lname) {
        console.log("last name should not be empty.")
        document.getElementById('lname').style.borderColor = "red";
        return false
    }
    if (!alphanumeric(lname)) {
        console.log('please enter valid last name')
        document.getElementById('lname').style.borderColor = "red";
        return false;
    }
    document.getElementById('lname').style.borderColor = "#ced4da";
    if (!isEmail()) {
        console.log("Please enter email")
        document.getElementById('email').style.borderColor = "red";
        return false
    }
    document.getElementById('email').style.borderColor = "#ced4da";
    if (!username) {
        console.log("Please enter username")
        document.getElementById('username').style.borderColor = "red";
        return false
    }
    document.getElementById('username').style.borderColor = "#ced4da";
    if (!isPhone(phone) || phone.length != 10) {
        console.log("Please enter valid phone number")
        document.getElementById('phone').style.borderColor = "red";
        return false
    }
    document.getElementById('phone').style.borderColor = "#ced4da";
    if (!address) {
        document.getElementById('address').style.borderColor = "red";
        console.log("Address should not be empty.")
        return false
    }
    document.getElementById('address').style.borderColor = "#ced4da";
    if (!city) {
        document.getElementById('city').style.borderColor = "red";
        console.log("City name should not be empty.")
        return false
    }
    document.getElementById('city').style.borderColor = "#ced4da";
    if (!state) {
        document.getElementById('state').style.borderColor = "red";
        console.log("State name should not be empty.")
        return false
    }
    document.getElementById('state').style.borderColor = "#ced4da";
    if (!zip || zip.length != 6) {
        document.getElementById('zip').style.borderColor = "red";
        console.log("Please enter valid postal code.")
        return false
    }
    document.getElementById('zip').style.borderColor = "#ced4da";
    if (!pass) {
        document.getElementById('pass').style.borderColor = "red";
        console.log("password should not be empty.")
        return false
    }
    document.getElementById('pass').style.borderColor = "#ced4da";
    if (!cpass) {
        document.getElementById('cpass').style.borderColor = "red";
        console.log('please confirm your password')
        return false
    } else {
        if (cpass == pass) {
            console.log('success')
            var email=document.getElementById('email').value
            document.location.href =`?name=${username}&lname=${lname}&fname=${fname}&phone=${phone}&address=${address}&city=${city}&state=${state}&zip=${zip}&pass=${pass}&email=${email}`

            document.getElementById('pass').style.borderColor = "#ced4da";
            document.getElementById('cpass').style.borderColor = "#ced4da";
            return true
        } else {
            console.log("passwords doesn't match.")
            document.getElementById('pass').style.borderColor = "red";
            document.getElementById('cpass').style.borderColor = "red";
            return false
        }
    }

}
function isEmail() {
    var email = document.getElementById('email').value
    if (!isNaN(email) || !email) {
        return false
    }
    if (email.split('@').length == 2) {
        email = email.split('@');
        if (email[1].split('.').length == 2) {
            console.log(true)
            return true;
        }
    }
    return false;
}

function alphanumeric(inputtxt) {
    var letters = /^[a-zA-Z]+$/;
    if (inputtxt.match(letters)) {
        return true;
    }
    else {
        return false;
    }
}
function isPhone(inputtxt) {
    var letters = /^[0-9]+$/;
    if (inputtxt.match(letters)) {
        return true;
    }
    else {
        return false;
    }
}
