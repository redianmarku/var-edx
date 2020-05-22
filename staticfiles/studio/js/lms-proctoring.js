var edx = edx || {};

(function(Backbone) {

    'use strict';

    edx.instructor_dashboard = edx.instructor_dashboard || {};
    edx.instructor_dashboard.proctoring = edx.instructor_dashboard.proctoring || {};

    edx.instructor_dashboard.proctoring.ProctoredExamAllowanceModel = Backbone.Model.extend({
        url: '/api/edx_proctoring/v1/proctored_exam/allowance'

    });
    this.edx.instructor_dashboard.proctoring.ProctoredExamAllowanceModel = edx.instructor_dashboard.proctoring.ProctoredExamAllowanceModel;
}).call(this, Backbone);

;var edx = edx || {};

(function(Backbone) {

    'use strict';

    edx.instructor_dashboard = edx.instructor_dashboard || {};
    edx.instructor_dashboard.proctoring = edx.instructor_dashboard.proctoring || {};

    edx.instructor_dashboard.proctoring.ProctoredExamAttemptModel = Backbone.Model.extend({
        url: '/api/edx_proctoring/v1/proctored_exam/attempt/'

    });
    this.edx.instructor_dashboard.proctoring.ProctoredExamAttemptModel = edx.instructor_dashboard.proctoring.ProctoredExamAttemptModel;
}).call(this, Backbone);

;(function(Backbone) {
    var ProctoredExamModel = Backbone.Model.extend({
        /* we should probably pull this from a data attribute on the HTML */
        url: '/api/edx_proctoring/v1/proctored_exam/attempt',

        defaults: {
            in_timed_exam: false,
            attempt_id: 0,
            attempt_status: 'started',
            taking_as_proctored: false,
            exam_display_name: '',
            exam_url_path: '',
            time_remaining_seconds: 0,
            low_threshold_sec: 0,
            critically_low_threshold_sec: 0,
            course_id: null,
            accessibility_time_string: '',
            lastFetched: new Date()
        },
        getFormattedRemainingTime: function (secondsLeft) {
            /* since we can have a small grace period, we can end in the negative numbers */
            if (secondsLeft < 0)
                secondsLeft = 0;

            var hours = parseInt(secondsLeft / 3600);
            var minutes = parseInt(secondsLeft / 60) % 60;
            var seconds = Math.floor(secondsLeft % 60);

            return hours + ":" + (minutes < 10 ? "0" + minutes : minutes)
                + ":" + (seconds < 10 ? "0" + seconds : seconds);

        },
        getRemainingTimeState: function (secondsLeft) {
            if (secondsLeft > this.get('low_threshold_sec')) {
                return null;
            }
            else if (secondsLeft <= this.get('low_threshold_sec') && secondsLeft > this.get('critically_low_threshold_sec')) {
                // returns the class name that has some css properties
                // and it displays the user with the waring message if
                // total seconds is less than the low_threshold value.
                return "warning";
            }
            else {
                // returns the class name that has some css properties
                // and it displays the user with the critical message if
                // total seconds is less than the critically_low_threshold_sec value.
                return "critical";
            }
        }
    });

    this.ProctoredExamModel = ProctoredExamModel;
}).call(this, Backbone);

;var edx = edx || {};
(function(Backbone) {

    edx.instructor_dashboard = edx.instructor_dashboard || {};
    edx.instructor_dashboard.proctoring = edx.instructor_dashboard.proctoring || {};

    edx.instructor_dashboard.proctoring.ProctoredExamAllowanceCollection = Backbone.Collection.extend({
        /* model for a collection of ProctoredExamAllowance */
        model: edx.instructor_dashboard.proctoring.ProctoredExamAllowanceModel,
        url: '/api/edx_proctoring/v1/proctored_exam/'
    });
    this.edx.instructor_dashboard.proctoring.ProctoredExamAllowanceCollection = edx.instructor_dashboard.proctoring.ProctoredExamAllowanceCollection;
}).call(this, Backbone);

;var edx = edx || {};
(function(Backbone) {

    edx.instructor_dashboard = edx.instructor_dashboard || {};
    edx.instructor_dashboard.proctoring = edx.instructor_dashboard.proctoring || {};

    edx.instructor_dashboard.proctoring.ProctoredExamAttemptCollection = Backbone.Collection.extend({
        /* model for a collection of ProctoredExamAttempt */
        model: edx.instructor_dashboard.proctoring.ProctoredExamAttemptModel,
        url: '/api/edx_proctoring/v1/proctored_exam/attempt/course_id/'
    });
    this.edx.instructor_dashboard.proctoring.ProctoredExamAttemptCollection = edx.instructor_dashboard.proctoring.ProctoredExamAttemptCollection;
}).call(this, Backbone);

;var edx = edx || {};
(function(Backbone) {

    edx.instructor_dashboard = edx.instructor_dashboard || {};
    edx.instructor_dashboard.proctoring = edx.instructor_dashboard.proctoring || {};

    edx.instructor_dashboard.proctoring.ProctoredExamCollection = Backbone.Collection.extend({
        /* model for a collection of ProctoredExamAllowance */
        model: ProctoredExamModel,
        url: '/api/edx_proctoring/v1/proctored_exam/exam/course_id/'
    });
    this.edx.instructor_dashboard.proctoring.ProctoredExamCollection = edx.instructor_dashboard.proctoring.ProctoredExamCollection;
}).call(this, Backbone);

;// Backbone.ModalDialog.js v0.3.2
//
// Copyright (C)2012 Gareth Elms
// Distributed under MIT License
//
// Documentation and full license availabe at:
// https://github.com/GarethElms/BackboneJSModalView

