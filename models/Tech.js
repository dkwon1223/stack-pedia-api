const mongoose = require("mongoose");

const TechSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    overall_type: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    compatibilities: {
        type: [String],
        required: true
    },
    date_created: {
        type: Date,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    use_cases: {
        type: [String],
        required: true
    },
    documentation_link: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Tech", TechSchema);