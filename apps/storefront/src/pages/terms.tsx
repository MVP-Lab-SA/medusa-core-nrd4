import { Badge } from "@/components/ui/badge"

const TermsPage = () => {
  return (
    <div className="bg-city-dark py-20">
      <div className="content-container">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="cyan" className="mb-4">Legal</Badge>
          <h1 className="text-4xl md:text-5xl font-black text-city-white mb-4">
            Terms of Service
          </h1>
          <p className="text-city-gray">
            Last updated: January 2025
          </p>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto prose prose-invert">
          <div className="bg-city-navy border border-city-steel p-8 space-y-8 text-city-gray">
            <section>
              <h2 className="text-xl font-bold text-city-white mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using Dakkah CityOS products and services, you agree to be bound 
                by these Terms of Service. If you do not agree to these terms, please do not use 
                our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-city-white mb-4">2. Description of Services</h2>
              <p>
                Dakkah CityOS provides smart city infrastructure solutions including IoT sensors, 
                data analytics platforms, and related hardware and software services. Our services 
                are designed for municipal, commercial, and industrial applications.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-city-white mb-4">3. Account Registration</h2>
              <p className="mb-4">To access certain features, you must create an account. You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly notify us of any unauthorized access</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-city-white mb-4">4. Product Purchases</h2>
              <p className="mb-4">When purchasing products from Dakkah CityOS:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All prices are in the currency specified at checkout</li>
                <li>Prices are subject to change without notice</li>
                <li>We reserve the right to limit quantities</li>
                <li>Orders are subject to acceptance and availability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-city-white mb-4">5. Intellectual Property</h2>
              <p>
                All content, trademarks, and intellectual property on our platform are owned by 
                Dakkah CityOS or our licensors. You may not reproduce, distribute, or create 
                derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-city-white mb-4">6. Acceptable Use</h2>
              <p className="mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use our services for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt our services</li>
                <li>Transmit malicious code or harmful content</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-city-white mb-4">7. Warranty and Disclaimers</h2>
              <p>
                Our products are covered by the warranty terms specified at the time of purchase. 
                To the extent permitted by law, we disclaim all other warranties, express or implied, 
                including warranties of merchantability and fitness for a particular purpose.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-city-white mb-4">8. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Dakkah CityOS shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages arising from your 
                use of our products or services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-city-white mb-4">9. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Dakkah CityOS and its officers, directors, 
                employees, and agents from any claims, damages, or expenses arising from your use 
                of our services or violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-city-white mb-4">10. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of the 
                Kingdom of Saudi Arabia. Any disputes shall be resolved in the courts of Riyadh.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-city-white mb-4">11. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting. Your continued use of our services constitutes acceptance 
                of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-city-white mb-4">12. Contact Information</h2>
              <p>For questions about these Terms of Service, contact us at:</p>
              <div className="mt-4 p-4 bg-city-slate border border-city-steel">
                <p className="text-city-white">Dakkah CityOS</p>
                <p>legal@dakkah.city</p>
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

export default TermsPage
