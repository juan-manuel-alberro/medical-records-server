import Promise from 'bluebird';
import mongoose from 'mongoose';
import config from './config/env';
import app from './config/express';
import bole from 'bole';

const logger = bole('index');

bole.output({
  level: 'info',
  stream: process.stdout
});

// promisify mongoose
Promise.promisifyAll(mongoose);

// connect to mongo db
if (mongoose.Connection.STATES.connected === mongoose.connection.readyState) {
  mongoose.disconnect();
}

mongoose.connect(config.db, {
  server: {
    socketOptions: {
      keepAlive: 1
    }
  }
});
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});

// listen on port config.port
app.listen(config.port, () => {
  logger.info(`server started on port ${config.port} (${config.env})`);
});

export default app;
