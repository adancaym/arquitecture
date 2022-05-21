import { log } from "../../redux/reducers/ui/actionsUi";
import { store } from "../../redux/store";
export const Logger = (msg: string) => {
    store.dispatch(log(msg))
    //console.log(msg)
}
