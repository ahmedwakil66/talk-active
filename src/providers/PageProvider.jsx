import { createContext, useState } from "react";

export const PageContext = new createContext(null);

const PageProvider = ({children}) => {
    const [page, setPage] = useState('home');
    const [hideSidePanel, setHideSidePanel] = useState(false)

    const pageSetter = {
        page,
        setPage,
        hideSidePanel,
        setHideSidePanel,
    }

    return (
        <PageContext.Provider value={pageSetter}>
            {children}
        </PageContext.Provider>
    );
};

export default PageProvider;