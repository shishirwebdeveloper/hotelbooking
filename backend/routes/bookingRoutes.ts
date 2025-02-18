import express from 'express';
import { getHotels, bookRoom, modifyBooking, cancelBooking } from '../controllers/bookingController';

const router = express.Router();

// Hotel routes
router.get('/hotels', getHotels);
router.get('/hotels/:hotelId', getHotels);

// Booking routes
router.post('/book', bookRoom);
router.put('/book/:bookingId', modifyBooking);
router.delete('/book/:bookingId', cancelBooking);

export { router as bookingRoutes };
