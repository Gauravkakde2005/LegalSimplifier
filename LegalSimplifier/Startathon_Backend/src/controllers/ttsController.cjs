const gTTS = require("gtts");
const path = require("path");
const fs = require("fs");
const { uploadMp3OnCloudinary } = require('../utils/cloudinary.cjs');

exports.textToSpeech = async (req, res) => {
    const { ApiResponse } = await import("../utils/ApiResponse.js");
    const { text, language = "en" } = req.body;

    if (!text) return res.status(400).json({ error: "No text provided" });

    try {
        // Generate a unique filename
        const fileName = `tts_output_${Date.now()}.mp3`;
        const filePath = path.join(__dirname, "../../public/temp", fileName);


        // Generate speech and save to file
        const gtts = new gTTS(text, language);
        gtts.save(filePath, async (err) => {
            if (err) {
                console.error("Error generating speech:", err);
                return res.status(500).json({ error: "Failed to generate speech" });
            }


            const cloudinaryResponse = await uploadMp3OnCloudinary(filePath);
            console.log(cloudinaryResponse);
            // Delete local file after upload

            return res
                .status(201)
                .json(new ApiResponse(200, cloudinaryResponse, "User Registered Successfully...!"));

        });
    } catch (error) {
        console.error("TTS Error:", error);
        res.status(500).json({ error: "Error processing text-to-speech" });
    }


};
