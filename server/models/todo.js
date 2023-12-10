import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  content: { type: String }
});

todoSchema.statics.findAll = () => {
  return this.find({});
}

export default mongoose.model('todos', todoSchema);