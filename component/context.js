import {createContext,useContext} from "react";


const Store = createContext({})

const useStore = () => useContext(Store)

export {
    Store,
    useStore
}