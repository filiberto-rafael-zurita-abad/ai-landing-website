"use client";

export const FAQ = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Got questions? We've got answers.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">How does the free trial work?</h3>
            <p className="text-gray-600">Our 14-day free trial gives you full access to all Pro features. No credit card required. Cancel anytime.</p>
          </div>
          <div className="bg-white p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Can I integrate with my calendar?</h3>
            <p className="text-gray-600">Yes! Schedulify integrates seamlessly with Google Calendar, Outlook, and other major calendar services.</p>
          </div>
          <div className="bg-white p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">What happens if I need to cancel?</h3>
            <p className="text-gray-600">You can cancel your subscription anytime. We'll prorate your refund based on the unused time.</p>
          </div>
          <div className="bg-white p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Do you offer team discounts?</h3>
            <p className="text-gray-600">Yes! Contact our sales team for special pricing for teams of 10 or more members.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
