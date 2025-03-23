const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const translateText = async (req, res, next) => {

    try {
        const { asyncHandler } = await import("../utils/asyncHandler.js");
        const { ApiError } = await import("../utils/ApiError.js");
        const { ApiResponse } = await import("../utils/ApiResponse.js");
        console.log("Processing translation request...");

        const { text , language} = req.body;
        console.log(language)

        if (!text) {
            throw new ApiError(400, "No text provided for translation.");
        }

        console.log("Original Text:", text);

        // Send to OpenAI for translation
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: `You are a language expert that translates text accurately from English to ${language}.` },
                { role: "user", content: `Translate complete following text from English to ${language} :\n\n"${text}"` },
            ],
            max_tokens: 1000,
            temperature: 0.5,
        });

        const translatedText = response.data.choices[0].message.content.trim();
        console.log("Translated Text:", translatedText);

        return res.status(200).json(
            new ApiResponse(200, { translatedText }, "Text translated successfully.")
        );

    } catch (error) {
        console.error("Translation Error:", error);
        next(error);
    }
};

module.exports = { translateText };
