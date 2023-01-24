import { io } from 'socket.io-client';

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection() {
    console.log('SocketioService.setupSocketConnection()');
    this.socket = io(process.env.VUE_APP_FNB_URL, { transports: ['websocket'] });
  }
}

export default new SocketioService();