import { TogglesProvider } from './TogglesProvider';
import { ItemsProvider } from './ItemsProvider';
import { App } from "./App"

export default function AppWithProviders() {
  return (
    <TogglesProvider>
      <ItemsProvider>
        <App />
      </ItemsProvider>
    </TogglesProvider>
  )
}