function check(form) {
    if(form.userid.value == "admin" && form.pswrd.value == "admin") {
        document.getElementById("main").innerHTML=("<h1>WELCOME ADMIN!</h1>")
    }
    else {
        alert("Error Password or Username")
    }
}