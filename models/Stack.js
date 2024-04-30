const mongoose = require("mongoose");

const StackSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    image2_url: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }, 
    technologies: {
        type: [String],
        required: true
    },
    benefits: {
        type: [String],
        required: true
    },
    downsides: {
        type: [String],
        required: true
    },
    companies: {
        type: [String],
        required: true
    },
    summary: {
        type: String,
        required: true
    }
})