$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  $('form').submit(function (event) {
      event.preventDefault();

      var data = {
        name:    $(this).find('[name="name"]').val(),
        email:   $(this).find('[name="email"]').val(),
        subject: $(this).find('[name="subject"]').val(),
        message: $(this).find('[name="message"]').val()
      }

      swal({
        title: "Please wait!",
        text: "Sending your message...",
        type: "info",
        allowEscapeKey: false,
        showConfirmButton: false
      });

      $.ajax({
        url: "http://getsimpleform.com/messages/ajax?form_api_token=99c927ae5658745cd0a05a6d7c0bec89",
        dataType: 'jsonp',
        data: data
      }).success(function (data) {
        swal("Thank you!", "Your message was sent! You should receive a reply shortly!", "success");
        $('input, textarea').val('');
      });
  });
});
