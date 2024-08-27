import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    audience: { 
        type: String, 
        required: true,
        enum: ['Technicians', 'Clients', 'All'],  // Add all valid enum values here
        default: 'All'
    },
    createdAt: { type: Date, default: Date.now },
});

const Announcement = mongoose.model('Announcement', announcementSchema);

export default Announcement;
