import { Header } from "./Header"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Dnd } from "./dnd/Dnd"
import { Swipe } from "./swipe/Swipe"
import { Footer } from "./Footer"
import { useToggles } from "./TogglesProvider"
import { AddForm } from "./AddForm"
import { useItems } from "./ItemsProvider"

export function App() {
    const [, saveItems] = useItems()
    const [editMode] = useToggles("edit")
    const [addNew, , toggle] = useToggles("addNew")

    return (
        <>
            <Header />
            {editMode ? (
                <DndProvider backend={HTML5Backend}>
                    <Dnd />
                </DndProvider>
            ) : (
                <Swipe />
            )}
            {addNew && (
                <AddForm
                    setData={function (item) {
                        saveItems(function (prevState) {
                            const res = [...prevState, item]
                            localStorage.setItem("data", JSON.stringify(res))
                            return res
                        })
                        toggle()
                    }}
                    onCancel={toggle}
                />
            )}
            <Footer />
        </>
    )
}
