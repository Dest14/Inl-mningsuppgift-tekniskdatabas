import Book from "../models/BookSchema.js"

export default function book(server, mongoose) {

  server.get('/api/book', async (req, res) => {
    try {
      const query = req.query.genre ? { genre: req.query.genre } : {};
      const books = await Book.find(query);
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "An error occurred on the server while fetching." });
    }
  });


  server.get('/api/book/:id', async (req, res) => {
    try {
      // Fetches the guest with the specified ID from the database.
      const book = await Book.findById(req.params.id);

      // Checks if the guest is found and returns it, or returns a 404 error if not found.
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.json(book);
    } catch (error) {
      // Handles server error if any occurred during fetching.
      res.status(500).json({ message: "An error occurred on the server while fetching." });
    }
  });

  server.post('/api/book', async (req, res) => {
    try {
      const datas = req.body; // Extracts data from the request body.
      const multipleObject = []; 
      for (const data of datas) {
        const newObject = new Book({
          bookName: data.bookName, 
          genre: data.genre, 
          releasedate: data.releasedate, 
          info: data.info,
          rating: data.rating,
          author: data.author,
        });

        // Saves the new object to the database.
        const savedObject = await newObject.save();

        // Adds the saved object to the array.
        multipleObject.push(savedObject);
      }

      res.status(201).json(multipleObject);
    } catch (error) {
      console.error(error);
      // Handles server error if any occurred during creation.
      res.status(500).json({ message: "An error occurred on the server while creating." });
    }
  });


  server.put('/api/book/:id', async (req, res) => {
    try {
      const updated = await Book.findByIdAndUpdate(req.params.id, {
        $set: {
          bookName: req.body.bookName,
          genre: req.body.genre, 
          releasedate: req.body.releasedate, 
          info: req.body.info,
          rating: req.body.rating,
          author: req.body.author,
        }
      }, { new: true });  // The { new: true } option ensures that the update is returned
      if (!updated) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.json(updated);
    } catch (error) {
      console.error(error);
      // Handles server error if any occurred during updating.
      res.status(500).json({ message: "An error occurred on the server while updating." });
    }
  });


  // Creates a DELETE route to delete a specific ID.
  server.delete('/api/book/:id', async (req, res) => {
    try {
      // Deletes object with the specified ID.
      const deleted = await Book.findByIdAndDelete(req.params.id);

      // Checks if the object is found and deleted, or returns a 404 error if not found.
      if (!deleted) {
        return res.status(404).json({ message: "Book not found" });
      }

      // Sends a confirmation message that the object has been deleted.
      res.json({ message: "Book is deleted!" });
    } catch (error) {
      console.error(error);
      // Handles server error if any occurred during deletion.
      res.status(500).json({ message: "An error occurred on the server while deleting." });
    }
  });

}