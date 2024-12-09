"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/useAuth";

export const RegisterForm = () => {
  const router = useRouter();
  const { mutate } = useRegister();

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required").min(4, "Username must be at least 4 characters"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  });

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) =>
        mutate(values, {
          onSuccess: () => {
            alert("Registration successful. Please log in.");
            router.push("/");
          },
          onError: (error) => {
            alert(error.message);
            setSubmitting(false);
          },
        })
      }
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <Field name="username" type="text" className="w-full mt-1 p-2 border rounded-md text-black" />
            <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Field name="password" type="password" className="w-full mt-1 p-2 border rounded-md text-black" />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
