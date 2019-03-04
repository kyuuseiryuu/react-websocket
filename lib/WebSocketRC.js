'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tryToParseJson = function tryToParseJson(str) {
  try {
    return JSON.parse(str);
  } catch (e) {}
};

var WebSocketRC = function (_React$Component) {
  _inherits(WebSocketRC, _React$Component);

  function WebSocketRC(props) {
    _classCallCheck(this, WebSocketRC);

    var _this = _possibleConstructorReturn(this, (WebSocketRC.__proto__ || Object.getPrototypeOf(WebSocketRC)).call(this, props));

    _this.handleMessage = function (_ref) {
      var data = _ref.data;

      var json = tryToParseJson(data);
      if (json) {
        var action = json[_this.props.actionKey];
        var handler = _this.props.actionMap[action];
        if (action && handler) {
          handler(json);
        } else {
          _this.props.onJson(json);
        }
      } else {
        _this.props.onMessage(data);
      }
    };

    _this.closeOldSocket = function () {
      if (_this.ws && _this.ws.readyState === WebSocket.CONNECTING) {
        _this.shouldClose = true;
        _this.ws && _this.ws.close();
      }
    };

    var url = props.url,
        protocol = props.protocol;
    var _props$actionKey = props.actionKey,
        actionKey = _props$actionKey === undefined ? 'SYS_ACTION' : _props$actionKey,
        _props$actionMap = props.actionMap,
        actionMap = _props$actionMap === undefined ? {} : _props$actionMap;

    _this.shouldClose = false;
    _this.retryTimes = 1;
    _this.state = {
      url: url,
      protocol: protocol,
      actionKey: actionKey,
      actionMap: actionMap
    };
    return _this;
  }

  _createClass(WebSocketRC, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.initWebSocket();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.shouldClose = true;
      this.ws && this.ws.close();
    }
  }, {
    key: 'initWebSocket',
    value: function initWebSocket() {
      var _this2 = this;

      this.closeOldSocket();
      var ws = new WebSocket(this.props.url, this.props.protocol);
      ws.onclose = function () {
        if (!_this2.props.autoReconnect || // needn't reconnect
        _this2.shouldClose || // really want to close
        _this2.props.maxRetryTimes && _this2.retryTimes + 1 > _this2.props.maxRetryTimes) {
          _this2.props.onClose();
          return;
        }
        _this2.props.onRetry(_this2.retryTimes);
        _this2.retryTimes += 1;
        setTimeout(function () {
          _this2.initWebSocket();
        }, _this2.props.retryDelay);
      };
      ws.onerror = function (e) {
        _this2.props.onError(e);
        ws && ws.close();
      };
      ws.onmessage = this.handleMessage;
      var decorator = {
        send: function send(data) {
          var sendData = data.constructor === String ? data : JSON.stringify(data);
          ws.send(sendData);
        }
      };
      ws.onopen = function () {
        _this2.retryTimes = 1;
        _this2.ws = ws;
        _this2.props.onCreate(decorator, ws);
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        { style: { display: 'none' } },
        'WebSocket React Component by KyuuSeiryuu.'
      );
    }
  }]);

  return WebSocketRC;
}(_react2.default.Component);

WebSocketRC.defaultProps = {
  onMessage: function onMessage() {},
  onCreate: function onCreate() {},
  onClose: function onClose() {},
  onRetry: function onRetry() {},
  onError: function onError() {},
  onJson: function onJson() {},
  autoReconnect: false,
  maxRetryTimes: 3,
  retryDelay: 3000,
  actionMap: {}
};

exports.default = WebSocketRC;
//# sourceMappingURL=WebSocketRC.js.map