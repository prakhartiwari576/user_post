var user

function myFunction() {
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var age = document.getElementById("age").value
    
    user={
        name,
        email,
        password,
        age
    }
   if(!name || !email || !password){
       alert('Please fill all name, email & password')
   }else{
    $.ajax({
        type: 'POST',
        data: JSON.stringify(user),
        contentType: 'application/json',
        url: '/users'
    });
 }   

 location.href = '/login'
}

