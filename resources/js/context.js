import { createContext } from 'react'

export const modalTickets = {
    show: false,
    name: ''
}

export const GlobalContext = createContext({
    modalTickets,

    handleShow: (modalTickets) => {},
})
