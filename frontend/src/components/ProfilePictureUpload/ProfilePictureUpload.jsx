import React from "react";
import styles from "./ProfilePictureUpload.module.css";

const ProfilePictureUpload = ({ profilePicture, onImageChange }) => {
  return (
    <div className={styles.uploadContainer}>
      <input
        type="file"
        id="profilePicture"
        name="profilePicture"
        accept="image/*"
        onChange={onImageChange}
        className={styles.hiddenInput}
      />
      <label htmlFor="profilePicture" className={styles.uploadCircle}>
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="Profile Preview"
            className={styles.profileImage}
          />
        ) : (
          <span className={styles.uploadText}>Upload Image</span>
        )}
      </label>
    </div>
  );
};

export default ProfilePictureUpload;
