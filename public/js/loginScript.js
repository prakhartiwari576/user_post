var user

function myFunction() {
 var email = document.getElementById("email").value;
 var password = document.getElementById("password").value;

 user = {
     email,
     password
 }

$.ajax({
    type: 'POST',
    data: JSON.stringify(user),
    contentType: 'application/json',
    url: '/users/login',
    success: function(response) {
        // if(response.user.email === user.email){
        //     location.href = 'home'
        // }else{
        //     alert('Unable to Login')
        // }
        if(response.user.email === user.email){
            location.href = 'home'
            localStorage.setItem('token', response.user.token);
        }
    }
})

}