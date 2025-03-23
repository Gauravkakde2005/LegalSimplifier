const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const { uploadOnCloudinary, deleteOnCloudinary, uploadCoverImageOnCloudinary } = require('../utils/cloudinary.cjs');


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateSimplify = async (req, res, next) => {
  try {
    const { asyncHandler } = await import("../utils/asyncHandler.js");
    const { ApiError } = await import("../utils/ApiError.js");
    const { ApiResponse } = await import("../utils/ApiResponse.js");

    console.log("Processing uploaded legal document...");

    // console.log(req.file)


    if (!req.file) {
      throw new ApiError(400, "No file uploaded.");
    }

    const pdfFileLocalPath = req?.file?.path

    console.log(pdfFileLocalPath);

    if (!pdfFileLocalPath) {
      throw new ApiError(409, "pdf file is required")
    }






    // Read and parse the PDF
    const pdfBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(pdfBuffer);
    // console.log("pdf Data", pdfData.text)
    const originalText = pdfData.text.trim();

    if (!originalText) {
      throw new ApiError(400, "Failed to extract text from PDF.");
    }

    // console.log("Extracted text from PDF:", originalText.substring(0, 500) + "...");

    const pdfFile = await uploadOnCloudinary(pdfFileLocalPath)
    const url = pdfFile?.url;
    // Send to OpenAI for simplification
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a legal assistant that simplifies legal text into plain language while preserving the meaning dont add text formation like bold." },
        {
          role: "user", content: `Simplify the following legal text while maintaining its intent:\n\n"${originalText}" `},
      ],
      max_tokens: 1000,
      temperature: 0.5,
    });

    // const simplifiedText = response.data.choices[0].message.content.trim();


    const simplifiedText = response.data.choices[0].message.content.trim();
    // console.log("Generated Text:", simplifiedText);
    

    return res.status(200).json(
      new ApiResponse(200, {
        simplifiedText,
        url
      }, "Legal document simplified successfully.")
    );

  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { generateSimplify };