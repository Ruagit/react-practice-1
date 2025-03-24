import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Field } from ".";

interface RenderWithFormik {
  ui: React.ReactNode;
  initialValues?: {
    [key: string]: any;
  };
  validationSchema?: {
    [key: string]: any;
  };
  onSubmit?(): void;
}

const renderWithFormik = ({
  ui,
  initialValues,
  validationSchema,
  onSubmit = jest.fn(),
}: RenderWithFormik) => {
  return render(
    <Formik
      initialValues={initialValues || {}}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>{ui}</Form>
    </Formik>
  );
};

describe("Field Component", () => {
  it("renders with default type (text)", () => {
    renderWithFormik({ ui: <Field name="username" /> });

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("name", "username");
  });

  it("renders with custom type", () => {
    renderWithFormik({ ui: <Field type="email" name="email" /> });

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("name", "email");
  });

  it("renders with placeholder", () => {
    renderWithFormik({
      ui: <Field name="username" placeholder="Enter username" />,
    });

    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    renderWithFormik({
      ui: <Field name="username" className="custom-class" />,
    });

    expect(screen.getByRole("textbox").closest(".field")).toHaveClass(
      "custom-class"
    );
  });

  it("displays error message when validation fails", async () => {
    const handleSubmit = jest.fn();
    renderWithFormik({
      ui: (
        <>
          <Field name="email" type="email" />
          <button type="submit">Submit</button>
        </>
      ),
      initialValues: { email: "" },
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
      }),
      onSubmit: handleSubmit,
    });

    await act(async () => {
      await userEvent.click(screen.getByRole("button"));
    });
    await waitFor(() => {
      const errorElement = screen.getByText("Email is required");
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveClass("field__error");
    });
  });

  it("handles input changes", async () => {
    const onSubmit = jest.fn();
    renderWithFormik({
      ui: (
        <>
          <Field name="username" placeholder="Enter username" />
          <button type="submit">Submit</button>
        </>
      ),
      initialValues: { username: "" },
      onSubmit,
    });

    await act(async () => {
      await userEvent.type(
        screen.getByPlaceholderText("Enter username"),
        "testuser"
      );
      await userEvent.click(screen.getByRole("button", { name: "Submit" }));
    });
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toHaveProperty("username", "testuser");
    });
  });

  it("handles proper validation and error clearing", async () => {
    renderWithFormik({
      ui: (
        <>
          <Field name="password" type="password" placeholder="Enter password" />
          <button type="submit">Submit</button>
        </>
      ),
      initialValues: { password: "" },
      validationSchema: Yup.object({
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
      }),
    });

    const button = screen.getByRole("button", { name: "Submit" });
    const input = screen.getByPlaceholderText("Enter password");

    await act(async () => {
      await userEvent.click(button);
    });
    await waitFor(() => {
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });

    await act(async () => {
      await userEvent.type(input, "1234");
      await userEvent.click(button);
    });

    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 8 characters")
      ).toBeInTheDocument();
    });

    await act(async () => {
      await userEvent.clear(input);
      await userEvent.type(input, "12345678");
      await userEvent.click(button);
    });
    await waitFor(() => {
      expect(
        screen.queryByText("Password must be at least 8 characters")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Password is required")
      ).not.toBeInTheDocument();
    });
  });
});
