import React, {createContext, useContext, useState, useEffect} from 'react'
import {DefaultLayoutConfig} from './DefaultLayoutConfig'
import {
    getEmptyCssClasses,
    getEmptyCSSVariables,
    getEmptyHTMLAttributes,
    LayoutSetup,
} from './LayoutSetup'
import {
    ILayout,
    ILayoutCSSVariables,
    ILayoutCSSClasses,
    ILayoutHTMLAttributes,
} from './LayoutModels'
import {Children} from "../../../types";

export interface LayoutContextModel {
    logoSize: 'sm' | 'lg';
    asideIsMinimized: boolean
    config: ILayout
    classes: ILayoutCSSClasses
    attributes: ILayoutHTMLAttributes
    cssVariables: ILayoutCSSVariables
    setLayout: (config: LayoutSetup) => void
    setLogoSizeSm: () => void
    setLogoSizeLg: () => void
    asideMinimize: () => void
    asideMaximize: () => void
}

const LayoutContext = createContext<LayoutContextModel>({
    logoSize: 'lg',
    asideIsMinimized: false,
    config: DefaultLayoutConfig,
    classes: getEmptyCssClasses(),
    attributes: getEmptyHTMLAttributes(),
    cssVariables: getEmptyCSSVariables(),
    setLayout: (config: LayoutSetup) => {
    },
    setLogoSizeSm: ()=> {},
    setLogoSizeLg: ()=> {},
    asideMinimize: ()=> {},
    asideMaximize: ()=> {},
})

const enableSplashScreen = () => {
    const splashScreen = document.getElementById('splash-screen')
    if (splashScreen) {
        splashScreen.style.setProperty('display', 'flex')
    }
}

const disableSplashScreen = () => {
    const splashScreen = document.getElementById('splash-screen')
    if (splashScreen) {
        splashScreen.style.setProperty('display', 'none')
    }
}

const LayoutProvider = ({children}: Children) => {
    const [config, setConfig] = useState(LayoutSetup.config)
    const [classes, setClasses] = useState(LayoutSetup.classes)
    const [attributes, setAttributes] = useState(LayoutSetup.attributes)
    const [cssVariables, setCSSVariables] = useState(LayoutSetup.cssVariables)
    const [logoSize, setLogoSize] = useState<'lg' | 'sm'>('lg')
    const [asideIsMinimized, setAsideIsMinimized] = useState(false)
    const setLayout = (_themeConfig: Partial<ILayout>) => {
        enableSplashScreen()
        const bodyClasses = Array.from(document.body.classList)
        bodyClasses.forEach((cl) => document.body.classList.remove(cl))
        LayoutSetup.updatePartialConfig(_themeConfig)
        setConfig(Object.assign({}, LayoutSetup.config))
        setClasses(LayoutSetup.classes)
        setAttributes(LayoutSetup.attributes)
        setCSSVariables(LayoutSetup.cssVariables)
        setTimeout(() => {
            disableSplashScreen()
        }, 500)
    }

    const setLogoSizeSm = () => {
        setLogoSize('sm')
    }
    const setLogoSizeLg = () => {
        setLogoSize('lg')
    }


    const asideMinimize = () => {
        setAsideIsMinimized(true)
    }
    const asideMaximize = () => {
        setAsideIsMinimized(false)
    }

    const value: LayoutContextModel = {
        logoSize,
        asideIsMinimized,
        config,
        classes,
        attributes,
        cssVariables,
        setLayout,
        setLogoSizeSm,
        setLogoSizeLg,
        asideMinimize,
        asideMaximize
    }

    useEffect(() => {
        disableSplashScreen()
    }, [])

    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}

export {LayoutContext, LayoutProvider}

export function useLayout() {
    return useContext(LayoutContext)
}
