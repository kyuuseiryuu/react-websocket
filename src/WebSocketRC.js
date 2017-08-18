import React from 'react';
import PropTypes from 'prop-types';

class WebSocketRC extends React.Component {
  constructor(props) {
    super(props);
    const { url, protocol } = props; // Config
    const { onCreate, onMessage, onClose, onError } = props;// Event
    const { actionKey = 'SYS_ACTION', actionMap = {} } = props;
    this.state = {
      ws: new WebSocket(url, protocol),
      // Event
      onCreate,
      onMessage,
      onClose,
      onError,
      // Config
      url,
      protocol,
      actionKey,
      actionMap,
    };
  }
  componentWillMount() {
    this.setWebSocket();
  }
  handleMessage = ({ data }) => {
    try {
      const json = JSON.parse(data);
      const action = json[this.state.actionKey];
      const handler = this.state.actionMap[action];
      if (action && handler) {
          handler(json);
      } else {
        this.state.onMessage(json);
      }
    } catch (e) {
      const result = {
         rawText: data,
      };
      this.state.onMessage(result);
    }
  };
  componentWillUnmount() {
    this.state.ws.close();
  }
  setWebSocket() {
    const ws = this.state.ws;
    const proxy = {
      send(data) {
        ws.send(typeof data === 'string' ? data : JSON.stringify(data));
      }
    };
    ws.onopen = () => {
      if (this.state.onCreate && ws.readyState === 1) {
        this.state.onCreate(proxy, ws);
      }
    };
    ws.onmessage = this.handleMessage;
    ws.onerror = this.state.onError;
    ws.onclose = this.state.onClose;
  }
  render() {
    return (
      <div
        style={{
          display: 'none',
        }}
      >
        WebSocket React Component by KyuuSeiryuu.
      </div>
    );
  }
}

WebSocketRC.propTypes = {
    url: PropTypes.string.isRequired,
    protocol: PropTypes.string,
    onMessage: PropTypes.func.isRequired,
    onCreate: PropTypes.func,
    onClose: PropTypes.func,
    onError: PropTypes.func,
    actionMap: PropTypes.object,
    actionKey: PropTypes.string,
};

export default WebSocketRC;
