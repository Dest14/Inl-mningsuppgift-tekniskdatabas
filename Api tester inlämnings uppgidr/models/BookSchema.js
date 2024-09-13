import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const bookSchema = new mongoose.Schema({
  bookName: String, // 
  genre: String, 
  releasedate: Date, 
  info: String, 
  rating: Number,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }, 
});


bookSchema.plugin(mongoosePaginate);
const Book = mongoose.model('Book', bookSchema);

export default Book;