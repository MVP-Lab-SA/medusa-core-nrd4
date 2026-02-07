import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert } from "@/components/ui/alert"
import { BuildingStorefront, EnvelopeSolid, MapPin, Phone } from "@medusajs/icons"
import { useState } from "react"

const contactInfo = [
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Address",
    value: "King Fahd Road, Riyadh 12345, Saudi Arabia",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Phone",
    value: "+966 11 234 5678",
  },
  {
    icon: <EnvelopeSolid className="w-5 h-5" />,
    label: "Email",
    value: "contact@dakkah.city",
  },
  {
    icon: <BuildingStorefront className="w-5 h-5" />,
    label: "Hours",
    value: "Sunday - Thursday: 9AM - 6PM",
  },
]

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStatus("success")
      setFormData({ name: "", email: "", company: "", subject: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="bg-city-dark py-20">
      <div className="content-container">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="cyan" className="mb-4">Get in Touch</Badge>
          <h1 className="text-4xl md:text-5xl font-black text-city-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-city-gray max-w-2xl mx-auto">
            Have questions about our smart city solutions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-city-navy border border-city-steel p-6 space-y-6">
              <h2 className="text-xl font-bold text-city-white">Contact Information</h2>
              
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-city-slate flex items-center justify-center text-city-cyan flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-city-muted text-sm">{info.label}</p>
                    <p className="text-city-white">{info.value}</p>
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div className="mt-8 aspect-video bg-city-slate border border-city-steel flex items-center justify-center">
                <p className="text-city-muted text-sm">Map Integration</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-city-navy border border-city-steel p-8">
              <h2 className="text-xl font-bold text-city-white mb-6">Send us a Message</h2>

              {status === "success" && (
                <Alert variant="success" title="Message Sent!" className="mb-6">
                  Thank you for contacting us. We'll get back to you within 24-48 hours.
                </Alert>
              )}

              {status === "error" && (
                <Alert variant="error" title="Error" className="mb-6">
                  Something went wrong. Please try again later.
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Company (Optional)"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                  />
                  <Input
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <Textarea
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project or inquiry..."
                  className="min-h-[150px]"
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full md:w-auto px-8"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
