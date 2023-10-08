import { createContext } from "react";

const userContext = createContext({
    user: {
        name: 'hem'
    },
    setName: (param) => {
        this.user.name = param
    }
})


export default userContext