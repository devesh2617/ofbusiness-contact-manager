import "./DeleteContactPopup.css";

export default function DeleteContactPopup({ onCancel, onDelete }) {
  return (
    <div className="popup-backdrop" role="dialog" aria-modal="true" aria-labelledby="popup-title">
      <div className="popup-container">
        <header className="popup-header">
          <div className="popup-title" id="popup-title">
            <span>Delete Contact</span>
          </div>
          <button className="close-btn" onClick={onCancel} aria-label="Close popup">&times;</button>
        </header>

        <div className="popup-content">
          <p>Are you sure you want to delete this contact?</p>
          <p>This action cannot be undone.</p>
        </div>

        <footer className="popup-actions">
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
          <button className="btn-delete" onClick={onDelete}>Delete</button>
        </footer>
      </div>
    </div>
  );
}
