import React from "react";

export default function useFormFields<T extends { [K in keyof T]: string }>(
  initialValues: T
) {
  const [fields, setFields] = React.useState<T>(initialValues);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => ({ 
        ...prev, 
        [e.target.name]: e.target.value 
      }));
    },
    []
  );

  const clearFields = React.useCallback(() => {
    // This could instead empty all the fields based on type, but for now we reset
    // to the initial values since that's suitable for our use case.
    // (In fact it's not actually used, but it's good practise!)
    setFields(initialValues);
  }, [initialValues]);

  return { fields, handleChange, clearFields };
}