Backbone.ModalView =
    Backbone.View.extend(
        {
            name: "ModalView",
            modalBlanket: null,
            modalContainer: null,
            defaultOptions: {
                fadeInDuration: 150,
                fadeOutDuration: 150,
                showCloseButton: true,
                bodyOverflowHidden: false,
                setFocusOnFirstFormControl: true,
                targetContainer: document.body,
                slideFromAbove: false,
                slideFromBelow: false,
                slideDistance: 150,
                closeImageUrl: "/static/proctoring/close-modal.png",
                closeImageHoverUrl: "/static/proctoring/close-modal-hover.png",
                showModalAtScrollPosition: true,
                permanentlyVisible: false,
                backgroundClickClosesModal: true,
                pressingEscapeClosesModal: true,
                css: {
                    "border": "1px solid #111",
                    "display": "block",
                    "background-color": "#fff",
                    "-webkit-box-shadow": "0px 0px 15px 4px rgba(0, 0, 0, 0.5)",
                    "-moz-box-shadow": "0px 0px 15px 4px rgba(0, 0, 0, 0.5)",
                    "box-shadow": "0px 0px 15px 4px rgba(0, 0, 0, 0.5)",
                    "-webkit-border-radius": "10px",
                    "-moz-border-radius": "10px",
                    "border-radius": "6px",
                    "padding": "0px"
                }
            },

            initialize: function () {
            },
            events: {
            },

            showModalBlanket: function () {
                return this.ensureModalBlanket().fadeIn(this.options.fadeInDuration);
            },

            hideModalBlanket: function () {
                return this.modalBlanket.fadeOut(this.options.fadeOutDuration);
            },

            ensureModalContainer: function (target) {
                if (target != null) {
                    // A target is passed in, we need to re-render the modal container into the target.
                    if (this.modalContainer != null) {
                        this.modalContainer.remove();
                        this.modalContainer = null;
                    }
                }

                if (this.modalContainer == null) {
                    this.modalContainer =
                        $("<div id='modalContainer'>")
                            .css({
                                "z-index": "99999",
                                "position": "relative",
                                "-webkit-border-radius": "6px",
                                "-moz-border-radius": "6px",
                                "border-radius": "6px"
                            })
                            .appendTo(target);
                }

                return this.modalContainer;
            },

            ensureModalBlanket: function () {
                this.modalBlanket = $("#modal-blanket");

                if (this.modalBlanket.length == 0) {
                    this.modalBlanket =
                        $("<div id='modal-blanket'>")
                            .css(
                            {
                                position: "absolute",
                                top: 0,
                                left: 0,
                                height: $(document).height(), // Span the full document height...
                                width: "100%", // ...and full width
                                opacity: 0.5, // Make it slightly transparent
                                backgroundColor: "#000",
                                "z-index": 99900
                            })
                            .appendTo(document.body)
                            .hide();
                }
                else {
                    // Ensure the blanket spans the whole document, screen may have been updated.
                    this.modalBlanket.css(
                        {
                            height: $(document).height(), // Span the full document height...
                            width: "100%" // ...and full width
                        });
                }

                return this.modalBlanket;
            },

            keyup: function (event) {
                if (event.keyCode == 27 && this.options.pressingEscapeClosesModal) {
                    this.hideModal();
                }
            },

            click: function (event) {
                if (event.target.id == "modal-blanket" && this.options.backgroundClickClosesModal) {
                    this.hideModal();
                }
            },

            setFocusOnFirstFormControl: function () {
                var controls = $("input, select, email, url, number, range, date, month, week, time, datetime, datetime-local, search, color", $(this.el));
                if (controls.length > 0) {
                    $(controls[0]).focus();
                }
            },

            hideModal: function () {
                this.trigger("closeModalWindow");

                this.hideModalBlanket();
                $(document.body).unbind("keyup", this.keyup);
                this.modalBlanket.unbind("click", this.click);

                if (this.options.bodyOverflowHidden === true) {
                    $(document.body).css("overflow", this.originalBodyOverflowValue);
                }

                var container = this.modalContainer;
                $(this.modalContainer)
                    .fadeOut(
                    this.options.fadeOutDuration,
                    function () {
                        container.remove();
                    });
            },

            getCoordinate: function (coordinate, css) {
                if (typeof( css[coordinate]) !== "undefined") {
                    var value = css[coordinate];
                    delete css[coordinate]; // Don't apply positioning to the $el, we apply it to the modal container. Remove it from options.css

                    return value;
                }
            },

            recenter: function () {
                return this.recentre();
            },

            recentre: // Re-centre the modal dialog after it has been displayed. Useful if the height changes after initial rendering eg; jquery ui tabs will hide tab sections
                function () {
                    var $el = $(this.el);
                    var coords = {
                        top: this.getCoordinate("top", this.options.css),
                        left: this.getCoordinate("left", this.options.css),
                        right: this.getCoordinate("right", this.options.css),
                        bottom: this.getCoordinate("bottom", this.options.css),
                        isEmpty: function () {
                            return (this.top == null && this.left == null && this.right == null && this.bottom == null);
                        }
                    };

                    var offsets = this.getOffsets();
                    var centreY = $(window).height() / 2;
                    var centreX = $(window).width() / 2;
                    var modalContainer = this.modalContainer;
                    var positionY = centreY - ($el.outerHeight() / 2);
                    modalContainer.css({"top": (positionY + offsets.y) + "px"});

                    var positionX = centreX - ($el.outerWidth() / 2);
                    modalContainer.css({"left": (positionX + offsets.x) + "px"});

                    return this;
                },

            getOffsets: function () {
                var offsetY = 0, offsetX = 0;
                if (this.options.showModalAtScrollPosition) {
                    offsetY = $(document).scrollTop(),
                        offsetX = $(document).scrollLeft()
                }

                return {x: offsetX, y: offsetY};
            },

            showModal: function (options) {
                this.defaultOptions.targetContainer = document.body;
                this.options = $.extend(true, {}, this.defaultOptions, options, this.options);

                if (this.options.permanentlyVisible) {
                    this.options.showCloseButton = false;
                    this.options.backgroundClickClosesModal = false;
                    this.options.pressingEscapeClosesModal = false;
                }

                //Set the center alignment padding + border see css style
                var $el = $(this.el);

                var centreY = $(window).height() / 2;
                var centreX = $(window).width() / 2;
                var modalContainer = this.ensureModalContainer(this.options.targetContainer).empty();

                $el.addClass("modal");

                var coords = {
                    top: this.getCoordinate("top", this.options.css),
                    left: this.getCoordinate("left", this.options.css),
                    right: this.getCoordinate("right", this.options.css),
                    bottom: this.getCoordinate("bottom", this.options.css),
                    isEmpty: function () {
                        return (this.top == null && this.left == null && this.right == null && this.bottom == null);
                    }
                };

                $el.css(this.options.css);

                this.showModalBlanket();
                this.keyup = _.bind(this.keyup, this);
                this.click = _.bind(this.click, this);
                $(document.body).keyup(this.keyup); // This handler is unbound in hideModal()
                this.modalBlanket.click(this.click); // This handler is unbound in hideModal()

                if (this.options.bodyOverflowHidden === true) {
                    this.originalBodyOverflowValue = $(document.body).css("overflow");
                    $(document.body).css("overflow", "hidden");
                }

                modalContainer
                    .append($el);

                modalContainer.css({
                    "opacity": 0,
                    "position": "absolute",
                    "z-index": 999999});

                var offsets = this.getOffsets();

                // Only apply default centre coordinates if no css positions have been supplied
                if (coords.isEmpty()) {
                    var positionY = centreY - ($el.outerHeight() / 2);
                    if (positionY < 10) positionY = 10;

                    // Overriding the coordinates with explicit values if they are passed in
                    if (typeof( this.options.y) !== "undefined") {
                        positionY = this.options.y;
                    }
                    else {
                        positionY += offsets.y;
                    }

                    modalContainer.css({"top": positionY + "px"});

                    var positionX = centreX - ($el.outerWidth() / 2);
                    // Overriding the coordinates with explicit values if they are passed in
                    if (typeof( this.options.x) !== "undefined") {
                        positionX = this.options.x;
                    }
                    else {
                        positionX += offsets.x;
                    }

                    modalContainer.css({"left": positionX + "px"});
                }
                else {
                    if (coords.top != null) modalContainer.css({"top": coords.top + offsets.y});
                    if (coords.left != null) modalContainer.css({"left": coords.left + offsets.x});
                    if (coords.right != null) modalContainer.css({"right": coords.right});
                    if (coords.bottom != null) modalContainer.css({"bottom": coords.bottom});
                }

                if (this.options.setFocusOnFirstFormControl) {
                    this.setFocusOnFirstFormControl();
                }

                if (this.options.showCloseButton) {
                    var view = this;
                    var image =
                        $("<a href='#' id='modalCloseButton'>&#160;</a>")
                            .css({
                                "position": "absolute",
                                "top": "-8px",
                                "right": "-495px",
                                "width": "32px",
                                "height": "32px",
                                "z-index": "999999",
                                "background": "transparent url(" + view.options.closeImageUrl + ") top left no-repeat",
                                "text-decoration": "none"})
                            .appendTo(this.modalContainer)
                            .hover(
                            function () {
                                $(this).css("background-image", "url(" + view.options.closeImageHoverUrl + ") !important");
                            },
                            function () {
                                $(this).css("background-image", "url(" + view.options.closeImageUrl + ") !important");
                            })
                            .click(
                            function (event) {
                                event.preventDefault();
                                view.hideModal();
                            });
                }

                var animateProperties = {opacity: 1};
                var modalOffset = modalContainer.offset();

                if (this.options.slideFromAbove) {
                    modalContainer.css({"top": (modalOffset.top - this.options.slideDistance) + "px"});
                    animateProperties.top = coords.top;
                }

                if (this.options.slideFromBelow) {
                    modalContainer.css({"top": (modalOffset.top + this.options.slideDistance) + "px"});
                    animateProperties.top = coords.top;
                }

                this.modalContainer.animate(animateProperties, this.options.fadeInDuration);

                return this;
            }
        });
