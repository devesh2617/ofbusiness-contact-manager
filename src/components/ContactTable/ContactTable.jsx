import { useDispatch } from "react-redux";
import { deleteContact } from "../../store/contactSlice";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import "./ContactTable.css";
import { useRef, useState } from "react";
import DeleteContactPopup from "../DeleteContactPopup/DeleteContactPopup";
import toast from "react-hot-toast";

const headers = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "contact",
    label: "Contact",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "address",
    label: "Address",
  },
  {
    key: "action",
    label: "Action",
  },
];
const ContactTable = ({ contacts, setShowModal, contactToEdit }) => {
  const dispatch = useDispatch();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const contactToDelete = useRef(null);
  const onCancel = () => {
    setShowDeletePopup(false);
  };
  const onDelete = () => {
    dispatch(deleteContact(contactToDelete.current));
    setShowDeletePopup(false);
    toast.success("Contact deleted successfully");
  };
  return (
    <div className="table-wrapper">
      {showDeletePopup && (
        <DeleteContactPopup onCancel={onCancel} onDelete={onDelete} />
      )}
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" aria-label="Select all contacts" />
            </th>
            {headers.map((header) => (
              <th key={header.key}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contacts.map(({ id, name, contact, email, address }) => (
            <tr key={id}>
              <td>
                <input type="checkbox" aria-label={`Select ${name}`} />
              </td>
              <td>{name}</td>
              <td>{contact}</td>
              <td>{email}</td>
              <td>{address}</td>
              <td className="actions">
                <button
                  onClick={() => {
                    setShowModal(true);
                    contactToEdit.current = {
                      id,
                      name,
                      contact,
                      email,
                      address,
                    };
                  }}
                  className="btn-edit"
                  aria-label={`Edit ${name}`}
                >
                  <span>
                    <MdEdit />
                    Edit
                  </span>
                </button>
                <button
                  onClick={() => {
                    setShowDeletePopup(true);
                    contactToDelete.current = id;
                  }}
                  className="table-btn-delete"
                  aria-label={`Delete ${name}`}
                >
                  <span>
                    <AiFillDelete />
                    Delete
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
