"use client";

const steps = [
  {
    step: 1,
    title: "Complete Before Deadline",
    description: "Ensure your AI solution is fully developed and submitted before the competition deadline to be eligible for prizes.",
    icon: "📅"
  },
  {
    step: 2,
    title: "Share Solution Links",
    description: "Provide links to your AI solution's code repository, demo, and documentation for the judges to review.",
    icon: "🔗"
  },
  {
    step: 3,
    title: "Win Cash Prize",
    description: "Top solutions will be awarded cash prizes and recognition for their innovative AI implementations.",
    icon: "✅"
  }
];

export const About = () => {
  return (
    <div id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How The Autonomous AI Hackathon Works</h2>
          <p className="text-xl text-gray-600">Three simple steps to make your submission</p>
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
