import { Formik, Form as FormikForm } from "formik";
import { string as yString, object as yObject } from "yup";
import { Field } from "../../../../components/Field";
import { GenericButton } from "../../../../components/GenericButton";
import { API_SEARCH_ENDPOINT } from "../../../../constants";
import "./SearchForm.css";

const searchFieldName = "search";
const SearchFormSchema = yObject().shape({
  [searchFieldName]: yString()
    .trim()
    .min(3, "Enter 3 letters or more!")
    .required("Required"),
});

interface SearchAction {
  search: string;
  searchLimit?: Number;
}

const searchAction = async ({ search, searchLimit = 12 }: SearchAction) => {
  const params = `q=${search}&limit=${searchLimit}&offset=0`;
  try {
    const response = await fetch(`${API_SEARCH_ENDPOINT}&${params}`);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const SearchForm = () => {
  return (
    <Formik
      initialValues={{ [searchFieldName]: "" }}
      validationSchema={SearchFormSchema}
      onSubmit={async ({ search }, { resetForm }) => {
        await searchAction({ search });
        resetForm();
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
