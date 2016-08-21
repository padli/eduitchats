// masukan url firebase app sobat
var dbRef = new Firebase("https://eduit.firebaseio.com/");
// child itu hampir sama dengan table kalau di database mysql
var chatsRef = dbRef.child('chats');

chatsRef.on("child_added", function(snap) {
  console.log("added", snap.key(), snap.val());
  document.querySelector('#message_box').innerHTML += (chatHtmlFromObject(snap.val()));
});

function chatHtmlFromObject(chat) {
  console.log(chat);
   var bubble = (chat.name == document.querySelector('#name').value ? "bubble-right" : "bubble-left");
  var html = '<div class="' + bubble + '"><p><span class="name">' + chat.name + '</span><span class="msgc">' + chat.message + '</span><span class="date">' + chat.date + '</span></p></div>';
  return html;
}

document.querySelector('#save').addEventListener("click", function(event) {
  var a = new Date(),
  b = a.getDate(),
  c = a.getMonth(),
  d = a.getFullYear(),
  date = b + '/' + c + '/' + d,
     chatForm = document.querySelector('#msg_form');
  event.preventDefault();
  if (document.querySelector('#name').value != '' && document.querySelector('#message').value != '') {
  chatsRef
  .push({
  name: document.querySelector('#name').value,
  message: document.querySelector('#message').value,
  date: date
  })
  chatForm.reset();
  } else {
  alert('Please fill atlease name or message!');
  }
}, false);
