import React from 'react';
import PropTypes from 'prop-types';

class WebSocketRC extends React.Component {
  constructor(props) {
    super(props);
    const { url, protocol } = props; // Config
    const { onCreate, onMessage, onClose, onError } = props;// Event
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
    };
  }
  componentWillMount() {
    this.setWebSocket();
  }
  componentWillUnmount() {
    this.state.ws.close();
  }
  setWebSocket() {
    const ws = this.state.ws;
    ws.onopen = () => {
      if (this.state.onCreate && ws.readyState === 1) {
        this.state.onCreate(ws);
      }
    };
    ws.onmessage = this.state.onMessage;
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
};

export default WebSocketRC;
