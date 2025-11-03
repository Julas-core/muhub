import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">About Mekelle University Course Materials Hub</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                MUStudy-HUB is dedicated to democratizing education by providing free, accessible, and comprehensive 
                course materials to all Mekelle University students and faculty. We believe that quality educational 
                resources should never be a barrier to academic success. Our platform serves as a centralized hub 
                where students can discover, share, and collaborate on educational content across all departments 
                and disciplines.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                By leveraging modern technology and community contribution, we aim to create the most extensive 
                collection of verified, high-quality course materials in Ethiopia. Every document uploaded, every 
                note shared, and every past exam contributed helps build a stronger academic community where 
                knowledge flows freely and learning knows no bounds.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                We envision a learning environment where all students have equal access to high-quality educational materials, 
                regardless of their location or economic status. By digitizing and centralizing course resources, 
                we aim to enhance the educational experience and support academic excellence.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                <li>
                  <strong>Comprehensive Course Materials:</strong> Thousands of lecture notes, presentations, 
                  textbooks, and supplementary materials spanning all departments from Engineering to Social Sciences
                </li>
                <li>
                  <strong>Past Exam Archives:</strong> Extensive collection of previous exam papers to help you 
                  prepare effectively and understand exam patterns
                </li>
                <li>
                  <strong>Advanced Search & Filtering:</strong> Powerful search capabilities allowing you to find 
                  exactly what you need by course code, department, instructor, or topic
                </li>
                <li>
                  <strong>Community-Driven Content:</strong> Materials contributed and reviewed by fellow students 
                  and faculty, ensuring relevance and quality
                </li>
                <li>
                  <strong>Gamification & Rewards:</strong> Earn points, badges, and recognition for contributing 
                  quality materials and helping peers succeed
                </li>
                <li>
                  <strong>Study Tools:</strong> Personal notes, bookmarks, recently viewed materials, and exam 
                  preparation resources to enhance your study experience
                </li>
                <li>
                  <strong>24/7 Accessibility:</strong> Access materials anytime, anywhere, from any device with 
                  an internet connection
                </li>
                <li>
                  <strong>Secure & Reliable:</strong> Enterprise-grade security protecting your data and ensuring 
                  platform stability
                </li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                MUStudy-HUB was born from a simple observation: students were struggling to access quality course 
                materials, often relying on incomplete notes or outdated resources. What started as a small group 
                of students sharing study materials has grown into a comprehensive platform serving the entire 
                Mekelle University community.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                The platform officially launched with just 50 documents from a single department. Today, we host 
                thousands of materials across all faculties, with new content added daily by our growing community 
                of contributors. Our success is measured not just in numbers, but in the countless students who have 
                improved their grades, saved time searching for materials, and found the resources they needed to excel.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                As we continue to grow, we remain committed to our founding principle: making quality education 
                accessible to everyone. We're constantly innovating, adding new features, and listening to our 
                community to ensure MUStudy-HUB remains the premier educational resource platform for Mekelle University.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Impact</h2>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="bg-primary/5 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">10,000+</div>
                  <div className="text-sm text-muted-foreground mt-1">Course Materials</div>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">5,000+</div>
                  <div className="text-sm text-muted-foreground mt-1">Active Students</div>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground mt-1">Departments</div>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Accessibility</h3>
                  <p className="text-muted-foreground text-sm">
                    Education should be accessible to everyone, regardless of economic background or location
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Quality</h3>
                  <p className="text-muted-foreground text-sm">
                    We maintain high standards for all materials through community review and moderation
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Collaboration</h3>
                  <p className="text-muted-foreground text-sm">
                    Knowledge grows when shared; we foster a culture of collaboration and mutual support
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Innovation</h3>
                  <p className="text-muted-foreground text-sm">
                    We continuously improve our platform with new features and technologies to serve students better
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about the Course Materials Hub, please contact the IT department or visit our 
                <a href="/contact" className="text-primary hover:underline"> contact page</a>.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;