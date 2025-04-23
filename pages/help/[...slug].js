import { useRouter } from 'next/router';

const HelpPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // If slug is undefined or empty array, show the default message for /help
  if (!slug || slug.length === 0) {
    return <p>Welcome to the Help page. Please choose a section from the menu.</p>;
  }

  const section = slug[0]; // The first part of the slug array

  const renderContent = () => {
    switch (section) {
      case 'faqs':
        return <p>Here are the frequently asked questions (FAQs).</p>;
      case 'contact':
        return <p>Contact us at support@moviehouse.com.</p>;
      case 'privacy':
        return <p>Read our privacy policy here.</p>;
      default:
        return <p>Sorry, the section "{section}" is not available.</p>;
    }
  };

  return (
    <div>
      <h1>Help Section</h1>
      {renderContent()}
    </div>
  );
};

export default HelpPage;
