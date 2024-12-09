import Link from "next/link";
import { LoginForm } from "../components/LoginForm";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-center text-white">Welcome to Task App</h1>
        <p className="text-center text-white my-2">Here you can manage your own tasks.</p>
      </div>

      <div className="min-w-[400px] w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 bg-gray-200">
        <LoginForm />
        <p className="text-center text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
