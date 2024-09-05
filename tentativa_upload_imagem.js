// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to upload an image
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const { originalname, buffer } = req.file;
        // const query = 'INSERT INTO images (name, image_data) VALUES ($1, $2)';
	const query = 'INSERT INTO Jogador (image_data) VALUES ($1)';
        await pool.query(query, [originalname, buffer]);
        res.send('Image uploaded successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading image');
    }
});

// Route to get an image
app.get('/image/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // const query = 'SELECT name, image_data FROM images WHERE id = $1';
	const query = 'SELECT image_data FROM images WHERE id = $1';
        const result = await pool.query(query, [id]);

        if (result.rows.length > 0) {
            const { name, image_data } = result.rows[0];
            res.set('Content-Type', 'image/jpeg'); // Adjust the content type based on your image type
            res.send(image_data);
        } else {
            res.status(404).send('Image not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving image');
    }
});