import { Header } from "./Header"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Dnd } from "./dnd/Dnd"
import { Swipe } from "./swipe/Swipe"
import { Footer } from "./Footer"
import { useToggle, useToggles } from "./TogglesProvider"
import { ActionsPanel } from "./ActionsPanel"
import { AddForm } from "./AddForm"

// useEffect(() => {
//     setLoading(true)
//     try {
//         ;(async () => {
//             const data = await fetch()
//             setData(data)
//             setLoading(false)
//         })()
//     } catch (e) {
//         console.log("CATCH", e)
//     }
// }, [setData, setLoading])

export function App() {
    const reorder = useToggle("reorder")

    return (
        <>
            <Header />
            <ActionsPanel />
            <AddForm />
            {reorder ? (
                <DndProvider backend={HTML5Backend}>
                    <Dnd />
                </DndProvider>
            ) : (
                <Swipe />
            )}
            <Footer />
        </>
    )
}
