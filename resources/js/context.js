import { createContext } from 'react'

const offcanvas = false

export const GlobalContext = createContext({
    offcanvas,
    handleShow: () => {},
})
