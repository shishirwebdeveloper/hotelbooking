import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));


// Setting up Pug as the template engine
app.set('view engine', 'pug');
app.set('views', './views');

// Route to render the hotel list page
app.get('/', async (req, res) => {
    try {
        const hotels = await axios.get('http://localhost:4000/api/hotels'); // Fetch hotels data
        res.render('index', { hotels: hotels.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching hotels');
    }
});

// Route to render the booking form
app.get('/book/:hotelId', async (req, res) => {
    const hotelId = req.params.hotelId;
    try {
        const hotel = await axios.get(`http://localhost:4000/api/hotels/${hotelId}`);
        res.render('booking', { hotel: hotel.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching hotel details');
    }
});

// Form submission route
app.post('/book', async (req, res) => {
    // Assume that data is parsed via a body parser middleware
    const bookingData = req.body;

    try {
        await axios.post('http://localhost:4000/api/book', bookingData); // Send booking request to backend
       res.redirect('/'); // Redirect to home page after booking
        //res.status(200).send('Booking done');
    } catch (err) {
        console.error(err);
        res.status(500).send('Booking failed');
    }
});

app.listen(port, () => {
    console.log(`Frontend running on http://localhost:${port}`);
});
