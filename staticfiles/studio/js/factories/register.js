define("js/factories/register",["jquery","jquery.cookie"],function(e){"use strict";return function(){e("form :input").focus(function(){e('label[for="'+this.id+'"]').addClass("is-focused")}).blur(function(){e("label").removeClass("is-focused")}),e("form#register_form").submit(function(r){r.preventDefault();var s=e("#register_form").serialize();e.ajax({url:"/create_account",type:"POST",dataType:"json",headers:{"X-CSRFToken":e.cookie("csrftoken")},notifyOnError:!1,data:s,success:function(e){location.href="/course/"},error:function(r,s,o){var a=e.parseJSON(r.responseText);e("#register_error").html(a.value).stop().addClass("is-shown")}})}),e("input#password").blur(function(){var r=e("#password_error"),s={password:e("#password").val()};r.empty(),r.addClass("hidden"),e.ajax({url:"/api/user/v1/validation/registration",type:"POST",dataType:"json",data:s,success:function(e){_.each(e.validation_decisions,function(e,s){"password"===s&&e&&(r.html(e),r.removeClass("hidden"))})}})})}});