;var edx = edx || {};

(function (Backbone, $, _, gettext) {
    'use strict';

    edx.instructor_dashboard = edx.instructor_dashboard || {};
    edx.instructor_dashboard.proctoring = edx.instructor_dashboard.proctoring || {};

    edx.instructor_dashboard.proctoring.AddAllowanceView = Backbone.ModalView.extend({
        name: "AddAllowanceView",
        template: null,
        template_url: '/static/proctoring/templates/add-new-allowance.underscore',
        initialize: function (options) {
            this.proctored_exams = options.proctored_exams;
            this.proctored_exam_allowance_view = options.proctored_exam_allowance_view;
            this.course_id = options.course_id;
            this.allowance_types = options.allowance_types;
            this.model = new edx.instructor_dashboard.proctoring.ProctoredExamAllowanceModel();
            _.bindAll(this, "render");
            this.loadTemplateData();
            //Backbone.Validation.bind( this,  {valid:this.hideError, invalid:this.showError});
        },
        events: {
            "submit form": "addAllowance",
            "change #proctored_exam": 'selectExam',
            "change #allowance_type": 'selectAllowance'
        },
        loadTemplateData: function () {
            var self = this;
            $.ajax({url: self.template_url, dataType: "html"})
                .error(function (jqXHR, textStatus, errorThrown) {

                })
                .done(function (template_data) {
                    self.template = _.template(template_data);
                    self.render();
                    self.showModal();
                    self.updateCss();
                    self.selectExamAtIndex(0);
                });
        },
        updateCss: function() {
            var $el = $(this.el);
            $el.find('.modal-header').css({
                "color": "#1580b0",
                "font-size": "20px",
                "font-weight": "600",
                "line-height": "normal",
                "padding": "10px 15px",
                "border-bottom": "1px solid #ccc"
            });
            $el.find('form').css({
                "padding": "15px"
            });
            $el.find('form table.compact td').css({
                "vertical-align": "middle",
                "padding": "4px 8px"
            });
            $el.find('form label').css({
                "display": "block",
                "font-size": "14px",
                "margin": 0,
                "cursor": "default"
            });
            $el.find('form #minutes_label').css({
                "display": "inline-block"
            });
            $el.find('form input[type="text"]').css({
                "height": "26px",
                "padding": "1px 8px 2px",
                "font-size": "14px"
            });
            $el.find('form input[type="submit"]').css({
                "margin-top": "10px",
                "padding": "2px 32px"
            });
            $el.find('.error-message').css({
                "color": "#ff0000",
                "line-height": "normal",
                "font-size": "14px"
            });
            $el.find('.error-response').css({
                "color": "#ff0000",
                "line-height": "normal",
                "font-size": "14px",
                "padding": "0px 10px 5px 7px"
            });
             $el.find('form select').css({
                "padding": "2px 0px 2px 2px",
                "font-size": "16px"
            });
        },
        getCurrentFormValues: function () {
            return {
                proctored_exam: $("select#proctored_exam").val(),
                allowance_type: $("select#allowance_type").val(),
                allowance_value: $("#allowance_value").val(),
                user_info: $("#user_info").val()
            };
        },
        hideError: function (view, attr, selector) {
            var $element = view.$form[attr];

            $element.removeClass("error");
            $element.parent().find(".error-message").empty();
        },
        showError: function (view, attr, errorMessage, selector) {
            var $element = view.$form[attr];

            $element.addClass("error");
            var $errorMessage = $element.parent().find(".error-message");
            if ($errorMessage.length == 0) {
                $errorMessage = $("<div class='error-message'></div>");
                $element.parent().append($errorMessage);
            }

            $errorMessage.empty().append(errorMessage);
            this.updateCss();
        },
        addAllowance: function (event) {
            event.preventDefault();
            var error_response = $('.error-response');
            error_response.html();
            var values = this.getCurrentFormValues();
            var formHasErrors = false;


            var self = this;
            $.each(values, function(key, value) {
                if (value==="") {
                    formHasErrors = true;
                    self.showError(self, key, gettext("Required field"));
                }
                else {
                    self.hideError(self, key);
                }
            });

            if (!formHasErrors) {
                self.model.fetch({
                    headers: {
                        "X-CSRFToken": self.proctored_exam_allowance_view.getCSRFToken()
                    },
                    type: 'PUT',
                    data: {
                        'exam_id': values.proctored_exam,
                        'user_info': values.user_info,
                        'key': values.allowance_type,
                        'value': values.allowance_value
                    },
                    success: function () {
                        // fetch the allowances again.
                        error_response.html();
                        self.proctored_exam_allowance_view.collection.url = self.proctored_exam_allowance_view.initial_url + self.course_id + '/allowance';
                        self.proctored_exam_allowance_view.hydrate();
                        self.hideModal();
                    },
                    error: function(self, response, options) {
                        var data = $.parseJSON(response.responseText);
                        error_response.html(gettext(data.detail));
                    }
                });
            }
        },
        selectExamAtIndex: function (index) {
            var selectedExam = this.proctored_exams[index];

            if (selectedExam.is_proctored) {
                // Selected Exam is a Proctored or Practice-Proctored exam.
                if (selectedExam.is_practice_exam)
                    $('#exam_type_label').text(gettext('Practice Exam'));
                else
                    $('#exam_type_label').text(gettext('Proctored Exam'));

                // In case of Proctored Exams, we hide the Additional Time label and show the Allowance Types Select
                $('#additional_time_label').hide();
                $('select#allowance_type').val('additional_time_granted').show();
            }
            else {
                // Selected Exam is a Timed Exam.
                $('#exam_type_label').text(gettext('Timed Exam'));

                // In case of Timed Exams, we show the "Additional Time" label and hide the Allowance Types Select
                $('#additional_time_label').show();
                // Even though we have the Select element hidden, the backend will still be using
                // the Select's value for the allowance type (key).
                $('select#allowance_type').val('additional_time_granted').hide();
            }
            this.updateAllowanceLabels('additional_time_granted');
        },
        selectExam: function (event) {
            this.selectExamAtIndex($('#proctored_exam')[0].selectedIndex);
        },
        selectAllowance: function (event) {
            this.updateAllowanceLabels($('#allowance_type').val());
        },
        updateAllowanceLabels: function (selectedAllowanceType) {
            if (selectedAllowanceType == 'additional_time_granted') {
                $('#minutes_label').show();
                $('#allowance_value_label').text(gettext('Additional Time'));
            }
            else {
                $('#minutes_label').hide();
                $('#allowance_value_label').text(gettext('Value'));
            }
        },

        render: function () {
            $(this.el).html(this.template({
                proctored_exams: this.proctored_exams,
                allowance_types: this.allowance_types
            }));

            this.$form = {
                proctored_exam: this.$("select#proctored_exam"),
                allowance_type: this.$("select#allowance_type"),
                allowance_value: this.$("#allowance_value"),
                user_info: this.$("#user_info")
            };
            return this;
        }
    });
}).call(this, Backbone, $, _, gettext);

