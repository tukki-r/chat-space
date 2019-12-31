$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
                `<div class="chat-main__messages__contents-data">
                <div class="chat-main__messages__contents-data__update-date">
                <div class="chat-main__messages__contents-data__update-date__name">
                  ${message.user_name}
                </div>
                <div class="chat-main__messages__contents-data__update-date__date">
                  ${message.created_at}
                </div>
                </div>
                <div class="chat-main__messages__contents-data__messages-text">
                ${message.content}
                <img class="lower-message__image" src=${message.image} >
                </div>
                </div>`
      return html;
  }
    
$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
.done(function(data){
  var html = buildHTML(data);

//   $('.message').append(html);
//   $('.textbox').val('');
//   $('.form__submit').prop('disabled',false);
// }