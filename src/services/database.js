import mongoose from 'mongoose';
import config from '../config';

module.exports = async () => {
  const { username, password, database, host } = config;
  const uri = `mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri);
    console.log('[LOG] Connected succesfully to database');
  } catch ({ message }) {
    console.log('[ERROR] Could not establish database connection: ', message);
  }
};
