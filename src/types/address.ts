export interface Address {
  city: string;
  firstName: string;
  houseNumber: string;
  id: string;
  lastName: string;
  postcode: string;
  street: string;
}

export interface AddressBookFormFields {
  postCode: string;
  houseNumber: string;
  firstName: string;
  lastName: string;
  selectedAddress: string;
}
