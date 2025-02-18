import { Request, Response } from 'express';
import fs from 'fs';

let hotels = JSON.parse(fs.readFileSync('./db.json', 'utf-8')).hotels;
let bookings = JSON.parse(fs.readFileSync('./db.json', 'utf-8')).bookings;

// Get all hotels or a specific hotel
export const getHotels = (req: Request, res: Response) => {
    const hotelId = req.params.hotelId;
    if (hotelId) {
        const hotel = hotels.find((h: any) => h.id === hotelId);
        return res.json(hotel);
    }
    res.json(hotels);
};

// Book a room
export const bookRoom = (req: Request, res: Response) => {
    const newBooking = req.body;
    const hotel = hotels.find((h: any) => h.id === newBooking.hotelId);
    if (hotel) {
        bookings.push(newBooking);
        fs.writeFileSync('./db.json', JSON.stringify({ hotels, bookings }));
        return res.status(201).json({ message: 'Booking successful' });
    }
    res.status(400).json({ message: 'Hotel not found' });
};

// Modify a booking
export const modifyBooking = (req: Request, res: Response) => {
    const { bookingId } = req.params;
    const updatedBooking = req.body;
    let booking = bookings.find((b: any) => b.id === bookingId);

    if (booking) {
        booking = { ...booking, ...updatedBooking };
        fs.writeFileSync('./db.json', JSON.stringify({ hotels, bookings }));
        return res.json({ message: 'Booking updated', booking });
    }
    res.status(404).json({ message: 'Booking not found' });
};

// Cancel a booking
export const cancelBooking = (req: Request, res: Response) => {
    const { bookingId } = req.params;
    bookings = bookings.filter((b: any) => b.id !== bookingId);
    fs.writeFileSync('./db.json', JSON.stringify({ hotels, bookings }));
    res.json({ message: 'Booking canceled' });
};
