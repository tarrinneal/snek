$(document).ready(function() {
  var $app = $('#app');
  var $logo = $('#logo');
  // var $nav = $('#nav')
  var $back = $('<button #back>Back</button>');
  var $breck = $('#breck');
  var $snek = $('#snek');

  var refresh = function() {
    document.location.reload();
  }

  $back.on('click', refresh);
  $breck.on('click', playBreck);
  $snek.on('click', playSnek);
  $logo.on('click', refresh);
});