;var edx = edx || {};

(function (Backbone, $, _) {
    'use strict';

    edx.instructor_dashboard = edx.instructor_dashboard || {};
    edx.instructor_dashboard.proctoring = edx.instructor_dashboard.proctoring || {};

    edx.instructor_dashboard.proctoring.ProctoredExamAllowanceView = Backbone.View.extend({
        initialize: function () {

            this.allowance_types = [
                ['additional_time_granted', gettext('Additional Time (minutes)')],
                ['review_policy_exception', gettext('Review Policy Exception')]
            ];

            this.collection = new edx.instructor_dashboard.proctoring.ProctoredExamAllowanceCollection();
            this.proctoredExamCollection = new edx.instructor_dashboard.proctoring.ProctoredExamCollection();
            /* unfortunately we have to make some assumptions about what is being set up in HTML */
            this.setElement($('.special-allowance-container'));
            this.course_id = this.$el.data('course-id');

            /* this should be moved to a 'data' attribute in HTML */
            this.template_url = '/static/proctoring/templates/course_allowances.underscore';
            this.template = null;
            this.initial_url = this.collection.url;
            this.allowance_url = this.initial_url + 'allowance';
            /* re-render if the model changes */
            this.listenTo(this.collection, 'change', this.collectionChanged);

            /* Load the static template for rendering. */
            this.loadTemplateData();

            this.proctoredExamCollection.url = this.proctoredExamCollection.url + this.course_id;
            this.collection.url = this.initial_url + this.course_id + '/allowance';

        },
        events: {
            'click #add-allowance': 'showAddModal',
            'click .remove_allowance': 'removeAllowance'
        },
        getCSRFToken: function () {
            var cookieValue = null;
            var name = 'csrftoken';
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        },
        removeAllowance: function (event) {
            var element = $(event.currentTarget);
            var userID = element.data('user-id');
            var examID = element.data('exam-id');
            var key = element.data('key-name');
            var self = this;
            self.collection.url = this.allowance_url;
            self.collection.fetch(
                {
                    headers: {
                        "X-CSRFToken": this.getCSRFToken()
                    },
                    type: 'DELETE',
                    data: {
                        'exam_id': examID,
                        'user_id': userID,
                        'key': key
                    },
                    success: function () {
                        // fetch the allowances again.
                        self.collection.url = self.initial_url + self.course_id + '/allowance';
                        self.hydrate();
                    }
                }
            );
            event.stopPropagation();
            event.preventDefault();
        },
        /*
         This entry point is required for Instructor Dashboard
         See setup_instructor_dashboard_sections() in
         instructor_dashboard.coffee (in edx-platform)
         */
        constructor: function (section) {
            /* the Instructor Dashboard javascript expects this to be set up */
            $(section).data('wrapper', this);

            this.initialize({});
        },
        onClickTitle: function () {
            // called when this is selected in the instructor dashboard
            return;
        },
        loadTemplateData: function () {
            var self = this;
            $.ajax({url: self.template_url, dataType: "html"})
                .error(function (jqXHR, textStatus, errorThrown) {

                })
                .done(function (template_data) {
                    self.template = _.template(template_data);
                    self.hydrate();
                });
        },
        hydrate: function () {
            /* This function will load the bound collection */

            /* add and remove a class when we do the initial loading */
            /* we might - at some point - add a visual element to the */
            /* loading, like a spinner */
            var self = this;
            self.collection.fetch({
                success: function () {
                    self.render();
                }
            });
        },
        collectionChanged: function () {
            this.hydrate();
        },
        render: function () {
            if (this.template !== null) {
                var self = this;
                this.collection.each(function(item){
                    var key = item.get('key');
                    var i
                    for (i=0; i<self.allowance_types.length; i++) {
                        if (key === self.allowance_types[i][0]) {
                            item.set('key_display_name', self.allowance_types[i][1]);
                            break;
                        }
                    }
                    if (!item.has('key_display_name')) {
                        item.set('key_display_name', key);
                    }
                });
                var html = this.template({proctored_exam_allowances: this.collection.toJSON()});
                this.$el.html(html);
            }
        },
        showAddModal: function (event) {
            var self = this;
            self.proctoredExamCollection.fetch({
                success: function () {
                    var add_allowance_view = new edx.instructor_dashboard.proctoring.AddAllowanceView({
                        course_id: self.course_id,
                        proctored_exams: self.proctoredExamCollection.toJSON(),
                        proctored_exam_allowance_view: self,
                        allowance_types: self.allowance_types
                    });
                }
            });
            event.stopPropagation();
            event.preventDefault();
        }
    });
    this.edx.instructor_dashboard.proctoring.ProctoredExamAllowanceView = edx.instructor_dashboard.proctoring.ProctoredExamAllowanceView;
}).call(this, Backbone, $, _);

