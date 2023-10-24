import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { StartPage } from './components/StartPage';

createRoot(
    document.getElementById('root') as HTMLElement,
).render(
    <StrictMode>
        <StartPage />
    </StrictMode>,
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
