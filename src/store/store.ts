import { create } from "zustand";

type StoreFormStore = {
  companyName :string,
  setCompanyName:()=> void
}

export const useStore = create<StoreFormStore>((set)=>({
  companyName:"",
  setCompanyName: ()=> {
    set((state)=>({companyName:state.companyName}))
  }
}))
