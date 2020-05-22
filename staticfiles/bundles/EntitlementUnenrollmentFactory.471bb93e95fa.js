!function(e,t){for(var n in t)e[n]=t[n]}(window,webpackJsonp([34],{"./lms/static/js/learner_dashboard/entitlement_unenrollment_factory.js":function(e,t,n){"use strict";function r(e){return new i.a(e)}Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"EntitlementUnenrollmentFactory",function(){return r});var i=n("./lms/static/js/learner_dashboard/views/entitlement_unenrollment_view.js")},"./lms/static/js/learner_dashboard/views/entitlement_unenrollment_view.js":function(e,t,n){"use strict";(function(e){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s=n(2),l=n.n(s),a=n("./node_modules/edx-ui-toolkit/src/js/utils/html-utils.js"),u=n.n(a),d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),h=function(t){function n(e){r(this,n);var t={el:".js-entitlement-unenrollment-modal"};return i(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,d({},t,e)))}return o(n,t),c(n,[{key:"initialize",value:function(t){var n=this;this.closeButtonSelector=".js-entitlement-unenrollment-modal .js-entitlement-unenrollment-modal-close-btn",this.headerTextSelector=".js-entitlement-unenrollment-modal .js-entitlement-unenrollment-modal-header-text",this.errorTextSelector=".js-entitlement-unenrollment-modal .js-entitlement-unenrollment-modal-error-text",this.submitButtonSelector=".js-entitlement-unenrollment-modal .js-entitlement-unenrollment-modal-submit",this.triggerSelector=".js-entitlement-action-unenroll",this.mainPageSelector="#dashboard-main",this.genericErrorMsg=gettext("Your unenrollment request could not be processed. Please try again later."),this.modalId="#"+this.$el.attr("id"),this.dashboardPath=t.dashboardPath,this.signInPath=t.signInPath,this.browseCourses=t.browseCourses,this.isEdx=t.isEdx,this.$submitButton=e(this.submitButtonSelector),this.$closeButton=e(this.closeButtonSelector),this.$headerText=e(this.headerTextSelector),this.$errorText=e(this.errorTextSelector),this.$submitButton.on("click",this.handleSubmit.bind(this)),e(this.triggerSelector).each(function(){var t=e(this);t.on("click",n.handleTrigger.bind(n)),window.accessible_modal&&window.accessible_modal("#"+t.attr("id"),n.closeButtonSelector,"#"+n.$el.attr("id"),n.mainPageSelector)})}},{key:"handleTrigger",value:function(t){var n=e(t.target),r=n.data("courseName"),i=n.data("courseNumber"),o=n.data("entitlementApiEndpoint");this.$previouslyFocusedElement=n,this.resetModal(),this.setHeaderText(r,i),this.setSubmitData(o),this.$el.css("position","fixed")}},{key:"handleSubmit",value:function(){var t=this.$submitButton.data("entitlementApiEndpoint");if(void 0===t)return void this.setError(this.genericErrorMsg);this.$submitButton.prop("disabled",!0),e.ajax({url:t,method:"DELETE",complete:this.onComplete.bind(this)})}},{key:"resetModal",value:function(){this.$submitButton.removeData(),this.$submitButton.prop("disabled",!1),this.$headerText.empty(),this.$errorText.removeClass("entitlement-unenrollment-modal-error-text-visible"),this.$errorText.empty()}},{key:"setError",value:function(e){this.$submitButton.prop("disabled",!0),this.$errorText.empty(),u.a.setHtml(this.$errorText,e),this.$errorText.addClass("entitlement-unenrollment-modal-error-text-visible")}},{key:"setHeaderText",value:function(e,t){this.$headerText.empty(),u.a.setHtml(this.$headerText,u.a.interpolateHtml(gettext("Are you sure you want to unenroll from {courseName} ({courseNumber})? You will be refunded the amount you paid."),{courseName:e,courseNumber:t}))}},{key:"setSubmitData",value:function(e){this.$submitButton.removeData(),this.$submitButton.data("entitlementApiEndpoint",e)}},{key:"switchToSlideOne",value:function(){for(var e=document.querySelector(".options"),t=e.children.length-1;t>=0;t-=1)e.appendChild(e.children[Math.trunc(Math.random()*t)]);this.$(".entitlement-unenrollment-modal-inner-wrapper header").addClass("hidden"),this.$(".entitlement-unenrollment-modal-submit-wrapper").addClass("hidden"),this.$(".slide1").removeClass("hidden"),window.trapFocusForAccessibleModal(this.$previouslyFocusedElement,window.focusableElementsString,this.closeButtonSelector,this.modalId,this.mainPageSelector)}},{key:"switchToSlideTwo",value:function(){var e=this.$(".reasons_survey input[name='reason']:checked").attr("val");"Other"===e&&(e=this.$(".other_text").val()),e&&window.analytics.track("entitlement_unenrollment_reason.selected",{category:"user-engagement",label:e,displayName:"v1"}),this.$(".slide1").addClass("hidden"),this.$(".slide2").removeClass("hidden"),window.trapFocusForAccessibleModal(this.$previouslyFocusedElement,window.focusableElementsString,this.closeButtonSelector,this.modalId,this.mainPageSelector)}},{key:"onComplete",value:function(e){var t=e.status,r=e.responseJSON&&e.responseJSON.detail;204===t?this.isEdx?(this.switchToSlideOne(),this.$(".reasons_survey:first .submit-reasons").click(this.switchToSlideTwo.bind(this))):n.redirectTo(this.dashboardPath):401===t&&"Authentication credentials were not provided."===r?n.redirectTo(this.signInPath+"?next="+encodeURIComponent(this.dashboardPath)):this.setError(this.genericErrorMsg)}}],[{key:"redirectTo",value:function(e){window.location.href=e}}]),n}(l.a.View);t.a=h}).call(t,n(0))}},["./lms/static/js/learner_dashboard/entitlement_unenrollment_factory.js"]));