import Author from "../models/AuthorSchema.js"

export default function author(server, mongoose) {
  let connected = true


  server.get('/api/Author', async (req, res) => {
    try {
      if (req.query.disconnect === 'true') {
        if (connected) {
          await mongoose.disconnect();
          connected = false;
        }
      } else {
        if (!connected) {
          await mongoose.connect("mongodb+srv://destiny123456john:Dest1234John@cluster0.m469cqp.mongodb.net/");
          connected = true;
        }
      }

      let query = {};
      if (req.query.firstName) {
        query.firstName = req.query.firstName;
      }

      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 10

      const Authors = await Author.paginate(query, { page: page, limit: limit });

      if (!Authors || Authors.docs.length === 0) {
        return res.status(404).json({ message: "No author found" })
      }

      res.json(Authors);
    } catch (error) {
      res.status(500).json({ message: "An error occurred on the server while fetching" });
    }
  });


  server.get('/api/Author/:id', async (req, res) => {
    try {
      const Author = await Author.findById(req.params.id);
      if (!Author) {
        return res.status(404).json({ message: "No author found" });
      }

      res.json(Author);
    } catch (error) {
      res.status(500).json({ message: "An error occurred on the server while fetching" });
    }
  });


  server.post('/api/Author', async (req, res) => {
    try {
      const newObject = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName
      });

      const savedObject = await newObject.save();

      res.status(201).json(savedObject);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred on the server while creating" });
    }
  });


  server.put('/api/Author/:id', async (req, res) => {
    try {
      const updated = await Author.findByIdAndUpdate(req.params.id, {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName
        }
      }, { new: true });  

      if (!updated) {
        return res.status(404).json({ message: "No author found" });
      }

      res.json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred on the server while updating." });
    }
  });


  server.delete('/api/Author/:id', async (req, res) => {
    try {
      const deleted = await Author.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Author not found" });
      }

      res.json({ message: "Author has been deleted!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred on the server while deleting." });
    }
  });

}