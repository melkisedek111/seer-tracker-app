import { ThemeProvider } from './components/theme-provider'

type ThemedAppType = {
    children: React.ReactNode
}

function ThemedApp({children}: ThemedAppType) {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            {children}
        </ThemeProvider>
    )
}
export default ThemedApp
