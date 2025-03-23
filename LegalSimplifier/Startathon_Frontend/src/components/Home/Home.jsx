import React, { useState, useEffect,useContext } from "react"
import { createRoot } from "react-dom/client"
import { useNavigate } from "react-router-dom"
import hero from "../../assets/Home.jpg"

// This file contains a React.js version of the landing page with inline Tailwind CSS

// Add Tailwind CSS directly in the file
const tailwindStyles = `
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 224.3 76.3% 48%;
}

* {
  border-color: hsl(var(--border));
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
`

// Icons components
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

const ArrowRight = (props) => (
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
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
)

const Shield = (props) => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const Lock = (props) => (
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
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const FileText = (props) => (
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
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" x2="8" y1="13" y2="13" />
    <line x1="16" x2="8" y1="17" y2="17" />
    <line x1="10" x2="8" y1="9" y2="9" />
  </svg>
)

const Search = (props) => (
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
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

const Sparkles = (props) => (
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
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
)

const Upload = (props) => (
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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
)

const Check = (props) => (
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
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const Quote = (props) => (
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
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
  </svg>
)

const ChevronLeft = (props) => (
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
    <path d="m15 18-6-6 6-6" />
  </svg>
)

const ChevronRight = (props) => (
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
    <path d="m9 18 6-6-6-6" />
  </svg>
)

// UI Components
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

const Card = ({ children, className, ...props }) => {
  return (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className || ""}`} {...props}>
      {children}
    </div>
  )
}

const CardHeader = ({ children, className, ...props }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className || ""}`} {...props}>
      {children}
    </div>
  )
}

const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className || ""}`} {...props}>
      {children}
    </h3>
  )
}

const CardDescription = ({ children, className, ...props }) => {
  return (
    <p className={`text-sm text-muted-foreground ${className || ""}`} {...props}>
      {children}
    </p>
  )
}

const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={`p-6 pt-0 ${className || ""}`} {...props}>
      {children}
    </div>
  )
}

const CardFooter = ({ children, className, ...props }) => {
  return (
    <div className={`flex items-center p-6 pt-0 ${className || ""}`} {...props}>
      {children}
    </div>
  )
}

const Avatar = ({ children, className, ...props }) => {
  return (
    <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className || ""}`} {...props}>
      {children}
    </div>
  )
}

const AvatarImage = ({ src, alt, className, ...props }) => {
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className={`aspect-square h-full w-full ${className || ""}`}
      {...props}
    />
  )
}

const AvatarFallback = ({ children, className, ...props }) => {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  )
}

const Tabs = ({ children, defaultValue, className, ...props }) => {
  const [value, setValue] = useState(defaultValue)

  return (
    <div className={`${className || ""}`} {...props} data-value={value}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value, setValue })
        }
        return child
      })}
    </div>
  )
}

const TabsList = ({ children, className, ...props }) => {
  return (
    <div
      className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className || ""}`}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  )
}

const TabsTrigger = ({ children, value, className, setValue, ...props }) => {
  const isActive = props["data-value"] === value

  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        isActive ? "bg-background text-foreground shadow-sm" : "hover:bg-background/50 hover:text-foreground"
      } ${className || ""}`}
      role="tab"
      aria-selected={isActive}
      onClick={() => setValue(value)}
      {...props}
    >
      {children}
    </button>
  )
}

