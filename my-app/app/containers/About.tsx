"use client";

const steps = [
  {
    step: 1,
    title: "Set Your Availability",
    description: "Define your working hours and buffer times between meetings. Sync with your existing calendars to avoid double-booking.",
    icon: "📅"
  },
  {
    step: 2,
    title: "Share Your Link",
    description: "Share your personalized booking link with clients and colleagues. They'll see your availability in their time zone.",
    icon: "🔗"
  },
  {
    step: 3,
    title: "Get Booked",
    description: "Receive confirmations and reminders automatically. Join meetings with one click through integrated video conferencing.",
    icon: "✅"
  }
];

export const About = () => {
  return (
    <div id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How Schedulify Works</h2>
          <p className="text-xl text-gray-600">Three simple steps to streamline your scheduling process</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((item) => (
            <div key={item.step} className="relative">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="absolute -top-4 left-8 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div className="w-full h-48 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-4xl">{item.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
