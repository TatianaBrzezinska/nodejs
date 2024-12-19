"use client";

import { TaskFormValues } from "@/types/task";
import { formatDateForInput } from "@/utils/time";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface TaskFormProps {
  initialValues: TaskFormValues;
  onSubmit: (values: TaskFormValues, setSubmitting: (isSubmitting: boolean) => void) => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  finished_at: Yup.date().required("Date is required"),
});

export const TaskForm: React.FC<TaskFormProps> = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values, setSubmitting);
      }}
    >
      {({ values, isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700">
              Name
            </label>
            <Field id="name" name="name" type="text" className="w-full mt-1 p-2 border rounded-md text-black" />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label htmlFor="description" className="block font-medium text-gray-700">
              Description
            </label>
            <Field id="description" name="description" as="textarea" className="w-full mt-1 p-2 border rounded-md text-black" />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label htmlFor="finished_at" className="block font-medium text-gray-700">
              Finished At
            </label>
            <Field id="finished_at" name="finished_at" type="datetime-local" value={formatDateForInput(values.finished_at) || ""} className="w-full mt-1 p-2 border rounded-md text-black" />
            <ErrorMessage name="finished_at" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
