import { Badge } from "@/components/ui/badge"

const PrivacyPage = () => {
  return (
    <div className="bg-city-dark py-20">
      <div className="content-container">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="cyan" className="mb-4">Legal</Badge>
          <h1 className="text-4xl md:text-5xl font-black text-city-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-city-gray">
            Last updated: January 2025
          </p>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto prose prose-invert">
          <div className="bg-city-navy border border-city-steel p-8 space-y-8 text-city-gray">
            <section>
              <h2 className="text-xl font-bold text-city-white mb-4">1. Introduction</h2>
              <p>
                Dakkah CityOS ("we", "our", or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you visit our website, use our products, or engage with our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-city-white mb-4">2. Information We Collect</h2>
              <p className="mb-4">We may collect information about you in various ways:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-city-white">Personal Data:</strong> Name, email address, 
                  phone number, company information, and billing details when you create an account 
                  or make a purchase.
                </li>
                <li>
                  <strong className="text-city-white">Usage Data:</strong> Information about how you 
                  use our website and services, including IP addresses, browser types, and access times.
                </li>
                <li>
                  <strong className="text-city-white">Device Data:</strong> Information from IoT devices 
                  connected to our platform, including sensor readings and operational metrics.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-city-white mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our products and services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns and optimize user experience</li>
                <li>Protect against fraudulent or unauthorized activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-city-white mb-4">4. Data Sharing and Disclosure</h2>
              <p className="mb-4">We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service providers who assist in our operations</li>
                <li>Business partners for joint marketing initiatives</li>
                <li>Legal authorities when required by law</li>
                <li>Successor entities in case of merger or acquisition</li>
              </ul>
              <p className="mt-4">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-city-white mb-4">5. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your data, including 
                encryption, secure servers, and access controls. However, no method of transmission 
                over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-city-white mb-4">6. Your Rights</h2>
              <p className="mb-4">Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-city-white mb-4">7. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to collect information about your 
                browsing activities. You can control cookies through your browser settings, though 
                this may affect some features of our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-city-white mb-4">8. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our data practices, please 
                contact us at:
              </p>
              <div className="mt-4 p-4 bg-city-slate border border-city-steel">
                <p className="text-city-white">Dakkah CityOS</p>
                <p>privacy@dakkah.city</p>
                <p>King Fahd Road, Riyadh 12345</p>
                <p>Saudi Arabia</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage
