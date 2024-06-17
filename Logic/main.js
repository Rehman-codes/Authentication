let authToken = localStorage.getItem("authToken");

document.addEventListener("DOMContentLoaded", function(){
    checkAuth();
})


function checkAuth(){
if (authToken) {
    showUserView();
}
else{
    localStorage.setItem("authToken", "123")
}
}

function showUserView() {
    if (!window.location.pathname.includes('userview.html')) {
        window.location.href = "/Pages/userview.html";
    }
}
