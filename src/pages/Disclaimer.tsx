import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Disclaimer</CardTitle>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">General Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                The information provided by MUStudy-HUB ("we," "us," or "our") on this platform is for general 
                educational and informational purposes only. All information on the site is provided in good faith, 
                however we make no representation or warranty of any kind, express or implied, regarding the accuracy, 
                adequacy, validity, reliability, availability, or completeness of any information on the platform.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Educational Content Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                The course materials, study guides, and educational resources available on this platform are 
                provided by students and faculty members of Mekelle University. While we strive to ensure the 
                quality and accuracy of all materials:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                <li>Materials are user-contributed and may contain errors or outdated information</li>
                <li>Content should be used as supplementary study resources, not as primary course materials</li>
                <li>Always verify information with official course instructors and textbooks</li>
                <li>We are not responsible for grades or academic outcomes based on materials found here</li>
                <li>Materials may not reflect the most current curriculum or course requirements</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Intellectual Property Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                We respect intellectual property rights and expect our users to do the same. If you believe 
                any content on this platform infringes on your copyright:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                <li>Please contact us immediately through our contact page</li>
                <li>Provide detailed information about the alleged infringement</li>
                <li>We will investigate and take appropriate action, including content removal if necessary</li>
                <li>Users who repeatedly violate intellectual property rights may have their accounts terminated</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">External Links Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                This platform may contain links to external websites that are not provided or maintained by or in 
                any way affiliated with MUStudy-HUB. Please note that we do not guarantee the accuracy, relevance, 
                timeliness, or completeness of any information on these external websites.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Professional and Academic Advice Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                The platform does not provide professional academic advice. Any reliance you place on information 
                from this platform is strictly at your own risk. We recommend that you:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                <li>Consult with your course instructors for official academic guidance</li>
                <li>Verify all information with authoritative sources</li>
                <li>Use materials as supplementary resources only</li>
                <li>Follow your university's academic integrity policies</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">No Endorsement Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                Reference to any specific course, instructor, department, or educational method on this platform 
                does not constitute or imply an endorsement, recommendation, or favoring by Mekelle University 
                or MUStudy-HUB administrators.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Technical Accuracy Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                While we work to maintain the platform's functionality and security, we cannot guarantee that:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                <li>The platform will be available at all times without interruption</li>
                <li>Files downloaded from the platform are free from viruses or other harmful components</li>
                <li>All features will work perfectly on all devices and browsers</li>
                <li>Data loss will never occur (users should maintain their own backups)</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Changes to This Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify this disclaimer at any time. Changes will be effective immediately 
                upon posting on this page. Your continued use of the platform following the posting of changes 
                constitutes your acceptance of such changes.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this disclaimer, please contact us through our{" "}
                <a href="/contact" className="text-primary hover:underline">contact page</a>.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Disclaimer;
