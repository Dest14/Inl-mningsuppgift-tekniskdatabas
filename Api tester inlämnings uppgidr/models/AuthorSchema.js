import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// Define schema for Event
const AuthorSchema = new mongoose.Schema({
  firstName: String, 
  lastName: String, 
});

// Apply pagination plugin to schema
AuthorSchema.plugin(mongoosePaginate);

// Create Event model from schema
const Author = mongoose.model('Author', AuthorSchema);

export default Author;
