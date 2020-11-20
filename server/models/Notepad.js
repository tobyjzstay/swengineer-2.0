const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotepadSchema = new Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: 'User', required: false, unique: true },
  text: { type: String, required: false },
});

NotepadSchema.pre('save', function (next) {
  const document = this;
  document.text = this.text;
  next();
});

module.exports = mongoose.model('Notepad', NotepadSchema);