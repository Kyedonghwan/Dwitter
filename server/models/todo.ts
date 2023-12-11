import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  content: { type: String }
});

export default mongoose.model('todos', todoSchema);