document.addEventListener("DOMContentLoaded", function () {
    let appSidebar = document.getElementById("app-sidebar");
    appSidebar.style.display = "none"; // Это закрывает sidebar тоесть настройку


    fetch("https://cloud-test.sanarip.org/ocs/v2.php/apps/spreed/api/v1/guest/zedynb4c/name", {
        method: "POST",
        body: JSON.stringify({
            // Вместо Гость нужно поставить displayName который приходит с фронта
            displayName: "Гость"
        }),
        headers: {
            "Content-Type": "application/json",
            // Сюда нужно поставить cookie 
            // "Cookie": "__Host-nc_sameSiteCookielax=true; __Host-nc_sameSiteCookiestrict=true; oc_sessionPassphrase=E6OnwiBnIRCUxepusanAwYOicP6uNpKy3nyEse7nu9pAoYp1pOVb%2BaL6HCYJpiznOX238R26Vzjx4KZQoun2NCa6y74vwWCExDxeOPrspZmcTPHcm3GI40pAZrEoj3Rx; oc1tvj2u6sww=5dd49gch1648ko73q3lldb4fug"
        }
    })
    
});