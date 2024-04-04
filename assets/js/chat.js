import { crea } from "./myDOM.js";

const chatBody = document.querySelector("#chat-body"),
  chatTextArea = document.querySelector("#chat-text"),
  btn = {
    send: document.querySelector("#chat-send"),
  },
  messageList = [
    { by: "user", message: "Messaggio 1 dell'utente" },
    { by: "admin", message: "Messaggio 1 dell'admin" },
    { by: "user", message: "Messaggio 2 dell'utente" },
  ],
  newMessageEvt = new EventTarget(),
  newMessageSound = new Audio("./assets/sound/new-message.mp4");

export default function () {
  SetEvent();
  showMessage();
}

function SetEvent() {
  btn.send.addEventListener("click", sendMessage);
  chatTextArea.addEventListener("keyup", textAreaEvent);
  newMessageEvt.addEventListener("newUserMessage", newMessageUser);
}

function newMessageUser() {
  addMessageInPage(messageList[messageList.length - 1]);
}

function textAreaEvent(e) {
  if (e.key.toLowerCase() === "enter") {
    sendMessage(e);
  }
}

function sendMessage(e) {
  const messageText = chatTextArea.value,
    messageObj = { by: "admin", message: messageText };
  if (!messageText) return;
  messageList.push(messageObj);
  addMessageInPage(messageObj);
  chatTextArea.value = "";
  simulateUserMessage();
}

function simulateUserMessage() {
  setTimeout(() => {
    messageList.push({
      by: "user",
      message: "messaggio di risposta dell'utente",
    });
    newMessageEvt.dispatchEvent(new Event("newUserMessage"));
  }, 2000);
}

function showMessage() {
  messageList.forEach((msg) => {
    addMessageInPage(msg);
  });
}

function addMessageInPage(msg) {
  const div = crea("div", [["class", `message ${msg.by}`]]),
    span = crea("span", [["class", "time"]]),
    p = crea("p", [], msg.message);
  div.append(span, p);
  chatBody.append(div);
  chatBody.scrollTo(0, chatBody.scrollHeight - chatBody.clientHeight);

  if (msg.by === "user") newMessageSound.play();
}
