import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { MdOutlineSearch } from "react-icons/md";
import ContactModal from "../AddContactModel/ContactModal";
import "./ContactManagerCard.css";
import ContactTable from "../ContactTable/ContactTable";

const ContactManagerCard = () => {
  const contacts = useSelector((state) => state.contactReducer.contacts);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const contactToEdit = useRef(null);
  
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const s = searchTerm.toLowerCase();

    const handler = setTimeout(() => {
      setSearchResults(contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(s) ||
          contact.email.toLowerCase().includes(s) ||
          contact.contact.toLowerCase().includes(s) ||
          contact.address.toLowerCase().includes(s)
      ));
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, contacts]);

  return (
    <main className="main-content">
      <h2 className="section-title">Contact Manager</h2>
      <div className="main-card">
        <div className="search-add">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by Name, Contact, Email, State..."
              aria-label="Search contacts"
              value={searchTerm}
              onChange={handleChange}
            />
            <button className="search-btn" aria-label="search">
              <MdOutlineSearch />
            </button>
          </div>
          <button
            className="add-contact-btn"
            onClick={() => setShowModal(true)}
          >
            Add Contact
          </button>
          {showModal && <ContactModal onClose={() => setShowModal(false)} contactToEdit={contactToEdit}/>}
        </div>
        <ContactTable contacts={searchTerm.length ? searchResults : contacts} setShowModal={setShowModal} contactToEdit={contactToEdit}/>
      </div>
    </main>
  );
};

export default ContactManagerCard;
