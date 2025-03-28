import React, { useState } from 'react';
import styles from './CrudSection.module.css';
import { FaPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import InputField from '../InputField/InputField';

const CrudSection = ({ title, icon, fields }) => {
  const [formData, setFormData] = useState({});
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editMode) {
      // Update existing item
      setItems(items.map(item => 
        item.id === editId ? { ...formData, id: editId } : item
      ));
      setEditMode(false);
      setEditId(null);
    } else {
      // Add new item
      const newItem = {
        ...formData,
        id: Date.now()
      };
      setItems([...items, newItem]);
    }
    
    // Reset form
    setFormData({});
    setIsFormVisible(false);
  };

  // Handle editing an item
  const handleEdit = (item) => {
    setFormData({ ...item });
    setEditMode(true);
    setEditId(item.id);
    setIsFormVisible(true);
  };

  // Handle deleting an item
  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Filter items based on search term
  const filteredItems = items.filter(item => 
    Object.values(item).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className={styles.crudSection}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <span className={styles.titleIcon}>{icon}</span>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.actions}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <FaSearch className={styles.searchIcon} />
          </div>
          <button 
            className={styles.addButton}
            onClick={() => {
              setIsFormVisible(!isFormVisible);
              if (editMode) {
                setEditMode(false);
                setFormData({});
              }
            }}
          >
            <FaPlus /> {isFormVisible ? 'Cancel' : `Add ${title.slice(0, -1)}`}
          </button>
        </div>
      </div>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h3 className={styles.formTitle}>
            {editMode ? `Edit ${title.slice(0, -1)}` : `Add New ${title.slice(0, -1)}`}
          </h3>
          <div className={styles.formFields}>
            {fields.map((field) => (
              <div key={field.id} className={styles.formGroup}>
                <InputField
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  label={field.label}
                  value={formData[field.id] || ''}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              {editMode ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      )}

      <div className={styles.itemsContainer}>
        {filteredItems.length > 0 ? (
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {fields.map((field) => (
                <div key={field.id} className={styles.tableHeaderCell}>
                  {field.label}
                </div>
              ))}
              <div className={styles.tableHeaderCell}>Actions</div>
            </div>
            <div className={styles.tableBody}>
              {filteredItems.map((item) => (
                <div key={item.id} className={styles.tableRow}>
                  {fields.map((field) => (
                    <div 
                      key={field.id} 
                      className={styles.tableCell}
                      data-label={field.label}
                    >
                      {item[field.id]}
                    </div>
                  ))}
                  <div className={styles.tableCell} data-label="Actions">
                    <div className={styles.rowActions}>
                      <button 
                        className={styles.editButton}
                        onClick={() => handleEdit(item)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className={styles.deleteButton}
                        onClick={() => handleDelete(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>No {title.toLowerCase()} found. Add some!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrudSection; 