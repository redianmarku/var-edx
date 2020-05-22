'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _paragon = require('@edx/paragon');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('../constants');

var _utilities = require('../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-danger */


var CookieBanner = function (_Component) {
  _inherits(CookieBanner, _Component);

  function CookieBanner(props) {
    _classCallCheck(this, CookieBanner);

    var _this = _possibleConstructorReturn(this, (CookieBanner.__proto__ || Object.getPrototypeOf(CookieBanner)).call(this, props));

    _this.onClose = _this.onClose.bind(_this);

    _this.state = { open: false };
    return _this;
  }

  _createClass(CookieBanner, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.toggleDisplay(!(0, _utilities.hasViewedCookieBanner)());
    }
  }, {
    key: 'onClose',
    value: function onClose(event) {
      var _this2 = this;

      this.setState({ open: false }, function () {
        (0, _utilities.createHasViewedCookieBanner)();
        _this2.props.onClose(event);
      });
    }
  }, {
    key: 'toggleDisplay',
    value: function toggleDisplay(open) {
      this.setState({ open: open });
    }
  }, {
    key: 'render',
    value: function render() {
      var ietfTag = (0, _utilities.getIETFTag)();
      var open = this.state.open;


      if (open) {
        return _react2.default.createElement(
          'div',
          {
            lang: _constants.IETF_TAGS_TO_LANGUAGE_CODE[ietfTag],
            className: 'edx-cookie-banner-wrapper',
            role: 'complementary',
            'aria-label': _constants.IETF_TAGS_TO_CONTAINER_ROLE_LABEL[ietfTag],
            'aria-live': 'polite'
          },
          _react2.default.createElement(_paragon.StatusAlert, {
            className: ['edx-cookie-banner'],
            open: this.state.open,
            closeButtonAriaLabel: _constants.IETF_TAGS_TO_CLOSE_BUTTON_LABEL[ietfTag],
            dialog: _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: (0, _constants.getPolicyHTML)(ietfTag) } }),
            onClose: this.onClose
          })
        );
      }

      return false;
    }
  }]);

  return CookieBanner;
}(_react.Component);

CookieBanner.defaultProps = {
  onClose: function onClose() {}
};

CookieBanner.propTypes = {
  onClose: _propTypes2.default.func
};

exports.default = CookieBanner;