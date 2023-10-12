import { createElement } from "./helpers.js";
import { whatsapp, chatMessenger, chatMessengerClose, closechaticon, onlineChat, gtsCall } from "./icons.js";
import { isLoading, toggleSpinnerVisibility } from "./onlinechat.js";

const widget = document.querySelector(".widget_container");
const chatform = document.querySelector(".chat-form");

const svgOpen = chatMessenger;
const svgClose = chatMessengerClose;
const btnOpen = createElement({ htmlElement: "button", elemenClass: ["btn_messenger", "btn_open"], icon: svgOpen });
const btn_close = createElement({ htmlElement: "button", elemenClass: ["btn_messenger", "btn_close"], icon: svgClose });
const btn_whatsapp = createElement({ htmlElement: "a", elemenClass: ["btn_messenger", "btn_whatsapp"], icon: whatsapp, address: "https://wa.me/996500910850" });
const btn_call = createElement({ htmlElement: "a", elemenClass: ["btn_messenger", "btn_call"], icon: gtsCall, address: "tel:1240" });
const btn_onlinechat = createElement({ htmlElement: "a", elemenClass: ["btn_messenger", "btn_onlinechat"], icon: onlineChat });
const closechat = createElement({ htmlElement: "button", elemenClass: ["btn_messenger", "btn_closechat"], icon: closechaticon });
widget.appendChild(btnOpen);

btnOpen.addEventListener("click", function () {
    widget.classList.toggle("widget__open");
    widget.removeChild(btnOpen);
    widget.appendChild(btn_whatsapp);
    widget.appendChild(btn_call);
    widget.appendChild(btn_onlinechat);
    widget.appendChild(btn_close);
});

btn_close.addEventListener("click", function () {
    widget.classList.toggle("widget__open");
    widget.removeChild(btn_close);
    widget.removeChild(btn_whatsapp);
    widget.removeChild(btn_call);
    widget.removeChild(btn_onlinechat);
    widget.appendChild(btnOpen);
});

// online chat styles
btn_onlinechat.style.position = "relative";
chatform.style.position = "absolute";
chatform.style.bottom = "45px";
chatform.style.right = "103px";
closechat.style.position = "absolute";
closechat.style.right = "5px";
closechat.style.top = "5px";
chatform.appendChild(closechat);

const mediaQuery = window.matchMedia('(max-width: 700px)')

function handleTabletChange(e) {
    if (e.matches) {
        chatform.style.bottom = "5px"
        chatform.style.right = "5%"
    }
}

mediaQuery.addListener(handleTabletChange)
handleTabletChange(mediaQuery)

// open close online chat
btn_onlinechat.addEventListener("click", function (event) {
    event.preventDefault();
    if (chatform.style.display === "block") {
        chatform.style.display = "none";
    } else {
        chatform.style.display = "block";
    }
})

closechat.addEventListener("click", function (e) {
    e.preventDefault()
    chatform.style.display = "none";
    isLoading = "";
    toggleSpinnerVisibility();
})