;var edx = edx || {};

(function (Backbone, $, _, gettext) {
    'use strict';

    edx.instructor_dashboard = edx.instructor_dashboard || {};
    edx.instructor_dashboard.proctoring = edx.instructor_dashboard.proctoring || {};
    var examStatusReadableFormat = {
        eligible: gettext('Eligible'),
        created: gettext('Created'),
        download_software_clicked: gettext('Download Software Clicked'),
        ready_to_start: gettext('Ready to start'),
        started: gettext('Started'),
        ready_to_submit: gettext('Ready to submit'),
        declined: gettext('Declined'),
        timed_out: gettext('Timed out'),
        second_review_required: gettext('Second Review Required'),
        submitted: gettext('Submitted'),
        verified: gettext('Verified'),
        rejected: gettext('Rejected'),
        error: gettext('Error')
    };
    var viewHelper = {
        getDateFormat: function(date) {
            if (date) {
                return new Date(date).toString('MMM dd, yyyy h:mmtt');
            }
            else {
                return '---';
            }

        },
        getExamAttemptStatus: function(status) {
            if (status in examStatusReadableFormat) {
                return examStatusReadableFormat[status]
            }
            else {
                return status
            }
        }
    };
    edx.instructor_dashboard.proctoring.ProctoredExamAttemptView = Backbone.View.extend({
        initialize: function (options) {
            this.setElement($('.student-proctored-exam-container'));
            this.collection = new edx.instructor_dashboard.proctoring.ProctoredExamAttemptCollection();
            this.tempate_url = '/static/proctoring/templates/student-proctored-exam-attempts.underscore';
            this.model = new edx.instructor_dashboard.proctoring.ProctoredExamAttemptModel();
            this.course_id = this.$el.data('course-id');
            this.template = null;

            this.initial_url = this.collection.url;
            this.attempt_url = this.model.url;
            this.collection.url = this.initial_url + this.course_id;
            this.inSearchMode = false;
            this.searchText = "";

            /* re-render if the model changes */
            this.listenTo(this.collection, 'change', this.collectionChanged);

            /* Load the static template for rendering. */
            this.loadTemplateData();
        },
        events: {
            "click .remove-attempt": "onRemoveAttempt",
            'click li > a.target-link': 'getPaginatedAttempts',
            'click .search-attempts > span.search': 'searchAttempts',
            'click .search-attempts > span.clear-search': 'clearSearch'
        },
        searchAttempts: function(event) {
            var searchText = $('#search_attempt_id').val();
            if (searchText !== "") {
                this.inSearchMode = true;
                this.searchText = searchText;
                this.collection.url = this.initial_url + this.course_id + "/search/" + searchText;
                this.hydrate();
                event.stopPropagation();
                event.preventDefault();
            }
        },
        clearSearch: function(event) {
            this.inSearchMode = false;
            this.searchText = "";
            this.collection.url = this.initial_url + this.course_id;
            this.hydrate();
            event.stopPropagation();
            event.preventDefault();
        },
        getPaginatedAttempts: function(event) {
            var target = $(event.currentTarget);
            this.collection.url = target.data('target-url');
            this.hydrate();
            event.stopPropagation();
            event.preventDefault();
        },
        getCSRFToken: function () {
            var cookieValue = null;
            var name = 'csrftoken';
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        },
        loadTemplateData: function () {
            var self = this;
            $.ajax({url: self.tempate_url, dataType: "html"})
                .error(function (jqXHR, textStatus, errorThrown) {

                })
                .done(function (template_data) {
                    self.template = _.template(template_data);
                    self.hydrate();
                });
        },
        hydrate: function () {
            /* This function will load the bound collection */

            /* add and remove a class when we do the initial loading */
            /* we might - at some point - add a visual element to the */
            /* loading, like a spinner */
            var self = this;
            self.collection.fetch({
                success: function () {
                    self.render();
                }
            });
        },
        collectionChanged: function () {
            this.hydrate();
        },
        render: function () {
            if (this.template !== null) {

                var data_json = this.collection.toJSON()[0];

                // calculate which pages ranges to display
                // show no more than 5 pages at the same time
                var start_page = data_json.pagination_info.current_page - 2;

                if (start_page < 1) {
                    start_page = 1;
                }

                var end_page = start_page + 4;

                if (end_page > data_json.pagination_info.total_pages) {
                    end_page = data_json.pagination_info.total_pages;
                }

                _.each(data_json.proctored_exam_attempts, function(proctored_exam_attempt) {
                    if (proctored_exam_attempt.proctored_exam.is_proctored) {
                        if (proctored_exam_attempt.proctored_exam.is_practice_exam) {
                            proctored_exam_attempt.exam_attempt_type = gettext('Practice');
                        } else {
                            proctored_exam_attempt.exam_attempt_type = gettext('Proctored');
                        }
                    } else {
                        proctored_exam_attempt.exam_attempt_type = gettext('Timed');
                    }
                });

                var data = {
                    proctored_exam_attempts: data_json.proctored_exam_attempts,
                    pagination_info: data_json.pagination_info,
                    attempt_url: data_json.attempt_url,
                    inSearchMode: this.inSearchMode,
                    searchText: this.searchText,
                    start_page: start_page,
                    end_page: end_page
                };
                _.extend(data, viewHelper);
                var html = this.template(data);
                this.$el.html(html);
           }
        },
        onRemoveAttempt: function (event) {
            event.preventDefault();

            // confirm the user's intent
            if (!confirm(gettext('Are you sure you want to remove this student\'s exam attempt?'))) {
                return;
            }
            $('body').css('cursor', 'wait');
            var $target = $(event.currentTarget);
            var attemptId = $target.data("attemptId");

            var self = this;
            self.model.url = this.attempt_url + attemptId;
            self.model.fetch( {
                headers: {
                    "X-CSRFToken": this.getCSRFToken()
                },
                type: 'DELETE',
                success: function () {
                    // fetch the attempts again.
                    self.hydrate();
                    $('body').css('cursor', 'auto');
                }
            });
        }
    });
    this.edx.instructor_dashboard.proctoring.ProctoredExamAttemptView = edx.instructor_dashboard.proctoring.ProctoredExamAttemptView;
}).call(this, Backbone, $, _, gettext);

