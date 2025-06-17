

export default function NotFound() {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-lg text-gray-600">Oops! Page not found.</p>
        <a
          href="/"
          className="mt-6 inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Go Home
        </a>
      </main>
    );
  }
  