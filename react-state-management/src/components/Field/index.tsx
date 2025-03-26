import {
  Field as FormikField,
  ErrorMessage,
  FieldProps as FormikFieldProps,
} from "formik";
import "./Field.css";

interface CustomFieldProps extends FieldProps, FormikFieldProps {}

const CustomField = ({
  field,
  type = "text",
  placeholder,
}: CustomFieldProps) => (
  <input
    {...field}
    type={type}
    placeholder={placeholder}
    className="field__input"
  />
);

interface FieldProps {
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
}

export const Field = ({
  type = "text",
  name,
  placeholder,
  className,
}: FieldProps) => (
  <div className={`field flex-col ${className || ""} `}>
    <FormikField
      type={type}
      name={name}
      component={CustomField}
      placeholder={placeholder}
    />
    <ErrorMessage name={name} component="p" className="field__error" />
  </div>
);
