import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  id: { type: Number },
  content: { type: String }
});

export default mongoose.model('Todos', todoSchema);