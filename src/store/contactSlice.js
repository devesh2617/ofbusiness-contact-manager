import { createSlice } from "@reduxjs/toolkit";
import { initialContacts } from "../data/contacts";

const initialState = {
  contacts: [...initialContacts],
};

export const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push({ id: state.contacts.length + 1, ...action.payload });
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
    editContact: (state, action) => {
      const { id, updatedData } = action.payload;
      const contactIndex = state.contacts.findIndex(
        (contact) => contact.id === id
      );

      if (contactIndex !== -1) {
        state.contacts[contactIndex] = {
          ...action.payload
        };
      }
    },
  },
});

// Export actions
export const { addContact, deleteContact, editContact } = contactSlice.actions;

// Export reducer
export default contactSlice.reducer;
