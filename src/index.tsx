import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { Layout } from "./components/Layout"
// import { Dnd } from "./components/dnd/Dnd"
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'


createRoot(
    document.getElementById('root') as HTMLElement,
).render(
    <StrictMode>
        <Layout />
        {/*<DndProvider backend={HTML5Backend}>*/}
        {/*    <div className="p-5">*/}
        {/*        <Dnd />*/}
        {/*    </div>*/}
        {/*</DndProvider>*/}
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