;var edx = edx || {};

(function (Backbone, $, _, gettext) {
    'use strict';

    edx.courseware = edx.courseware || {};
    edx.courseware.proctored_exam = edx.courseware.proctored_exam || {};

    edx.courseware.proctored_exam.ProctoredExamView = Backbone.View.extend({
        initialize: function (options) {
            _.bindAll(this, "detectScroll");
            this.$el = options.el;
            this.timerBarTopPosition = this.$el.position().top;
            this.courseNavBarMarginTop = this.timerBarTopPosition - 3;
            this.model = options.model;
            this.templateId = options.proctored_template;
            this.template = null;
            this.timerId = null;
            this.timerTick = 0;
            this.secondsLeft = 0;
            /* give an extra 5 seconds where the timer holds at 00:00 before page refreshes */
            this.grace_period_secs = 5;
            this.poll_interval = 60;
            this.first_time_rendering = true;

            // we need to keep a copy here because the model will
            // get destroyed before onbeforeunload is called
            this.taking_as_proctored = false;

            var template_html = $(this.templateId).text();
            if (template_html !== null) {
                /* don't assume this backbone view is running on a page with the underscore templates */
                this.template = _.template(template_html);
            }

            var controls_template_html = $(this.examControlsTemplateId).text();
            if (controls_template_html !== null) {
                /* don't assume this backbone view is running on a page with the underscore templates */
                this.controls_template = _.template(controls_template_html);
            }

            /* re-render if the model changes */
            this.listenTo(this.model, 'change', this.modelChanged);

            $(window).unbind('beforeunload', this.unloadMessage);

            /* make the async call to the backend REST API */
            /* after it loads, the listenTo event will file and */
            /* will call into the rendering */
            this.model.fetch();
        },
        events: {
            'click #toggle_timer': 'toggleTimerVisibility'
        },
        detectScroll: function(event) {
            if ($(event.currentTarget).scrollTop() > this.timerBarTopPosition) {
                $(".proctored_exam_status").addClass('is-fixed');
                $(".wrapper-course-material").css('margin-top', this.courseNavBarMarginTop + 'px');
            }
            else {
                $(".proctored_exam_status").removeClass('is-fixed');
                $(".wrapper-course-material").css('margin-top', '0');
            }

        },
        modelChanged: function () {
            // if we are a proctored exam, then we need to alert user that he/she
            // should not be navigating around the courseware
            var taking_as_proctored = this.model.get('taking_as_proctored');
            var time_left = this.model.get('time_remaining_seconds') > 0;
            this.secondsLeft = this.model.get('time_remaining_seconds');
            var status = this.model.get('attempt_status');
            var in_courseware = document.location.href.indexOf('/courses/' + this.model.get('course_id') + '/courseware/') > -1;

            if ( taking_as_proctored && time_left && in_courseware && status !== 'started'){
                $(window).bind('beforeunload', this.unloadMessage);
            } else {
                // remove callback on unload event
                $(window).unbind('beforeunload', this.unloadMessage);
            }
            var desktopApplicationJsUrl = this.model.get('desktop_application_js_url');
            if (desktopApplicationJsUrl && !edx.courseware.proctored_exam.configuredWorkerURL) {
              edx.courseware.proctored_exam.configuredWorkerURL = desktopApplicationJsUrl;
            }

            this.render();
        },
        render: function () {
            if (this.template !== null) {
                if (
                    this.model.get('in_timed_exam') &&
                    this.model.get('time_remaining_seconds') > 0 &&
                    this.model.get('attempt_status') !== 'error'
                ) {
                    // add callback on scroll event
                    $(window).bind('scroll', this.detectScroll);

                    var html = this.template(this.model.toJSON());
                    this.$el.html(html);
                    this.$el.show();
                    // only render the accesibility string the first time we render after
                    // page load (then we will update on time left warnings)
                    if (this.first_time_rendering) {
                        this.accessibility_time_string = this.model.get('accessibility_time_string');
                        this.$el.find('.timer-announce').html(this.accessibility_time_string);
                        this.first_time_rendering = false;
                    }
                    this.updateRemainingTime(this);
                    this.timerId = setInterval(this.updateRemainingTime, 1000, this);

                    // Bind a click handler to the exam controls
                    var self = this;
                    $('.exam-button-turn-in-exam').click(function(){
                        $(window).unbind('beforeunload', self.unloadMessage);

                        $.ajax({
                            url: '/api/edx_proctoring/v1/proctored_exam/attempt/' + self.model.get('attempt_id'),
                            type: 'PUT',
                            data: {
                              action: 'stop'
                            },
                            success: function() {
                              // change the location of the page to the active exam page
                              // which will reflect the new state of the attempt
                              location.href = self.model.get('exam_url_path');
                            }
                        });
                    });
                }
                else {
                    // remove callback on scroll event
                    $(window).unbind('scroll', this.detectScroll);
                }
            }
            return this;
        },
        reloadPage: function () {
          location.reload();
        },
        unloadMessage: function  () {
            return gettext("Are you sure you want to leave this page? \n" +
                "To pass your proctored exam you must also pass the online proctoring session review.");
        },
        updateRemainingTime: function (self) {
            var pingInterval = self.model.get('ping_interval');
            self.timerTick ++;
            self.secondsLeft --;
            if (
                self.timerTick % pingInterval === pingInterval / 2 &&
                edx.courseware.proctored_exam.configuredWorkerURL
            ) {
                edx.courseware.proctored_exam.pingApplication(pingInterval).catch(self.endExamForFailureState.bind(self));
            }
            if (self.timerTick % self.poll_interval === 0) {
                var url = self.model.url + '/' + self.model.get('attempt_id');
                var queryString = '?sourceid=in_exam&proctored=' + self.model.get('taking_as_proctored');
                $.ajax(url + queryString).success(function(data) {
                    if (data.status === 'error') {
                        // The proctoring session is in error state
                        // refresh the page to bring up the new Proctoring state from the backend.
                        clearInterval(self.timerId); // stop the timer once the time finishes.
                        $(window).unbind('beforeunload', self.unloadMessage);
                        location.reload();
                    }
                    else {
                        self.secondsLeft = data.time_remaining_seconds;
                        self.accessibility_time_string = data.accessibility_time_string;
                    }
                });
            }
            var oldState = self.$el.find('div.exam-timer').attr('class');
            var newState = self.model.getRemainingTimeState(self.secondsLeft);

            if (newState !== null && !self.$el.find('div.exam-timer').hasClass(newState)) {
                self.$el.find('div.exam-timer').removeClass("warning critical");
                self.$el.find('div.exam-timer').addClass("low-time " + newState);
                // refresh accessibility string
                self.$el.find('.timer-announce').html(self.accessibility_time_string);
            }

            self.$el.find('span#time_remaining_id b').html(self.model.getFormattedRemainingTime(self.secondsLeft));
            if (self.secondsLeft <= -self.grace_period_secs) {
                clearInterval(self.timerId); // stop the timer once the time finishes.
                $(window).unbind('beforeunload', this.unloadMessage);
                // refresh the page when the timer expired
                self.reloadPage();
            }
        },
        endExamForFailureState: function () {
            var self = this;
            return $.ajax({
                data: {
                    action: 'error'
                },
                url: this.model.url + '/' + this.model.get('attempt_id'),
                type: 'PUT'
            }).done(function(result) {
                if (result.exam_attempt_id) {
                    self.reloadPage();
                }
            });
      },
        toggleTimerVisibility: function (event) {
            var button = $(event.currentTarget);
            var icon = button.find('i');
            var timer = this.$el.find('span#time_remaining_id b');
            if (timer.hasClass('timer-hidden')) {
                timer.removeClass('timer-hidden');
                button.attr('aria-pressed', 'false');
                icon.removeClass('fa-eye').addClass('fa-eye-slash');
            } else {
                timer.addClass('timer-hidden');
                button.attr('aria-pressed', 'true');
                icon.removeClass('fa-eye-slash').addClass('fa-eye');
            }
            event.stopPropagation();
            event.preventDefault();
        }
    });
    this.edx.courseware.proctored_exam.ProctoredExamView = edx.courseware.proctored_exam.ProctoredExamView;
}).call(this, Backbone, $, _, gettext);

