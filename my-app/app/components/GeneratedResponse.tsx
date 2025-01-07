'use client';

interface GeneratedResponseProps {
  response: string;
  onRegenerateClick: () => void;
  isLoading: boolean;
}

export default function GeneratedResponse({ response, onRegenerateClick, isLoading }: GeneratedResponseProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  if (!response && !isLoading) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-3">Generated Response</h3>
      <div className="relative">
        {isLoading ? (
          <div className="h-24 flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Generating response...</div>
          </div>
        ) : (
          <>
            <div className="bg-gray-50 p-3 rounded-lg border text-sm">
              {response}
            </div>
            <div className="mt-3 flex space-x-3">
              <button
                onClick={handleCopy}
                className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={onRegenerateClick}
                className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                Regenerate Response
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
