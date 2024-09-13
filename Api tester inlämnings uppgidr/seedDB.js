import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import Author from './models/AuthorSchema.js';
import Book from './models/BookSchema.js';

const AuthorList = [];
const times = 3;
const startDate = new Date('1999-10-01');
const endDate = new Date('2004-12-24');
const genres = ['Science Fiction', 'Fantasy', 'Mystery', 'Romance', 'Horror', 'Thriller', 'Non-Fiction', 'Historical', 'Adventure', 'Biography', 'Drama', 'Comedy'];

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://destiny123456john:Dest1234John@cluster0.m469cqp.mongodb.net/");
    console.log('Connected to MongoDB');
    await createAuthors(times)
    await createBooks(times)
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

async function createAuthors(amount) {
  for (let i = 0; i < amount; i++) {
    const newObject = new Author({
      // Create a new Venue object with Faker.js generated data
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    })
    // Save the new Venue object to the database
    await newObject.save()
      .then(object => {
        // Push the ID of the newly created venue to the venueIdList array
        AuthorList.push(object._id)
      })
      .catch(err => {
        console.error(err);
      });
  }
}

async function createBooks(amount) {
  for (let i = 0; i < amount; i++) {
    // Create a new Event object with Faker.js generated data and previously created venue and guest IDs
    const newObject = new Book({
      bookName: faker.lorem.words(3),
      genre: genres[Math.floor(Math.random() * genres.length)],
      releaseDate: faker.date.between({ from: startDate, to: endDate }).toISOString().split('T')[0],
      info: faker.lorem.lines(2),
      rating: faker.number.int({ max: 10 }),
      author: AuthorList[i]
    })
    // Save the new Event object to the database
    await newObject.save()
  }
}

connectDB()
