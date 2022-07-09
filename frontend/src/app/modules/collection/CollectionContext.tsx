// create a context for the collection module
import {createContext, useContext, useEffect, useState} from "react";
import {Collections} from "../../../api/backend/Collections";
import {CollectionCreate} from "../../../api/Types";
import io, {Socket} from 'socket.io-client';

interface CollectionContextInterface {
    name?: string;
    loading: boolean;
    error?: string;
    addCollection: (name: string) => void;
    setNameColection: (name: string | undefined) => void;
    setLoading: (loading: boolean) => void;
}


export const CollectionContext = createContext<CollectionContextInterface>({
    name: undefined,
    loading: false,
    error: undefined,
    addCollection: (name: string) => {},
    setNameColection: (name: string | undefined) => {},
    setLoading: (loading: boolean) => {}
});


export interface CollectionContextProps {
    children: JSX.Element | JSX.Element[];
}

export const CollectionContextProvider = ({children}: CollectionContextProps) => {
    const controllerCollection = new Collections()
    const [name, setName] = useState<string | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const addCollection = (name: string) => {
        setLoading(true);
        const collection: CollectionCreate = {
            name
        };
        controllerCollection.create(collection)
            .then(() => {
                setName(undefined);
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
                setName(undefined);
            })
    }

    const setNameColection = (name: string|undefined) => setName(name)
    return <CollectionContext.Provider
        value={{
            name,
            loading,
            error,
            addCollection,
            setNameColection,
            setLoading
    }}>{children}</CollectionContext.Provider>;
}

export const useCollectionContext = () => useContext(CollectionContext);