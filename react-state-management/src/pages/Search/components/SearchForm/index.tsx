import { Formik, Form as FormikForm } from "formik";
import { string as yString, object as yObject } from "yup";
import { Field } from "../../../../components/Field";
import { GenericButton } from "../../../../components/GenericButton";
import { ImageState } from "../../../../types";
import { searchAction } from "../../../../api/search";
import "./SearchForm.css";

const searchFieldName = "search";
const SearchFormSchema = yObject().shape({
  [searchFieldName]: yString()
    .trim()
    .min(3, "Enter 3 letters or more!")
    .required("Required"),
});

interface SearchFormProps {
  saveImages(images: ImageState): ImageState;
}

export const SearchForm = ({ saveImages }: SearchFormProps) => {
  return (
    <Formik
      initialValues={{ [searchFieldName]: "" }}
      validationSchema={SearchFormSchema}
      onSubmit={async ({ search }, { resetForm }) => {
        const data = await searchAction({ search });
        if (!(data instanceof Error)) {
          saveImages(data);
          resetForm();
        } else {
          console.error("Error:", data);
        }
      }}
    >
      {({ isValid, dirty, isSubmitting, handleSubmit }) => (
        <FormikForm className="flex search-form">
          <Field
            type="text"
            name={searchFieldName}
            placeholder="What you looking for?"
          />
          <GenericButton
            type="submit"
            disabled={(!isValid && dirty) || isSubmitting}
            onClick={() => handleSubmit()}
          >
            Find GIF!
          </GenericButton>
        </FormikForm>
      )}
    </Formik>
  );
};
