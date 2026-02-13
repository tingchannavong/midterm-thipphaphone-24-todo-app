import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStores = create(persist((set, get) => (
    {
        user: null,
        setUser: (user) => set( {user} ),
    }

), {name: "user-store"} ) 
);

export default useUserStores;