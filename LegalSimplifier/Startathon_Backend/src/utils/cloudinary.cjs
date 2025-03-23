const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config();

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "raw"
        });

        // File uploaded successfully
        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
};


const uploadMp3OnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "video", // Cloudinary treats MP3 as video
            folder: "tts_audios", // Optional: Save inside a folder
            format: "mp3", // Ensure the correct format
        });

        console.log(response)
        // Delete local file after successful upload
        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        
        // Ensure the local file is deleted even if upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

const uploadCoverImageOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "image"
        });

        // File uploaded successfully
        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
};

const deleteOnCloudinary = async (public_id, resource_type) => {
    if (!public_id) return null;
    try {
        return await cloudinary.uploader.destroy(public_id, {
            resource_type,
        });
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = { uploadOnCloudinary,uploadMp3OnCloudinary, deleteOnCloudinary, uploadCoverImageOnCloudinary };
