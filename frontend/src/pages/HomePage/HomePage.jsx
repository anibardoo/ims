import React from 'react'
import styles from './HomePage.module.css'
import Dashboard from '../../components/Dashboard/Dashboard'

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <div className="container py-4">
        <h1 className="mb-4 text-center">Institute Management System</h1>
        <Dashboard />
      </div>
    </div>
  )
}

export default HomePage