;var edx = edx || {};

(function (Backbone, $, _) {
    'use strict';

    edx.instructor_dashboard = edx.instructor_dashboard || {};
    edx.instructor_dashboard.proctoring = edx.instructor_dashboard.proctoring || {};
    edx.instructor_dashboard.proctoring.ProctoredExamDashboardView = Backbone.View.extend({
        initialize: function (options) {
            this.setElement($('.student-review-dashboard-container'));
            this.tempate_url = '/static/proctoring/templates/dashboard.underscore';
            this.iframeHTML = null;
            this.doRender = true;
            this.context = {
                dashboardURL: '/api/edx_proctoring/v1/instructor/' + this.$el.data('course-id')
            };
            var self = this;

            $('#proctoring-accordion').on('accordionactivate', function(event, ui) {
                self.render(ui);
            });
            /* Load the static template for rendering. */
            this.loadTemplateData();
        },
        loadTemplateData: function () {
            var self = this;
            $.ajax({url: self.tempate_url, dataType: "html"})
                .error(function (jqXHR, textStatus, errorThrown) {

                })
                .done(function (template_html) {
                    self.iframeHTML = _.template(template_html)(self.context);
                });
        },
        render: function (ui) {
            if (ui.newPanel.eq(this.$el) && this.doRender && this.iframeHTML) {
                this.$el.html(this.iframeHTML);
                this.doRender = false;
            }
        },
    });
    this.edx.instructor_dashboard.proctoring.ProctoredExamDashboardView = edx.instructor_dashboard.proctoring.ProctoredExamDashboardView;
}).call(this, Backbone, $, _);

