import React from 'react';
import PropTypes from 'prop-types';


const tryToParseJson = (str) => {
  try {
    return JSON.parse(str)
  } catch (e) {}
}

class WebSocketRC extends React.Component {
  constructor(props) {
    super(props);
    const { url, protocol } = props; // Config
    const { actionKey = 'SYS_ACTION', actionMap = {} } = props;
    this.shouldClose = false;
    this.retryTimes = 1;
    this.state = {
      // Config
      url,
      protocol,
      actionKey,
      actionMap,
    };
  }
  handleMessage = ({ data }) => {
    const json = tryToParseJson(data)
    if (json) {
      const action = json[this.props.actionKey];
      const handler = this.props.actionMap[action];
      if (action && handler) {
        handler(json);
      } else {
        this.props.onJson(json);
      }
    } else {
      this.props.onMessage(data);
    }
  };
  componentWillMount() {
    this.initWebSocket();
  }
  componentWillUnmount() {
    this.shouldClose = true;
    this.ws.close();
  }
  closeOldSocket = () => {
    if (this.ws && (this.ws.readyState === WebSocket.CONNECTING)) {
      this.shouldClose = true;
      this.ws.close();
    }
  };
  initWebSocket() {
    this.closeOldSocket();
    const ws = new WebSocket(this.props.url, this.props.protocol);
    ws.onclose = () => {
      if (!this.props.autoReconnect || // needn't reconnect
        this.shouldClose || // really want to close
        this.retryTimes++ > ( this.props.maxRetryTimes)) {
        this.props.onClose();
        return;
      }
      this.props.onRetry();
      setTimeout(() => {
        this.initWebSocket();
      }, this.props.retryDelay);
    };
    ws.onerror = (e) => {
      this.props.onError(e);
      ws.close();
    };
    ws.onmessage = this.handleMessage;
    const decorator = {
      send(data) {
        const sendData = data.constructor === String ?
          data: JSON.stringify(data);
        ws.send(sendData);
      }
    };
    ws.onopen = () => {
      this.retryTimes = 1;
      this.ws = ws;
      this.props.onCreate(decorator, ws);
    }
  }
  render() {
    return (
      <span style={{ display: 'none' }}>WebSocket React Component by KyuuSeiryuu.</span>
    );
  }
}

WebSocketRC.propTypes = {
  url: PropTypes.string.isRequired,
  protocol: PropTypes.string,
  onMessage: PropTypes.func.isRequired,
  onJson: PropTypes.func,
  onCreate: PropTypes.func,
  onClose: PropTypes.func,
  onError: PropTypes.func,
  onRetry: PropTypes.func,
  actionMap: PropTypes.object,
  actionKey: PropTypes.string,
  autoReconnect: PropTypes.bool,
  maxRetryTimes: PropTypes.number,
  retryDelay: PropTypes.number,
};

WebSocketRC.defaultProps = {
  onCreate: () => {},
  onClose: () => {},
  onRetry: () => {},
  onError: () => {},
  autoReconnect: false,
  maxRetryTimes: 3,
  retryDelay: 3000,
  actionMap: {},
  onJson: () => {}
}

export default WebSocketRC;
