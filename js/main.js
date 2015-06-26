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

      $(this).validate({
        messages: {
          name: "Please specify your name",
          email: {
            required: "We need your email address to contact you",
            email: "Please provide a valid email"
          },
          subject: "Please provide a subject for your message",
          message: "Did you forget the message? :)"
        },
        success: function(label, input) {
          $(input).parent().addClass('has-success').removeClass('has-error');

          var label = $('#' + $(input).attr('name') + '-error');

          if (label) {
            label.remove();
          }
        },
        highlight: function(input) {
          $(input).parent().addClass('has-error');
        },
        errorPlacement: function(error, element) {
          error.prependTo(element.parent());
        },
        errorElement: 'div',
        errorClass: 'alert alert-danger',
        errorLabelContainer: '.form-errors'
      });

      if (!$(this).valid()) {
        return;
      }

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