;$(function() {
    var proctored_exam_view = new edx.courseware.proctored_exam.ProctoredExamView({
        el: $(".proctored_exam_status"),
        proctored_template: '#proctored-exam-status-tpl',
        model: new ProctoredExamModel()
    });
    proctored_exam_view.render();
});

;var edx = edx || {};

(function($) {
  'use strict';

  var ONE_MINUTE_MS = 60000;

  var actionToMessageTypesMap = {
    'submit': {
      promptEventName: 'endExamAttempt',
      successEventName: 'examAttemptEnded',
      failureEventName: 'examAttemptEndFailed'
    },
    'start': {
      promptEventName: 'startExamAttempt',
      successEventName: 'examAttemptStarted',
      failureEventName: 'examAttemptStartFailed'
    },
    'ping': {
      promptEventName: 'ping',
      successEventName: 'echo',
      failureEventName: 'pingFailed'

    }
  };

  /**
   * Launch modals, handling a11y focus behavior
   *
   * Note: don't try to leverage this for the heartbeat; the DOM
   * structure this depends on doesn't live everywhere that handler
   * needs to live
   */
   function accessibleError(title, message) {
     accessible_modal(
       "#accessible-error-modal #confirm_open_button",
       "#accessible-error-modal .close-modal",
       "#accessible-error-modal",
       ".content-wrapper"
     );
     $("#accessible-error-modal #confirm_open_button").click();
     $("#accessible-error-modal .message-title").html(message);
     $('#accessible-error-modal #acessible-error-title').html(title);
     $("#accessible-error-modal .ok-button")
       .html(gettext("OK"))
       .off('click.closeModal')
       .on('click.closeModal', function(){
         $("#accessible-error-modal .close-modal").click();
       });
  };


  function workerPromiseForEventNames(eventNames) {
    return function() {
      var proctoringBackendWorker = new Worker(edx.courseware.proctored_exam.configuredWorkerURL);
      return new Promise(function(resolve, reject) {
        var responseHandler = function(e) {
          if (e.data.type === eventNames.successEventName) {
            proctoringBackendWorker.removeEventListener('message', responseHandler);
            proctoringBackendWorker.terminate();
            resolve();
          } else {
            reject();
          }
        };
        proctoringBackendWorker.addEventListener('message', responseHandler);
        proctoringBackendWorker.postMessage({ type: eventNames.promptEventName});
      });
    };
  }

  function timeoutPromise(timeoutMilliseconds) {
    return new Promise(function(resolve, reject) {
      setTimeout(reject, timeoutMilliseconds);
    });
  }

  // Update the state of the attempt
  function updateExamAttemptStatusPromise(actionUrl, action) {
    return function() {
      return Promise.resolve($.ajax({
        url: actionUrl,
        type: 'PUT',
        data: {
          action: action
        }
      }));
    };
  }

  function reloadPage() {
    location.reload();
  }

  function setActionButtonLoadingState($button) {
    $button.prop('disabled', true);
    $button.html($button.data('loading-text'));
  }

  function setActionButtonSteadyState($button) {
    $button.prop('disabled', false);
    $button.html($button.data('cta-text'));
  }

  function errorHandlerGivenMessage($button, title, message) {
    setActionButtonSteadyState($button);
    return function() {
      accessibleError(title, message);
    };
  }


  edx.courseware = edx.courseware || {};
  edx.courseware.proctored_exam = edx.courseware.proctored_exam || {};
  edx.courseware.proctored_exam.examStartHandler = function(e) {
    e.preventDefault();
    e.stopPropagation();

    var $this = $(this);
    var actionUrl = $this.data('change-state-url');
    var action = $this.data('action');

    setActionButtonLoadingState($this);

    var shouldUseWorker = window.Worker && edx.courseware.proctored_exam.configuredWorkerURL;
    if(shouldUseWorker) {
      workerPromiseForEventNames(actionToMessageTypesMap[action])()
        .then(updateExamAttemptStatusPromise(actionUrl, action))
        .then(reloadPage)
        .catch(errorHandlerGivenMessage(
          $this,
          gettext('Error Starting Exam'),
          gettext(
            'Something has gone wrong starting your exam. ' +
            'Please double-check that the application is running.'
          )
        ));
    } else {
      updateExamAttemptStatusPromise(actionUrl, action)()
        .then(reloadPage)
        .catch(errorHandlerGivenMessage(
          $this,
          gettext('Error Starting Exam'),
          gettext(
            'Something has gone wrong starting your exam. ' +
            'Please reload the page and start again.'
          )
        ));

    }
  };
  edx.courseware.proctored_exam.examEndHandler = function() {

    $(window).unbind('beforeunload');

    var $this = $(this);
    var actionUrl = $this.data('change-state-url');
    var action = $this.data('action');

    setActionButtonLoadingState($this);

    var shouldUseWorker = window.Worker &&
                          edx.courseware.proctored_exam.configuredWorkerURL &&
                          action === "submit";
    if(shouldUseWorker) {

      updateExamAttemptStatusPromise(actionUrl, action)()
        .then(workerPromiseForEventNames(actionToMessageTypesMap[action]))
        .then(reloadPage)
        .catch(errorHandlerGivenMessage(
          $this,
          gettext('Error Ending Exam'),
          gettext(
            'Something has gone wrong ending your exam. ' +
            'Please double-check that the application is running.'
          )
        ));
    } else {
      updateExamAttemptStatusPromise(actionUrl, action)()
        .then(reloadPage)
        .catch(errorHandlerGivenMessage(
          $this,
          gettext('Error Ending Exam'),
          gettext(
            'Something has gone wrong ending your exam. ' +
            'Please reload the page and start again.'
          )
        ));
    }
  }
  edx.courseware.proctored_exam.pingApplication = function(timeoutInSeconds) {
    return Promise.race([
      workerPromiseForEventNames(actionToMessageTypesMap.ping)(),
      timeoutPromise(timeoutInSeconds * 1000)
    ]);
  }
  edx.courseware.proctored_exam.accessibleError = accessibleError;
}).call(this, $);
