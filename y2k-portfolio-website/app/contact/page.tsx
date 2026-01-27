import ContactForm from '@/components/contact/ContactForm';
import SocialLinks from '@/components/contact/SocialLinks';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-8 space-y-8">
      <div className="bg-pink-300 border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-5xl font-bold mb-4 text-center">LET&apos;S CONNECT!</h1>
        <p className="text-xl text-center mb-6">
          Have a project in mind? Want to collaborate? Drop me a message!
        </p>
      <SocialLinks />
      </div>
      
      
    </div>
  );
}