import { useRouter } from 'next/router';

export default function HelpPage() {
  const router = useRouter();
  const { slug } = router.query;

  const page = slug ? slug[0] : 'index'; // if no slug, it's /help

  let content;

  switch (page) {
    case 'faqs':
      content = <div><h1>FAQs</h1><p>Frequently Asked Questions...</p></div>;
      break;
    case 'contact':
      content = <div><h1>Contact Us</h1><p>Email us at support@moviehouse.com</p></div>;
      break;
    case 'privacy':
      content = <div><h1>Privacy Policy</h1><p>We respect your privacy...</p></div>;
      break;
    case 'index':
      content = <div><h1>Help Center</h1><p>Welcome to the help section.</p></div>;
      break;
    default:
      content = <div><h1>Help - {page}</h1><p>Page not found in Help.</p></div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      {content}
    </div>
  );
}
