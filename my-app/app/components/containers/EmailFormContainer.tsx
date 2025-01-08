import EmailForm from '../EmailForm';

export default function EmailFormContainer() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Email Sender</h2>
      <EmailForm />
    </div>
  );
}
