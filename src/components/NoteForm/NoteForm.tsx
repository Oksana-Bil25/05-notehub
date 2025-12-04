// src/components/NoteForm/NoteForm.tsx

import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNote } from "../../services/noteService";
import type { CreateNoteParams, NoteTag } from "../../types/note";

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Минимум 3 символи")
    .max(100, "Максимум 100 символів")
    .required("Це поле обов’язкове"),

  content: Yup.string().max(500, "Максимум 500 символів").optional(),

  tag: Yup.mixed<NoteTag>().oneOf(TAGS, "Невірний тег").required("Оберіть тег"),
});

interface NoteFormProps {
  onSuccess?: () => void;
}

export default function NoteForm({ onSuccess }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onSuccess?.();
    },
  });

  const initialValues: CreateNoteParams = {
    title: "",
    content: "",
    tag: "Todo",
  };

  const handleSubmit = (
    values: CreateNoteParams,
    formikHelpers: FormikHelpers<CreateNoteParams>
  ) => {
    mutation.mutate(values);
    formikHelpers.resetForm();
  };

  return (
    <div className="note-form">
      <h2>Create Note</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Title */}
            <label>Title</label>
            <Field name="title" type="text" />
            <ErrorMessage name="title" component="div" className="error" />

            {/* Content */}
            <label>Content</label>
            <Field as="textarea" name="content" />
            <ErrorMessage name="content" component="div" className="error" />

            {/* Tag */}
            <label>Tag</label>
            <Field as="select" name="tag">
              {TAGS.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="div" className="error" />

            {/* Submit */}
            <button type="submit" disabled={mutation.isPending || isSubmitting}>
              {mutation.isPending ? "Saving..." : "Create Note"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
