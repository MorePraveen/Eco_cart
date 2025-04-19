
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">About EcoCart</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                EcoCart is dedicated to making sustainable shopping accessible to everyone. 
                We carefully curate eco-friendly products and provide transparency about their 
                environmental impact through our unique eco-rating system.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Eco-Rating System</h2>
              <p className="text-muted-foreground mb-4">
                Our eco-rating system grades products from A to F based on:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Environmental impact during production</li>
                <li>Packaging sustainability</li>
                <li>Product lifecycle and recyclability</li>
                <li>Carbon footprint</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Join Our Mission</h2>
              <p className="text-muted-foreground">
                By choosing eco-friendly products, you're contributing to a more sustainable future. 
                Every purchase makes a difference, and together we can create positive environmental change.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AboutPage;
