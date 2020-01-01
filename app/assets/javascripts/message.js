$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="chat-main__messages__contents-data" data-message-id=${message.id}>
          <div class="chat-main__messages__contents-data__update-date">
            <div class="chat-main__messages__contents-data__update-date__name">
              ${message.user_name}
            </div>
            <div class="chat-main__messages__contents-data__update-date__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__messages__contents-data__messages-text">
            <p class="message-text">
              ${message.content}
            </p>
            <img class="lower-message__image" src=${message.image}>
          </div>
        </div>`
      return html;
    }
      else{
        var html =
          `<div class="chat-main__messages__contents-data" data-message-id=${message.id}>
             <div class="chat-main__messages__contents-data__update-date">
               <div class="chat-main__messages__contents-data__update-date__name">
                ${message.user_name}
               </div>
               <div class="chat-main__messages__contents-data__update-date__date">
                ${message.created_at}
               </div>
             </div>
             <div class="chat-main__messages__contents-data__messages-text">
              <p class="message-text">
                ${message.content}
              </p>
             </div>
           </div>`
        return html;
      };
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
      $('.chat-main__messages').append(html);
      $('form')[0].reset();
      $('.chat-main__form__submit').attr('disabled', false);
      $('.chat-main__messages__contents-data').animate({ scrollTop: $('chat-main__messages__contents-data')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
})
});