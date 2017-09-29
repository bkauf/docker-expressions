$(document).ready( function() {
  $(".health").click(function(e){
    $.get("/health", function(data, status){
        $('#status').text('Health:'+data);
      });
          //alert("Data: " + data + "\nStatus: " + status);
    });
  $(".kill").click(function(e){
    $.get("/kill", function(data, status){
      $('#status').text('Health:'+data);
          //  alert("Data: " + data + "\nStatus: " + status);
        });
  });

  $(".secrets").click(function(e){
    var addressValue = $(this).attr("href");

    $.post( "/read", { file_name: addressValue})
    .done(function( data ) {
      alert(data);
    });
  //  $.get("/read/addressValue", function(data, status){
  //      alert("Data: " + data);
  //  });

  });


});
