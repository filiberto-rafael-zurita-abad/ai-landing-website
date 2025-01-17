"use client";

export const Competition = () => {
  return (
    <section className="py-20 bg-white relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-50 z-0"
        style={{ backgroundImage: "url('/image-2.png')" }}
      ></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
          🚨 Industry-Specific Data Scraping Challenge 🚨
          </h2>
          <div className="text-lg text-gray-600 mb-8 space-y-4">
            <p>
              Deadline: January 25, 2024 11:59 PM EST
            </p>
            <p className="text-blue-600 font-semibold">
              Total Prize: $20
            </p>
            <p>
              Build a customizable AI Driven solution that scrapes and organizes data about:
            </p>
            <ul className="list-disc list-inside text-left max-w-md mx-auto">
              <li>Industry Events (conferences, meetups, webinars)</li>
              <li>Companies (size, funding, technologies used)</li>
              <li>Key People (executives, influencers, experts)</li>
            </ul>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Example Data Points
              </h3>
              <ul className="list-disc list-inside text-left max-w-md mx-auto space-y-4">
                <li>
                  <span className="font-medium">For Events:</span>
                  <ul className="list-[circle] list-inside pl-6 mt-1 space-y-1">
                    <li>Event name and description</li>
                    <li>Dates and location</li>
                    <li>Speakers and agenda</li>
                    <li>Registration details</li>
                  </ul>
                </li>
                <li>
                  <span className="font-medium">For Companies and/or Staff:</span>
                  <ul className="list-[circle] list-inside pl-6 mt-1 space-y-1">
                    <li>Company or employee name and description</li>
                    <li>Key products/services</li>
                    <li>Funding rounds and investors</li>
                    <li>Technology stack</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Proof of Authenticity
              </h3>
              <ul className="list-decimal list-inside text-left max-w-md mx-auto space-y-2">
                <li>Source URLs for all collected data</li>
                <li>Timestamp of data collection</li>
                <li>Data verification methods used</li>
                <li>Change tracking for updated information</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-left">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Competition Rules
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>✅ Must provide complete, accurate contact information</li>
              <li>✅ Must include source attribution for all data</li>
              <li>✅ Use publiclly available data</li>
              <li>❌ No scraping of personal data without consent</li>
              <li>❌ No use of blackhat techniques or illegal methods</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
