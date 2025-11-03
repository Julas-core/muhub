import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Cookie Policy</CardTitle>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                They are widely used to make websites work more efficiently, provide a better user experience, and 
                provide information to the owners of the website. Cookies allow websites to recognize your device and 
                store some information about your preferences or past actions.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                MUStudy-HUB uses cookies for various purposes to enhance your experience on our platform:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>
                  <strong>Essential Cookies:</strong> These cookies are necessary for the platform to function properly. 
                  They enable core functionality such as security, network management, and accessibility. You cannot 
                  opt-out of these cookies as they are essential for the platform to work.
                </li>
                <li>
                  <strong>Authentication Cookies:</strong> These cookies help us identify you when you log in, allowing 
                  you to access your account and use the platform's features without having to log in on every page.
                </li>
                <li>
                  <strong>Preference Cookies:</strong> These cookies remember your settings and preferences, such as 
                  your preferred language, theme (light/dark mode), and other personalization options.
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with our 
                  platform by collecting and reporting information anonymously. This helps us improve the platform's 
                  functionality and user experience.
                </li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Session Cookies</h3>
                  <p className="text-muted-foreground">
                    These are temporary cookies that expire when you close your browser. They help us maintain your 
                    session as you navigate through different pages of the platform.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Persistent Cookies</h3>
                  <p className="text-muted-foreground">
                    These cookies remain on your device until they expire or you delete them. They help us remember 
                    your preferences and provide a personalized experience when you return to the platform.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                In addition to our own cookies, we may also use various third-party cookies to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                <li>Analyze website traffic and usage patterns (e.g., Google Analytics)</li>
                <li>Provide social media features and analyze our traffic</li>
                <li>Deliver relevant advertisements (if applicable)</li>
                <li>Enhance security and prevent fraud</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-2">
                These third parties may also use cookies to track your browsing activities across different websites. 
                We do not have control over these cookies, and they are subject to the respective third party's privacy policies.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                <li>
                  <strong>Browser Settings:</strong> Most web browsers allow you to control cookies through their 
                  settings. You can set your browser to refuse cookies or delete certain cookies. However, if you 
                  block or delete cookies, some features of the platform may not function properly.
                </li>
                <li>
                  <strong>Cookie Consent Banner:</strong> When you first visit our platform, you will see a cookie 
                  consent banner where you can choose to accept or customize your cookie preferences.
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-2">
                Please note that if you disable cookies, you may not be able to use all features of the platform, 
                and your user experience may be affected.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Browser-Specific Instructions</h2>
              <p className="text-muted-foreground leading-relaxed">
                To manage cookies in your browser, please refer to your browser's help section or visit these links:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                <li>Google Chrome: Settings → Privacy and security → Cookies and other site data</li>
                <li>Mozilla Firefox: Options → Privacy & Security → Cookies and Site Data</li>
                <li>Safari: Preferences → Privacy → Cookies and website data</li>
                <li>Microsoft Edge: Settings → Privacy, search, and services → Cookies and site permissions</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Cookie Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                Different cookies have different retention periods:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                <li>Session cookies are deleted when you close your browser</li>
                <li>Authentication cookies typically last for 30 days or until you log out</li>
                <li>Preference cookies may last up to 1 year</li>
                <li>Analytics cookies typically last for 2 years</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Do Not Track Signals</h2>
              <p className="text-muted-foreground leading-relaxed">
                Some browsers incorporate a "Do Not Track" (DNT) feature that signals to websites you visit that you 
                do not want to have your online activity tracked. Currently, there is no uniform technology standard 
                for recognizing and implementing DNT signals. As such, we do not currently respond to DNT signals.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Updates to This Cookie Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other 
                operational, legal, or regulatory reasons. We will notify you of any material changes by posting the 
                new Cookie Policy on this page with an updated "Last updated" date.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us through 
                our <a href="/contact" className="text-primary hover:underline">contact page</a>.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CookiePolicy;
