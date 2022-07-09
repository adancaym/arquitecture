import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit} from './modules/auth'
import {SocketContextProvider} from "../context/SocketContext";

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <SocketContextProvider>
        <I18nProvider>
          <LayoutProvider>
            <AuthInit>
              <Outlet />
              <MasterInit />
            </AuthInit>
          </LayoutProvider>
        </I18nProvider>
      </SocketContextProvider>
    </Suspense>
  )
}

export {App}
