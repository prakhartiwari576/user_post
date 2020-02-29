var user

function myFunction() {
 var email = document.getElementById("email").value;
 var password = document.getElementById("password").value;

 user = {
     email,
     password
 }

const response = $.ajax({
    type: 'POST',
    data: JSON.stringify(user),
    contentType: 'application/json',
    url: '/users/login',
    success: function(response) {
        if(response === '200'){
            location.href = 'home'
        }else{
            alert('Unable to login')
        }
    }
})
// console.log(response['status']);

}