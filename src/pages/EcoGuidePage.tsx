
import React from 'react';
import Layout from '@/components/layout/Layout';
import EcoRatingBadge from '@/components/products/EcoRatingBadge';
import { Separator } from '@/components/ui/separator';

const EcoGuidePage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Understanding Our Eco Ratings</h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            At EcoCart, we believe in transparency. Our rating system helps you make informed choices
            about the environmental impact of your purchases. Learn how we evaluate products and what
            each rating means.
          </p>
          
          <div className="grid gap-12">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Rating System</h2>
              <p className="mb-6">
                Each product in our catalog is assigned a letter grade from A to F based on a comprehensive
                evaluation of its environmental impact. We consider multiple factors including materials,
                manufacturing processes, packaging, transportation, and brand sustainability commitments.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h3 className="font-semibold mb-3">What We Evaluate</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Materials and ingredients</li>
                    <li>Manufacturing processes</li>
                    <li>Energy consumption</li>
                    <li>Water usage</li>
                    <li>Chemical usage</li>
                    <li>Packaging sustainability</li>
                    <li>Transportation impact</li>
                    <li>End-of-life recyclability</li>
                    <li>Brand sustainability commitments</li>
                    <li>Third-party certifications</li>
                  </ul>
                </div>
                
                <div className="bg-card rounded-lg border border-border p-6">
                  <h3 className="font-semibold mb-3">Data Sources</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Manufacturer transparency reports</li>
                    <li>Independent laboratory testing</li>
                    <li>Environmental certifications</li>
                    <li>Industry standards and benchmarks</li>
                    <li>Academic research</li>
                    <li>NGO assessments</li>
                    <li>Supply chain audits</li>
                    <li>Carbon footprint analyses</li>
                    <li>Lifecycle assessments</li>
                    <li>Sustainability credentials</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-6">Rating Explanations</h2>
              
              <div className="space-y-6">
                <div className="bg-muted rounded-lg p-6 flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <EcoRatingBadge rating="A" size="lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">A Rating: Excellent</h3>
                    <p className="text-muted-foreground mb-3">
                      Products with an A rating represent the gold standard in sustainability. They are made with
                      eco-friendly materials through ethical manufacturing processes and have minimal environmental impact.
                    </p>
                    <h4 className="font-medium mb-1">Characteristics:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Made from sustainable, renewable, or recycled materials</li>
                      <li>Produced with minimal carbon footprint</li>
                      <li>Minimal or plastic-free packaging</li>
                      <li>Biodegradable or easily recyclable</li>
                      <li>Manufactured by companies with strong environmental commitments</li>
                      <li>Third-party certifications (e.g., Cradle to Cradle, B Corp)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-muted rounded-lg p-6 flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <EcoRatingBadge rating="B" size="lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">B Rating: Good</h3>
                    <p className="text-muted-foreground mb-3">
                      B-rated products have strong environmental credentials but may have areas for improvement.
                      They represent better choices than conventional alternatives.
                    </p>
                    <h4 className="font-medium mb-1">Characteristics:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Contains mostly sustainable materials</li>
                      <li>Reduced carbon footprint compared to industry average</li>
                      <li>Minimal packaging with recyclable elements</li>
                      <li>Manufactured with some renewable energy</li>
                      <li>Companies with good sustainability policies</li>
                      <li>Some sustainability certifications</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-muted rounded-lg p-6 flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <EcoRatingBadge rating="C" size="lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">C Rating: Average</h3>
                    <p className="text-muted-foreground mb-3">
                      C-rated products have average environmental impact. They may have some sustainable
                      features but also use conventional materials or processes.
                    </p>
                    <h4 className="font-medium mb-1">Characteristics:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Mix of conventional and sustainable materials</li>
                      <li>Standard industry manufacturing processes</li>
                      <li>Average carbon footprint</li>
                      <li>Conventional packaging with some recyclable components</li>
                      <li>Companies making some sustainability efforts</li>
                      <li>Limited or no third-party certifications</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-muted rounded-lg p-6 flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <EcoRatingBadge rating="D" size="lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">D Rating: Below Average</h3>
                    <p className="text-muted-foreground mb-3">
                      D-rated products have below-average environmental credentials. These products
                      use mostly conventional materials and processes with few sustainable features.
                    </p>
                    <h4 className="font-medium mb-1">Characteristics:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Mostly conventional and non-sustainable materials</li>
                      <li>Resource-intensive manufacturing processes</li>
                      <li>Above-average carbon footprint</li>
                      <li>Excessive or non-recyclable packaging</li>
                      <li>Few company sustainability initiatives</li>
                      <li>No meaningful certifications</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-muted rounded-lg p-6 flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <EcoRatingBadge rating="F" size="lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">F Rating: Poor</h3>
                    <p className="text-muted-foreground mb-3">
                      F-rated products have significant environmental concerns. We include these products to
                      provide sustainable alternatives and transparency about their impact.
                    </p>
                    <h4 className="font-medium mb-1">Characteristics:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Environmentally problematic materials</li>
                      <li>High carbon footprint and resource consumption</li>
                      <li>Excessive, non-recyclable packaging</li>
                      <li>May contain harmful chemicals or ingredients</li>
                      <li>Manufactured by companies with poor environmental records</li>
                      <li>Fast-fashion or disposable product model</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">How often are ratings updated?</h3>
                  <p className="text-muted-foreground">
                    We review and update our ratings quarterly, or whenever significant changes in a product's
                    materials, manufacturing process, or a brand's sustainability practices occur.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Who conducts the ratings?</h3>
                  <p className="text-muted-foreground">
                    Our ratings are conducted by a team of environmental scientists, sustainability experts,
                    and researchers who specialize in lifecycle assessments and sustainable product development.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Can brands influence their ratings?</h3>
                  <p className="text-muted-foreground">
                    No. Our rating system is independent and based on objective criteria. Brands cannot pay to
                    improve their ratings. However, they can improve their actual practices, which will be
                    reflected in future rating updates.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Why do you include products with poor ratings?</h3>
                  <p className="text-muted-foreground">
                    We include products across the rating spectrum to provide transparency and help consumers
                    make informed choices. For products with poor ratings, we always suggest more sustainable
                    alternatives.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Can I suggest products for rating?</h3>
                  <p className="text-muted-foreground">
                    Yes! We welcome suggestions from our community. If you'd like to see a product rated,
                    please contact us through our website, and our team will consider it for future updates.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EcoGuidePage;
