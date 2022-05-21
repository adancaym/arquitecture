import ReactDOM from 'react-dom'
// Axios
import axios from 'axios'
import {Chart, registerables} from 'chart.js'
import {QueryClient, QueryClientProvider} from 'react-query'

// Apps
import {MetronicI18nProvider} from './_metronic/i18n/Metronici18n'
import './_metronic/assets/sass/style.dark.scss'
import './_metronic/assets/sass/style.react.scss'
import './assets/custom.scss'
import {AppRoutes} from './app/routing/AppRoutes'
import {AuthProvider, setupAxios} from './app/modules/auth'
import {Provider} from "react-redux";
import {store} from "./redux/store";

setupAxios(axios)

Chart.register(...registerables)

const queryClient = new QueryClient()

ReactDOM.render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <MetronicI18nProvider>
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </MetronicI18nProvider>
        </QueryClientProvider>
    </Provider>
   ,
  document.getElementById('root')
)
