import { useState, useRef, useEffect } from "react"
import { Upload, FileText, Trash2, Languages, Moon, Sun, Volume2, Copy, Download } from "lucide-react"
import { Mic } from "lucide-react"
import { marked } from "marked";
import axios from "axios"
import { motion } from "framer-motion"

export default function DocumentSimplifier() {
    const [files, setFiles] = useState([])
    const [isDragging, setIsDragging] = useState(false)
    const [simplifiedText, setSimplifiedText] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const fileInputRef = useRef(null)
    const [animateUpload, setAnimateUpload] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const utteranceRef = useRef(null)
    const [pdfFile, setPdfFile] = useState(null);
    const [data, setData] = useState("");
    const [lang, setLang] = useState("");

    const [text, setText] = useState("Hello, this is a sample text!");
    const [copied, setCopied] = useState(false);
    // Toggle animation class for upload area
    useEffect(() => {
        if (animateUpload) {
            const timer = setTimeout(() => setAnimateUpload(false), 1000)
            return () => clearTimeout(timer)
        }
    }, [animateUpload])



    const BookOpen = (props) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
    )

    const Button = ({ children, className, variant, size, ...props }) => {
        const baseStyles =
            "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

        const variantStyles = {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            outline: "border border-input hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "underline-offset-4 hover:underline text-primary",
        }

        const sizeStyles = {
            default: "h-10 py-2 px-4",
            sm: "h-9 px-3 rounded-md",
            lg: "h-11 px-8 rounded-md",
            icon: "h-10 w-10",
        }

        return (
            <button
                className={`${baseStyles} ${variantStyles[variant || "default"]} ${sizeStyles[size || "default"]} ${className || ""}`}
                {...props}
            >
                {children}
            </button>
        )
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        setAnimateUpload(true)

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const newFiles = Array.from(e.dataTransfer.files)
            setFiles([...files, ...newFiles])
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files)
            setFiles([...files, ...newFiles])
            setAnimateUpload(true)
        }
        setPdfFile(e.target.files[0])
    }

    const handleBrowseClick = () => {
        fileInputRef.current?.click()
    }

    const handleRemoveFile = (index) => {
        const newFiles = [...files]
        newFiles.splice(index, 1)
        setFiles(newFiles)
    }

    const handleSimplify = () => {
        setIsLoading(true)
        // Simulate document simplification with a delay
        setTimeout(() => {
            setSimplifiedText(
                "This is a simplified version of your legal document. The terms and conditions have been rewritten in plain language to make them easier to understand.",
            )
            setIsLoading(false)
        }, 1500)
    }

    const toggleTheme = () => {
        setDarkMode(!darkMode)
        document.documentElement.classList.toggle("dark")
    }

    const formatSimplifiedText = (text) => {
        if (!text) return null;
        return <div dangerouslySetInnerHTML={{ __html: text }} />;
    };

    

    const handleSubmit = async () => {
        const file = new FormData()

        file.append("pdfFile", pdfFile)
        console.log(pdfFile)

        try {
            const res = await axios.post("/api/v1/simplify/generate-simplyfy", file,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true

                })
            console.log(res)
            setData(res.data.data.simplifiedText)
            setLang(res.data.data.simplifiedText)

        } catch (err) {
            console.log(err);
        }
    };
    const handleVoiceRead = () => {
        if (data && "speechSynthesis" in window) {
            if (isPlaying) {
                window.speechSynthesis.cancel()
                setIsPlaying(false)
            } else {
                const utterance = new SpeechSynthesisUtterance(data)
                utterance.onend = () => setIsPlaying(false)
                utteranceRef.current = utterance
                window.speechSynthesis.speak(utterance)
                setIsPlaying(true)
            }
        }
    }
    // const handleVoice = async () => {

    //     try {
    //         console.log("jnjd")
    //         console.log(lang)
    //         const res = await axios.post("/api/v1/voice/generateSpeech", { text: lang },
    //             {
    //                 headers: { "Content-Type": "application/json" },
    //                 withCredentials: true

    //             })
    //         console.log(res.data)
    //         setData(res.data.data.translatedText)
    //         // setData(res.data)

    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(data);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };


    const handleDownload = () => {
        const content = `
          ${data}
        `;

        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `documentation.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleMarathi = async (language) => {

        try {
            const res = await axios.post("/api/v1/translate/translate", { text: data, language: language },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true

                })
            console.log(res.data)
            setData(res.data.data.translatedText)
            // setData(res.data)

        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            {/* Inline styles for animations */}
            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInLeft {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideInRight {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }

        .animate-pulse-custom {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-bounce-custom {
          animation: bounce 1s infinite;
        }

        .scale-hover:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }

        .rotate-hover:hover {
          transform: rotate(12deg);
          transition: transform 0.3s ease;
        }

        .translate-hover:hover {
          transform: translateX(4px);
          transition: transform 0.3s ease;
        }
      `}</style>
            <div className="container flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">LegalSimplify</span>
                </div>
                <nav className="hidden md:flex items-center gap-6">
                    <a href="#features" className="text-sm font-medium hover:text-primary">
                        Home
                    </a>
                    <a href="#how-it-works" className="text-sm font-medium hover:text-primary">
                        How It Works
                    </a>
                    
                </nav>
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="hidden md:flex">
                        Log in
                    </Button>
                    <Button>Get Started</Button>
                </div>
            </div>
            <div
                className={`min-h-screen transition-colors m-10 duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
            >
                <div className="container mx-auto py-8 px-4">
                    <div className="flex justify-end mb-4">
                        <button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="rounded-full hover:scale-110 transition-transform"
                        >
                            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                    </div>

                    <div className="text-center mb-8 animate-fadeIn">
                        <h1 className={`text-4xl font-bold mb-2 ${isLoading ? "animate-pulse-custom" : ""}`}>
                            Legal Document Simplifier
                        </h1>
                        <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"} transition-colors duration-300`}>
                            AI-powered tool to simplify complex legal documents, making them easier to understand.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Section - Upload */}
                        <div className="space-y-4 animate-slideInLeft">
                            <div
                                className={`rounded-lg shadow-md overflow-hidden transition-all duration-300 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border border-gray-200"}`}
                            >
                                <div
                                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${isDragging
                                        ? `${darkMode ? "border-white bg-gray-700/30" : "border-black bg-gray-100"}`
                                        : `${darkMode ? "border-gray-600" : "border-gray-300"}`
                                        } ${animateUpload ? "scale-105" : ""}`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={handleBrowseClick}
                                >
                                    <Upload
                                        className={`h-10 w-10 mx-auto mb-4 ${darkMode ? "text-gray-400" : "text-gray-500"} ${animateUpload ? "animate-bounce-custom" : ""}`}
                                    />
                                    <p className="mb-2">Drag & Drop your document here or click to browse</p>
                                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />
                                </div>
                            </div>

                            {files.length > 0 && (
                                <div
                                    className={`rounded-lg shadow-md overflow-hidden p-4 transition-all duration-300 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border border-gray-200"}`}
                                >
                                    <h3 className="font-medium mb-2">Uploaded Files:</h3>
                                    <div className="space-y-2">
                                        {files.map((file, index) => (
                                            <div
                                                key={index}
                                                className={`flex items-center justify-between p-2 rounded transition-all duration-300 translate-hover ${darkMode ? "bg-gray-700" : "bg-gray-100"
                                                    }`}
                                            >
                                                <div className="flex items-center">
                                                    <FileText className="h-4 w-4 mr-2" />
                                                    <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                                                </div>
                                                <button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleRemoveFile(index)
                                                    }}
                                                    className="rotate-hover"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <button
                                            // onClick={handleSimplify}
                                            disabled={files.length === 0 || isLoading}
                                            onClick={() => handleSubmit()}
                                            className={`transition-all duration-300 scale-hover ${isLoading ? "animate-pulse-custom" : ""} ${darkMode ? "bg-white text-black hover:bg-gray-200" : " text-black border px-4 py-2 cursor-pointer rounded-md  hover:bg-gray-300"
                                                }`}
                                        >
                                            {isLoading ? "Simplifying..." : "Simplify Document"}

                                        </button>
                                        <button
                                            onClick={() => handleMarathi("hindi")}
                                            variant="outline"
                                            className={`flex items-center gap-2 transition-all duration-300 scale-hover ${darkMode
                                                ? "border-white text-white hover:bg-gray-700"
                                                : "text-black border px-4 py-2 cursor-pointer rounded-md  hover:bg-gray-300"
                                                }`}
                                        >
                                            <Languages className="h-4 w-4" />
                                            <span>हिन्दी</span>
                                        </button>
                                        <button
                                            onClick={() => handleMarathi("marathi")}
                                            variant="outline"
                                            className={`flex items-center gap-2 transition-all duration-300 scale-hover ${darkMode
                                                ? "border-white text-white hover:bg-gray-700"
                                                : "text-black border px-4 py-2 cursor-pointer rounded-md  hover:bg-gray-300"
                                                }`}
                                        >
                                            <Languages className="h-4 w-4" />
                                            <span>मराठी</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Section - Results */}
                        <div className="animate-slideInRight">
                            <div
                                className={`rounded-lg shadow-md overflow-hidden p-4 h-full transition-all duration-300 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border border-gray-200"}`}
                            >
                                <div className="flex justify-between">
                                    <h3 className="font-medium mb-2">Simplified Document</h3>
                                    <div className="flex gap-4">
                                        <button onClick={() => copyToClipboard()} className=" cursor-pointer"><Copy /></button>
                                        <button onClick={() => handleDownload()} className=" cursor-pointer"><Download /></button>
                                    </div>

                                </div>

                                {/* <button onClick={()=>handleVoice()} className="border bg-red-500 p-4 cursor-pointer">voice</button> */}


                                <motion.div
                                    className="absolute bottom-0 right-0 m-4"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <button
                                        onClick={handleVoiceRead}
                                        className="flex items-center gap-2 rounded-full shadow-lg px-6 py-6 h-auto"
                                        style={{
                                            background: isPlaying
                                                ? "linear-gradient(to right, #f43f5e, #e11d48)"
                                                : "linear-gradient(to right, hsl(346 100% 50%), hsl(270, 100%, 50%))",
                                            color: "white",
                                        }}
                                    >
                                        <div className="relative">
                                            {isPlaying ? (
                                                <>
                                                    <Volume2 className="h-5 w-5" />
                                                    <span
                                                        className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"
                                                        style={{ animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite" }}
                                                    ></span>
                                                </>
                                            ) : (
                                                <Mic className="h-5 w-5" />
                                            )}
                                        </div>
                                        <span className="font-medium">{isPlaying ? "Stop" : "Listen"}</span>
                                    </button>
                                </motion.div>
                                <div className={`h-0.5 w-full my-2 ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}></div>
                                <div className="min-h-[300px]">
                                    {/* {simplifiedText ? (
                                        <div
                                            className={`p-4 rounded-lg transition-all duration-300 ${darkMode ? "bg-gray-700" : "bg-gray-100"
                                                } animate-fadeIn`}
                                        >
                                            <p>{simplifiedText}</p>
                                        </div>
                                    ) : (
                                        <div
                                            className={`flex items-center justify-center h-full ${darkMode ? "text-gray-400" : "text-gray-500"
                                                }`}
                                        >
                                            <div className="overflow-x-hidden">{formatSimplifiedText(data)}</div>

                                        </div>
                                    )} */}
                                    {
                                        !data ? (<div class="loader">
                                            <div class="bar1"></div>
                                            <div class="bar2"></div>
                                            <div class="bar3"></div>
                                            <div class="bar4"></div>
                                            <div class="bar5"></div>
                                            <div class="bar6"></div>
                                            <div class="bar7"></div>
                                            <div class="bar8"></div>
                                            <div class="bar9"></div>
                                            <div class="bar10"></div>
                                            <div class="bar11"></div>
                                            <div class="bar12"></div>
                                        </div>) : (<div
                                            className={`flex items-center justify-center h-full ${darkMode ? "text-gray-400" : "text-gray-500"
                                                }`}
                                        >
                                            <div className="overflow-x-hidden">{formatSimplifiedText(data)}</div>

                                        </div>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

