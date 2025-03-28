import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import { FaUserGraduate, FaChalkboardTeacher, FaBook, FaCalendarAlt } from 'react-icons/fa';
import CrudSection from '../CrudSection/CrudSection';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('courses');

  const sections = [
    {
      id: 'courses',
      title: 'Courses',
      icon: <FaBook />,
      fields: [
        { id: 'courseName', label: 'Course Name', type: 'text' },
        { id: 'courseCode', label: 'Course Code', type: 'text' },
        { id: 'credits', label: 'Credits', type: 'number' },
        { id: 'department', label: 'Department', type: 'text' }
      ]
    },
    {
      id: 'teachers',
      title: 'Teachers',
      icon: <FaChalkboardTeacher />,
      fields: [
        { id: 'name', label: 'Full Name', type: 'text' },
        { id: 'email', label: 'Email', type: 'email' },
        { id: 'phone', label: 'Phone', type: 'tel' },
        { id: 'department', label: 'Department', type: 'text' },
        { id: 'specialization', label: 'Specialization', type: 'text' }
      ]
    },
    {
      id: 'students',
      title: 'Students',
      icon: <FaUserGraduate />,
      fields: [
        { id: 'name', label: 'Full Name', type: 'text' },
        { id: 'email', label: 'Email', type: 'email' },
        { id: 'rollNumber', label: 'Roll Number', type: 'text' },
        { id: 'batch', label: 'Batch', type: 'text' },
        { id: 'department', label: 'Department', type: 'text' }
      ]
    },
    {
      id: 'sessions',
      title: 'Sessions',
      icon: <FaCalendarAlt />,
      fields: [
        { id: 'sessionName', label: 'Session Name', type: 'text' },
        { id: 'startDate', label: 'Start Date', type: 'date' },
        { id: 'endDate', label: 'End Date', type: 'date' },
        { id: 'description', label: 'Description', type: 'textarea' }
      ]
    }
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardTabs}>
        {sections.map((section) => (
          <button
            key={section.id}
            className={`${styles.tabButton} ${activeTab === section.id ? styles.active : ''}`}
            onClick={() => setActiveTab(section.id)}
          >
            <span className={styles.tabIcon}>{section.icon}</span>
            <span className={styles.tabText}>{section.title}</span>
          </button>
        ))}
      </div>

      <div className={styles.dashboardContent}>
        {sections.map((section) => (
          <div 
            key={section.id} 
            className={`${styles.tabContent} ${activeTab === section.id ? styles.activeContent : ''}`}
          >
            <CrudSection 
              title={section.title}
              icon={section.icon}
              fields={section.fields}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 