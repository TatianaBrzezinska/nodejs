import Link from "next/link";
import { RegisterForm } from "../../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-center text-white">Register</h1>
      </div>
      <div className="min-w-[400px] w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 bg-gray-200">
        <RegisterForm />
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
