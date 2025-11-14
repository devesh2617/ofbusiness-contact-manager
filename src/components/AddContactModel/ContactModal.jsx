import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addContact, editContact } from "../../store/contactSlice";
import { states } from "../../data/states";
import "./ContactModal.css";
import toast from "react-hot-toast";

export default function AddEditContactModal({ onClose, contactToEdit = null }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (contactToEdit.current) {
      setForm({
        ...contactToEdit.current,
        addressLine1: contactToEdit.current.address?.split(",")[0] || "",
        addressLine2: contactToEdit.current.address?.split(",")[1]?.trim() || "",
        state: contactToEdit.current.address?.split(",")[2]?.trim() || "",
        pincode: contactToEdit.current.address?.split(",")[3]?.trim() || "",
      });
    }
  }, [contactToEdit.current]);

  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    if (!form.addressLine1.trim())
      newErrors.addressLine1 = "Address Line 1 is required.";
    if (!form.pincode.trim()) newErrors.pincode = "Pincode is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function transformContactObject(contact) {
    const address =
      contact.addressLine1 +
      (contact.addressLine2 ? ", " + contact.addressLine2 : "") +
      (contact.state ? ", " + contact.state : "") +
      (contact.pincode ? ", " + contact.pincode : "");

    return {
      ...(contactToEdit.current && { id: contactToEdit.current.id }),
      name: contact.name,
      contact: contact.contact,
      email: contact.email,
      address,
      pincode: contact.pincode,
    };
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      const transformed = transformContactObject(form);
      if (contactToEdit.current) {
        dispatch(editContact(transformed));
        toast.success("Contact edited successfully")
        contactToEdit.current = null
      } else {
        dispatch(addContact(transformed));
        toast.success("Contact added successfully")
      }
      onClose();
    }
  }

  const isEditMode = Boolean(contactToEdit.current);

  return (
    <div className="modal-backdrop">
      <div className="modal-container" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2 id="modal-title">
            {isEditMode ? "Edit Contact" : "Add Contact"}
          </h2>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit} noValidate>
          <div className="row">
            <div className="form-group">
              <label htmlFor="name">
                Name<span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && <div className="error-msg">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="contact">Contact No.</label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={form.contact}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label htmlFor="email">
                Email<span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <div className="error-msg">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="addressLine1">
                Address Line 1<span className="required">*</span>
              </label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                value={form.addressLine1}
                onChange={handleChange}
                className={errors.addressLine1 ? "input-error" : ""}
              />
              {errors.addressLine1 && (
                <div className="error-msg">{errors.addressLine1}</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label htmlFor="addressLine2">Address Line 2 (Optional)</label>
              <input
                type="text"
                id="addressLine2"
                name="addressLine2"
                value={form.addressLine2}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <select
                id="state"
                name="state"
                value={form.state}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label htmlFor="pincode">
                Pincode<span className="required">*</span>
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                placeholder="Enter pincode"
                value={form.pincode}
                onChange={handleChange}
                className={errors.pincode ? "input-error" : ""}
              />
              {errors.pincode && (
                <div className="error-msg">{errors.pincode}</div>
              )}
            </div>
          </div>

          <div className="modal-buttons">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {isEditMode ? "Save Changes" : "Add Contact"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
