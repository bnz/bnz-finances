import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { Layout } from "./components/Layout"

createRoot(
    document.getElementById('root') as HTMLElement,
).render(
    <React.StrictMode>
        <Layout />
    </React.StrictMode>,
)

reportWebVitals()

/**
 * Record
 *      type
 *      name
 *      price (maybe split to N count)
 *      date (start date, repeat date, etc.)
 *      enabled / disabled
 *      streaked
 *      ?? any mark (favourite / questioned / etc.)
 *
 *
 * functions
 *      list
 *      add new
 *      edit item
 *
 *      total sum
 *      enabled sum
 *
 */
