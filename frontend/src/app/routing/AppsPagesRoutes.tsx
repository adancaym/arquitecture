import {Route, Routes} from "react-router-dom";
import {UserGuide} from "../pages/common/UserGuide";
import {Support} from "../pages/common/Support";
import {TradeHistory} from "../pages/biddot/Trade-history";
import {Strategies} from "../pages/biddot/Strategies";
import {Tools} from "../pages/admin/Tools";
import {CollectionDetail} from "../pages/collection/CollectionDetail";
import {
    CrudAssets, CrudBids,
    CrudCollections,
    CrudGroups,
    CrudMenus, CrudPlacements,
    CrudProcesses,
    CrudProviders,
    CrudSuscriptions,
    CrudUsers, CrudWallets
} from "./Cruds";
import {FormBidDot} from "../pages/biddot/FormBidDot";
import {CollectioCreate} from "../pages/collection/CollectioCreate";

export const AppsPage = () => (
    <Routes>
        <Route>
            <Route path='user-guide' element={<UserGuide/>}/>
            <Route path='support' element={<Support />}/>
            <Route path='admin/*' element={<AppsAdmin />}/>
            <Route path='biddot/*' element={<AppsBidDot/>}/>
            <Route path='collection/*' element={<AppsCollection/>}/>
        </Route>
    </Routes>
)

const AppsBidDot = () =>
    <Routes>
        <Route>
            <Route path='trade-history' element={<TradeHistory/>}/>
            <Route path='bot' element={<FormBidDot/>}/>
            <Route path='strategies' element={<Strategies/>}/>
        </Route>
    </Routes>

const AppsAdmin = () =>
    <Routes>
        <Route>
            <Route path='tools' element={<Tools/>}/>
            <Route path='menus' element={<CrudMenus/>}/>
            <Route path='users' element={<CrudUsers/>}/>
            <Route path='groups' element={<CrudGroups />}/>
            <Route path='providers' element={<CrudProviders />}/>
            <Route path='suscriptions' element={<CrudSuscriptions />}/>
            <Route path='process' element={<CrudProcesses />}/>
            <Route path='collections' element={<CrudCollections />}/>
            <Route path='assets' element={<CrudAssets />}/>
            <Route path='wallets' element={<CrudWallets />}/>
            <Route path='bids' element={<CrudBids />}/>
            <Route path='placements' element={<CrudPlacements />}/>
        </Route>
    </Routes>


const AppsCollection = () =>
    <Routes>
        <Route>
            <Route path='detail/:slug' element={<CollectionDetail/>}/>
            <Route path='create' element={<CollectioCreate/>}/>

        </Route>
    </Routes>