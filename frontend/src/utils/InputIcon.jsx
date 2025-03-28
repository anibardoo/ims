import React from 'react';
import { 
  FaUser, FaEnvelope, FaPhone, FaLock, FaUniversity, FaPlus, FaTrash, FaEdit, FaList, 
  FaUserGraduate, FaUserPlus, FaUserMinus, FaUserEdit, FaUsers, FaBook, FaChalkboardTeacher, 
  FaCalendarAlt, FaBookOpen, FaGraduationCap, FaFileAlt
} from 'react-icons/fa';

const InputIcon = ({ icon, size }) => {
  const iconsMap = {
    // Icons for Login and Signup
    user: <FaUser size={size} />,
    email: <FaEnvelope size={size} />,
    phone: <FaPhone size={size} />,
    institute: <FaUniversity size={size} />,
    password: <FaLock size={size} />,

    // Icons for Section
    plus: <FaPlus size={size} />,
    trash: <FaTrash size={size} />,
    edit: <FaEdit size={size} />,
    list: <FaList size={size} />,
    student: <FaUserGraduate size={size} />,
    addUser: <FaUserPlus size={size} />,
    removeUser: <FaUserMinus size={size} />,
    updateUser: <FaUserEdit size={size} />,
    users: <FaUsers size={size} />,
    
    // Additional icons for dashboard
    book: <FaBook size={size} />,
    teacher: <FaChalkboardTeacher size={size} />,
    calendar: <FaCalendarAlt size={size} />,
    course: <FaBookOpen size={size} />,
    education: <FaGraduationCap size={size} />,
    document: <FaFileAlt size={size} />
  };

  return iconsMap[icon] || null;
};

export default InputIcon;
