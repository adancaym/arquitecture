import {CollectionContextProvider} from "../../modules/collection/CollectionContext";
import {CollectionCreatePage} from "../../modules/collection/CollectionCreatePage";

export const CollectioCreate = () => {
    return <CollectionContextProvider>
        <CollectionCreatePage />
    </CollectionContextProvider>
}