import { Formik, Form as FormikForm } from "formik";
import { useContext } from "react";
import { object as yObject, string as yString } from "yup";
import { searchAction } from "../../../../api/search";
import { Field } from "../../../../components/Field";
import { GenericButton } from "../../../../components/GenericButton";
import { ImageContext } from "../../../../hooks/imageContext";
import "./SearchForm.css";

const searchFieldName = "search";
const SearchFormSchema = yObject().shape({
  [searchFieldName]: yString()
    .trim()
    .min(3, "Enter 3 letters or more!")
    .required("Required"),
});

// interface SearchFormProps {
//   saveImages(images: ImageState): ImageState;
// }

export const SearchForm: React.FC = () => {
  const { setImages } = useContext(ImageContext);
  return (
    <Formik
      initialValues={{ [searchFieldName]: "" }}
      validationSchema={SearchFormSchema}
      onSubmit={async ({ search }, { resetForm }) => {
        const data = await searchAction({ search });
        if (!(data instanceof Error)) {
          setImages(data);
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
