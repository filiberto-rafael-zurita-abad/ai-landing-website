export const Integrations = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Seamless Integrations</h2>
          <p className="text-xl text-gray-600">Works with your favorite tools</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {/* Google Calendar */}
          <div className="flex items-center justify-center w-40 h-16 grayscale hover:grayscale-0 transition-all">
            <svg className="w-32 h-8" viewBox="0 0 272 92" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M115.75 46.95c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.18 81.24 25 93.5 25s22.25 9.18 22.25 21.95zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 38.97 80.99 46.95c0 7.86 5.79 13.44 12.51 13.44s12.51-5.58 12.51-13.44z" fill="#EA4335"/>
              <path d="M163.75 46.95c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.77 9.99-22.18 22.25-22.18s22.25 9.41 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.86 5.79 13.44 12.51 13.44s12.51-5.58 12.51-13.44z" fill="#FBBC05"/>
              <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.61c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"/>
              <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853"/>
            </svg>
          </div>
          {/* Outlook */}
          <div className="flex items-center justify-center w-40 h-16 grayscale hover:grayscale-0 transition-all">
            <svg className="w-32 h-8" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M256 128c0 70.7-57.3 128-128 128S0 198.7 0 128 57.3 0 128 0s128 57.3 128 128z" fill="#0A2767"/>
              <path d="M118.1 157.2l-37.6-26.8c-2.2-1.6-5.2.1-5.2 2.8v50.4c0 2.7 3.1 4.3 5.2 2.8l37.6-26.8c1.9-1.3 1.9-4.1 0-5.4z" fill="#28A8EA"/>
              <path d="M184.6 86.2h-66.5c-2.8 0-5 2.2-5 5v73.6c0 2.8 2.2 5 5 5h66.5c2.8 0 5-2.2 5-5V91.2c0-2.8-2.2-5-5-5z" fill="#0364B8"/>
            </svg>
          </div>
          {/* Zoom */}
          <div className="flex items-center justify-center w-40 h-16 grayscale hover:grayscale-0 transition-all">
            <svg className="w-32 h-8" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M256 128c0 70.7-57.3 128-128 128S0 198.7 0 128 57.3 0 128 0s128 57.3 128 128z" fill="#4A8CFF"/>
              <path d="M183.832 169.788V86.212c0-5.802-4.709-10.511-10.511-10.511H82.679c-5.802 0-10.511 4.709-10.511 10.511v83.576c0 5.802 4.709 10.511 10.511 10.511h90.642c5.802 0 10.511-4.709 10.511-10.511z" fill="white"/>
            </svg>
          </div>
          {/* Teams */}
          <div className="flex items-center justify-center w-40 h-16 grayscale hover:grayscale-0 transition-all">
            <svg className="w-32 h-8" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M256 128c0 70.7-57.3 128-128 128S0 198.7 0 128 57.3 0 128 0s128 57.3 128 128z" fill="#464EB8"/>
              <path d="M149.333 106.667c0-11.782-9.551-21.334-21.333-21.334s-21.333 9.552-21.333 21.334c0 11.781 9.551 21.333 21.333 21.333s21.333-9.552 21.333-21.333z" fill="white"/>
              <path d="M170.667 149.333c0-23.564-19.103-42.666-42.667-42.666s-42.667 19.102-42.667 42.666v21.334h85.334v-21.334z" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
