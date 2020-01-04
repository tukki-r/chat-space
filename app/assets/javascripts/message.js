$(function(){
    last_message_id = $('.chat-main__messages__contents-data:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.chat-main__messages__contents-data').append(insertHTML);
    })
    .fail(function(){
      console.log('error');
    });

  function buildHTML(message){
    if ( message.content && message.image ) {
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
      else if (message.content){
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
      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
})
});