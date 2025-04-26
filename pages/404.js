import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1>🚫 404 - Page Not Found</h1>
      <p>Oops! The page you are looking for doesn’t exist.</p>
      <button onClick={() => router.push('/')} style={{ marginTop: '1rem' }}>
        Go Home
      </button>
    </div>
  );
}
