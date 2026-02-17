import React from "react";

import Address from "@/components/Address/Address";
import AddressBook from "@/components/AddressBook/AddressBook";
import Button from "@/components/Button/Button";
import Radio from "@/components/Radio/Radio";
import Section from "@/components/Section/Section";
import useAddressBook from "@/hooks/useAddressBook";
import useFormFields from "@/hooks/useFormFields";

import { Address as AddressType, AddressBookFormFields } from "./types";
import transformAddress, { RawAddressModel } from "./core/models/address";
import Form from "@/components/Form/Form";
import Spinner from "@/components/Spinner/Spinner";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

function App() {
  const { fields, handleChange, clearFields } = useFormFields<AddressBookFormFields>({
    postCode: "",
    houseNumber: "",
    firstName: "",
    lastName: "",
    selectedAddress: "",
  });
  /**
   * Results states
   */
  const [error, setError] = React.useState<undefined | string>(undefined);
  const [addresses, setAddresses] = React.useState<AddressType[]>([]);
  const [addressesLoading, setAddressesLoading] = React.useState<boolean>(false);

  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();

  const handleClearFields = () => {
    clearFields();
    setAddresses([]);
    setError(undefined);
  };

  const handleAddressSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddresses([]);
    setError(undefined);
    setAddressesLoading(true);

    const url = `${process.env.NEXT_PUBLIC_URL}/api/getAddresses?postcode=${fields.postCode}&streetnumber=${fields.houseNumber}`;
    try {
      const result = await fetch(url);
      const response = await result.json();

      if (response.status === "error") {
        setError(response.errormessage);
        return;
      }

      const transformedAddresses = response.details.map(
        (item: RawAddressModel) =>
          transformAddress({
            ...item,
            houseNumber: fields.houseNumber,
          })
      );
      setAddresses(transformedAddresses);
    } catch (e) {
      setError("An error occurred while searching for addresses. Please try again.");
    } finally {
      setAddressesLoading(false);
    }
  };

  const handlePersonSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fields.firstName || !fields.firstName.length || !fields.lastName || !fields.lastName.length) {
      setError("First name and last name fields mandatory!");
      return;
    }

    if (!fields.selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id === fields.selectedAddress
    );

    if (!foundAddress) {
      setError("Selected address not found");
      return;
    }

    addAddress({ ...foundAddress, firstName: fields.firstName, lastName: fields.lastName });
  };

  return (
    <main>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>
            Enter an address by postcode, add personal info, and done! 👏
          </small>
        </h1>

        <Form 
          label="🏠 Find an address"
          loading={addressesLoading}
          formEntries={[
            {
              name: "postCode",
              placeholder: "Post Code",
              extraProps: {
                onChange: handleChange,
                value: fields.postCode
              }
            },
            {
              name: "houseNumber",
              placeholder: "House number",
              extraProps: {
                onChange: handleChange,
                value: fields.houseNumber
              }
            }
          ]}
          onFormSubmit={handleAddressSubmit}
          submitText="Find"
        />
   
        {addressesLoading && (
          <div style={{ display: "flex", justifyContent: "center", fontSize: "40px" }}>
            <Spinner colour="var(--color-brand)" />
          </div>
        )}

        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                onChange={handleChange}
              >
                <Address {...address} />
              </Radio>
            );
          })}

        {fields.selectedAddress && (
          <Form 
            label="✏️ Add personal info to address"
            loading={false}
            formEntries={[
              {
                name: "firstName",
                placeholder: "First name",
                extraProps: {
                  onChange: handleChange,
                  value: fields.firstName
                }
              },
              {
                name: "lastName",
                placeholder: "Last name",
                extraProps: {
                  onChange: handleChange,
                  value: fields.lastName
                }
              }
            ]}
            onFormSubmit={handlePersonSubmit}
            submitText="Add to addressbook"
          />
        )}

        {error && <ErrorMessage message={error} />}

        <Button variant="secondary" onClick={handleClearFields}>
          Clear all fields
        </Button>
        
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
