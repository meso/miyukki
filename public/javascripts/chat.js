var chat = io.connect('http://sakura.mesolabs.com:3009/chat');
chat.on('connect', function() {
  chat.on('count', function(data) {
    $('#count').text(data.count);
  });
  chat.on('message', function(data) {
    var date = new Date(data.timestamp);
    $('#chat').append('<div class="chatlog"><p><a href="http://twitter.com/' + escape(data.name) + '"><img src="http://api.dan.co.jp/twicon/' + escape(data.name) + '/mini" /></a> ' + escape(data.text) + '</p><span class="date">' + date.toString() + '</span></div>');
      $('#chat').scrollTop(1000000);
  });
});

function send() {
  var name = $('#name').val();
  var text = $('#text').val();
  if (text && name && name != "Twitter ID") {
    chat.emit('message', {name: name, text: text});
    $('#text').val('');
  }
}

function escape(str) {
  return $('<div></div>').text(str).html();
}
