var user

function getDescription() {
    var description = document.getElementById('description').value

    user={
        description
    }
    debugger
    const response = $.ajax({
        type: 'POST',
        data: JSON.stringify(user),
        contentType: 'application/json',
        url: '/users/post',
        success: function(response) {
            console.log(response);
        }
    })
}
