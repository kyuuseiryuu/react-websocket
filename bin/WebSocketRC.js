'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WebSocketRC = function (_React$Component) {
  _inherits(WebSocketRC, _React$Component);

  function WebSocketRC(props) {
    _classCallCheck(this, WebSocketRC);

    var _this = _possibleConstructorReturn(this, (WebSocketRC.__proto__ || Object.getPrototypeOf(WebSocketRC)).call(this, props));

    var url = props.url,
        protocol = props.protocol; // Config

    var onCreate = props.onCreate,
        onMessage = props.onMessage,
        onClose = props.onClose,
        onError = props.onError; // Event

    _this.state = {
      ws: new WebSocket(url, protocol),
      // Event
      onCreate: onCreate,
      onMessage: onMessage,
      onClose: onClose,
      onError: onError,
      // Config
      url: url,
      protocol: protocol
    };
    return _this;
  }

  _createClass(WebSocketRC, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setWebSocket();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.state.ws.close();
    }
  }, {
    key: 'setWebSocket',
    value: function setWebSocket() {
      var _this2 = this;

      var ws = this.state.ws;
      ws.onopen = function () {
        if (_this2.state.onCreate && ws.readyState === 1) {
          _this2.state.onCreate(ws);
        }
      };
      ws.onmessage = this.state.onMessage;
      ws.onerror = this.state.onError;
      ws.onclose = this.state.onClose;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          style: {
            display: 'none'
          }
        },
        'WebSocket React Component by KyuuSeiryuu.'
      );
    }
  }]);

  return WebSocketRC;
}(_react2.default.Component);

WebSocketRC.propTypes = {
  url: _propTypes2.default.string.isRequired,
  protocol: _propTypes2.default.string,
  onMessage: _propTypes2.default.func.isRequired,
  onCreate: _propTypes2.default.func,
  onClose: _propTypes2.default.func,
  onError: _propTypes2.default.func
};

exports.default = WebSocketRC;
//# sourceMappingURL=WebSocketRC.js.map