const TabsContent = ({ children, value, className, ...props }) => {
  const isActive = props["data-value"] === value

  if (!isActive) return null

  return (
    <div
      className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className || ""}`}
      role="tabpanel"
      {...props}
    >
      {children}
    </div>
  )
}

// Feature Components
const FeatureCard = ({ icon, title, description }) => {
  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

const DocumentSimplifier = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [activeTab, setActiveTab] = useState("demo")

  const handleUpload = () => {
    setIsProcessing(true)
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false)
      setShowResult(true)
    }, 2000)
  }

  const legalText = `WHEREAS, the parties hereto desire to enter into this Agreement to define certain parameters of the future legal obligations, are bound by duty of confidentiality with respect to their discussions and all information being exchanged, intend to form a binding agreement only upon the execution of a definitive agreement, and in consideration of the mutual promises and covenants contained in this Agreement, and other good and valuable consideration, the receipt and sufficiency of which is hereby acknowledged, the parties hereto agree as follows:`

  const simplifiedText = `The parties signing this document:
- Want to outline their future legal obligations
- Must keep their discussions and shared information confidential
- Will only be legally bound when they sign a final agreement
- Acknowledge they're receiving fair value from this arrangement`

  return (
    <Card className="overflow-hidden border-2">
      <CardContent className="p-0">
        <Tabs defaultValue="demo" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="demo" setValue={setActiveTab} data-value={activeTab}>
              Interactive Demo
            </TabsTrigger>
            <TabsTrigger value="steps" setValue={setActiveTab} data-value={activeTab}>
              How It Works
            </TabsTrigger>
          </TabsList>
          <TabsContent value="demo" className="p-6 space-y-6" data-value={activeTab}>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Try Our Document Simplifier</h3>
              <div className="border rounded-lg p-4 bg-muted/50">
                <h4 className="font-medium mb-2">Original Legal Text:</h4>
                <p className="text-sm text-muted-foreground">{legalText}</p>
              </div>

              {!showResult ? (
                <div className="flex justify-center">
                  <Button onClick={handleUpload} disabled={isProcessing} className="gap-2 h-11 px-8 rounded-md">
                    {isProcessing ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Simplify This Text
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-primary/5 border-primary/20">
                    <h4 className="font-medium mb-2 text-primary">Simplified Version:</h4>
                    <p className="text-sm">{simplifiedText}</p>
                  </div>
                  <div className="flex justify-center">
                    <Button variant="outline" onClick={() => setShowResult(false)}>
                      Try Another Example
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="steps" className="p-6 space-y-6" data-value={activeTab}>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">How LegalSimplify Works</h3>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    1
                  </div>
                  <h4 className="font-medium">Upload Document</h4>
                  <p className="text-sm text-muted-foreground">
                    Upload your legal document through our secure interface
                  </p>
                </div>

                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    2
                  </div>
                  <h4 className="font-medium">AI Processing</h4>
                  <p className="text-sm text-muted-foreground">
                    Our AI analyzes the document, identifying complex legal terminology
                  </p>
                </div>

                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    3
                  </div>
                  <h4 className="font-medium">Get Results</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive a simplified version and summary that's easy to understand
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <Button className="gap-2 bg-gray-100 border rounded-md px-4 py-2 cursor-pointer" onClick={()=>navigate('/about')}>
                  Try It Yourself 
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

const HeroAnimation = () => {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[400px] w-full max-w-[500px]">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20 rounded-2xl" />

      {/* Document container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative bg-background rounded-lg shadow-lg w-[280px] h-[350px] border overflow-hidden"
          style={{
            transform: step === 0 ? "translateY(20px)" : "translateY(0px)",
            opacity: step === 0 ? 0 : 1,
            transition: "transform 0.5s, opacity 0.5s",
          }}
        >
          {/* Document header */}
          <div className="bg-muted p-3 border-b">
            <div className="h-4 w-32 bg-primary/20 rounded-full" />
          </div>

          {/* Document content */}
          <div className="p-4 space-y-3">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full ${i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-5/6" : "w-4/6"} ${step >= 2 ? "bg-muted" : "bg-primary/20"}`}
                style={{
                  opacity: step === 0 ? 0 : 1,
                  transition: `opacity 0.5s ease ${i * 0.1}s`,
                }}
              />
            ))}
          </div>

          {/* Processing overlay */}
          {step === 1 && (
            <div
              className="absolute inset-0 bg-primary/10 flex items-center justify-center"
              style={{
                opacity: step === 1 ? 1 : 0,
                transition: "opacity 0.5s",
              }}
            >
              <div
                className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent"
                style={{ animation: "spin 1s linear infinite" }}
              />
            </div>
          )}

          {/* Simplified document */}
          {step >= 2 && (
            <div
              className="absolute inset-0 bg-background"
              style={{
                transform: step >= 2 ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.5s",
              }}
            >
              <div className="bg-primary p-3 border-b flex items-center gap-2">
                <Check className="h-4 w-4 text-primary-foreground" />
                <div className="h-4 w-32 bg-primary-foreground/20 rounded-full" />
              </div>

              <div className="p-4 space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-1">
                    <div className={`h-2 rounded-full bg-primary/20 ${i % 2 === 0 ? "w-1/4" : "w-1/6"}`} />
                    <div className={`h-2 rounded-full bg-muted ${i % 2 === 0 ? "w-full" : "w-5/6"}`} />
                    {i % 2 === 0 && <div className="h-2 rounded-full bg-muted w-4/6" />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating elements */}
      <div
        className="absolute top-[15%] right-[5%] bg-background p-2 rounded-lg shadow-lg border"
        style={{
          animation: "float1 5s ease-in-out infinite",
        }}
      >
        <FileText className="h-8 w-8 text-primary" />
      </div>

      <div
        className="absolute bottom-[20%] left-[10%] bg-background p-2 rounded-lg shadow-lg border"
        style={{
          animation: "float2 4s ease-in-out infinite 1s",
        }}
      >
        <div className="space-y-1">
          <div className="h-1 w-8 bg-primary/30 rounded-full" />
          <div className="h-1 w-6 bg-primary/30 rounded-full" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(10px) rotate(-5deg); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      avatar: "https://via.placeholder.com/40",
      content:
        "LegalSimplify has been a game-changer for my small business. I no longer need to spend thousands on legal consultations just to understand basic contracts.",
      initials: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Startup Founder",
      avatar: "https://via.placeholder.com/40",
      content:
        "As a tech entrepreneur, I deal with complex agreements daily. This tool helps me quickly understand the implications before sending documents to my legal team for review.",
      initials: "MC",
    },
    {
      name: "Priya Patel",
      role: "Real Estate Agent",
      avatar: "https://via.placeholder.com/40",
      content:
        "My clients appreciate when I can explain complex real estate contracts in simple terms. LegalSimplify helps me do exactly that, building trust and confidence.",
      initials: "PP",
    },
    {
      name: "David Wilson",
      role: "Freelance Consultant",
      avatar: "https://via.placeholder.com/40",
      content:
        "As a freelancer, I need to understand client contracts without hiring an expensive lawyer for every job. This tool has saved me both time and money.",
      initials: "DW",
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="min-w-full border-none shadow-none">
              <CardContent className="p-6 md:p-10">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Quote className="h-12 w-12 text-primary/20" />
                  <p className="text-lg md:text-xl italic max-w-3xl">"{testimonial.content}"</p>
                  <div className="flex flex-col items-center pt-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div className="mt-2">
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        <Button
          variant="outline"
          className="rounded-full h-10 w-10 p-0 flex items-center justify-center"
          onClick={prevTestimonial}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous testimonial</span>
        </Button>
        <div className="flex gap-1 items-center">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-6 bg-primary" : "w-2 bg-primary/20"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <span className="sr-only">Testimonial {index + 1}</span>
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          className="rounded-full h-10 w-10 p-0 flex items-center justify-center"
          onClick={nextTestimonial}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next testimonial</span>
        </Button>
      </div>
    </div>
  )
}



// Main HomePage Component
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
      </header>
      <main className="flex-1">
        <section className="w-full bg-gradient-to-b from-background to-muted">
    
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px] mt-10">
              <div className="flex flex-col justify-center space-y-4 ml-20">
               
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Legal Documents, <span className="text-primary">Simplified</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Our AI-powered tool translates complex legal jargon into plain language, making contracts and
                  agreements accessible to everyone.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button variant="outline" className="gap-1.5 h-11 px-8 rounded-md cursor-pointer" onClick={()=>navigate('/about')}>
                    Try It <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="h-11 px-8 rounded-md cursor-pointer">
                    See How It Works
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>100% Secure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Lock className="h-4 w-4 text-primary" />
                    <span>Privacy Protected</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img src={hero} alt="" />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Powerful Tools for Legal Clarity
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-powered platform makes legal documents accessible to everyone, regardless of legal expertise.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <FeatureCard
                icon={<FileText className="h-10 w-10 text-primary" />}
                title="Document Simplification"
                description="Translates complex legal terminology into plain language while preserving the original meaning."
              />
              <FeatureCard
                icon={<Search className="h-10 w-10 text-primary" />}
                title="Interactive Interface"
                description="User-friendly platform where you can upload legal documents and receive simplified versions instantly."
              />
              <FeatureCard
                icon={<Sparkles className="h-10 w-10 text-primary" />}
                title="Smart Summarization"
                description="Get concise summaries of lengthy legal documents, highlighting only the key points that matter."
              />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">How It Works</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">See LegalSimplify in Action</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Experience how our AI transforms complex legal language into clear, understandable text.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-4xl py-12">
              <DocumentSimplifier />
            </div>
          </div>
        </section>

        {/* <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Trusted by Professionals</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what our users are saying about how LegalSimplify has transformed their experience with legal
                  documents.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <Testimonials />
            </div>
          </div>
        </section> */}

        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Simplify Your Legal Documents?
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of professionals who are making informed decisions with clear legal understanding.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button variant="secondary" className="gap-1.5 h-11 px-8 rounded-md">
                  Get Started Now <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10 h-11 px-8 rounded-md"
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">© 2025 LegalSimplify. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary">
              Terms
            </a>
            <a href="#" className="hover:text-primary">
              Privacy
            </a>
            <a href="#" className="hover:text-primary">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Add the style tag to the document
const styleTag = document.createElement("style")
styleTag.innerHTML = tailwindStyles
document.head.appendChild(styleTag)

// Render the app
const root = createRoot(document.getElementById("root"))
root.render(<HomePage />)

export default HomePage

