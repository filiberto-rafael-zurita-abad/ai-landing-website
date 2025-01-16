"use client";

export const FAQ = () => {
  return (
    <div className="py-20 bg-white relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/image-3.png')" }}
      ></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Got questions? We've got answers.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">What is considered a good submission?</h3>
            <p className="text-gray-600">We encourage competitors to use no-code autonomous coding agents to build solutions. But if you submit an existing tool or idea that solves the task of the competition you could be eligible to win. </p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">How are submissions evaluated?</h3>
            <p className="text-gray-600">Submissions are evaluated based on predefined metrics like accuracy, design, innovation, and practicallity. Our eithical evaluation system ensures fair and consistent inspection.</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Can I participate as a team?</h3>
            <p className="text-gray-600">Yes! Teams of up to 5 members can participate together. Just create a team profile and invite your members to join.</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">What resources are provided for competitions?</h3>
            <p className="text-gray-600">Free autonomous code agents like Cline and Projext IDX are available online to help you complete these tasks.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
