import Announcement from '../models/Announcement.js'; // Ensure you are using ES6 module syntax if using import

// Get all announcements
export const getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.status(200).json(announcements);
    } catch (error) {
        console.error('Error fetching announcements:', error);
        res.status(500).json({ message: 'Error fetching announcements', error: error.message });
    }
};

// Create a new announcement
export const createAnnouncement = async (req, res) => {
    try {
        console.log('Request Body:', req.body);  // Log the incoming request body
        
        const newAnnouncement = new Announcement(req.body);
        const savedAnnouncement = await newAnnouncement.save();
        
        res.status(201).json(savedAnnouncement);
    } catch (error) {
        console.error('Error creating announcement:', error);  // Log the exact error
        res.status(400).json({ message: 'Error creating announcement', error: error.message });
    }
};

