import mongoose from 'mongoose';

const connectDB = (url) => {
  mongoose.set('strictQuery', true);
  mongoose.connect(url)
    .then(() => console.log('** Database Connected **'))
    .catch((err) => {
      console.error('*** Failed to connect with Database ***');
      console.error(err);
    });
};

export default connectDB;