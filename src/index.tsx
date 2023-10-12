import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { App } from "./components/App"
import { ItemsProvider } from "./components/ItemsProvider"
import { TogglesProvider } from "./components/TogglesProvider"

createRoot(
    document.getElementById('root') as HTMLElement,
).render(
    <StrictMode>
        <TogglesProvider>
            <ItemsProvider>
                <App />
            </ItemsProvider>
        </TogglesProvider>
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
