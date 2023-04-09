import {createContext, useContext} from "react";


const Store = createContext<{sideNav:Array<any>}>({sideNav:[]})


const useStore = () => useContext(Store)

export {
    Store,
    useStore,
}