
import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {useLayout} from '../../core'
import {KTSVG} from '../../../helpers'
import {AsideMenu} from './AsideMenu'
import {Logo} from "../../../../components/common/Logo/Logo";


const AsideDefault: FC = () => {
    const {config, classes,  setLogoSizeSm, setLogoSizeLg, asideIsMinimized, asideMinimize, asideMaximize} = useLayout()
    const {aside} = config


    return (
        <div
            className={clsx('aside', classes.aside.join(' '))}
            data-kt-drawer='true'
            data-kt-drawer-name='aside'
            data-kt-drawer-activate='{default: true, lg: false}'
            data-kt-drawer-overlay='true'
            data-kt-drawer-width="{default:'200px', '300px': '250px'}"
            data-kt-drawer-direction='start'
            data-kt-drawer-toggle='#kt_aside_mobile_toggle'
            onMouseEnter={() => {
                if (asideIsMinimized) {
                    setLogoSizeLg()
                }
            }}
            onMouseLeave={() => {
                if (asideIsMinimized) setLogoSizeSm()
                else setLogoSizeLg()
            }}
        >
            <div className='aside-logo flex-column-auto'>
                <Link to='/dashboard'>
                    <Logo/>
                </Link>

                {aside.minimize && (
                    <div
                        id=''
                        className='btn btn-icon w-auto px-0 btn-active-color-primary'
                        data-kt-toggle={'true'}
                        data-kt-toggle-state='active'
                        data-kt-toggle-target='body'
                        data-kt-toggle-name='aside-minimize'
                        onClick={()=> {
                            asideIsMinimized ? asideMaximize() : asideMinimize();
                            asideIsMinimized ? setLogoSizeLg() : setLogoSizeSm();
                        }}
                    >
                        <KTSVG
                            path={'/media/icons/duotune/arrows/arr080.svg'}
                            className={'svg-icon-1 rotate-180'}
                        />
                    </div>
                )}
            </div>
            <div className='aside-menu flex-column-fluid'>
                <AsideMenu asideMenuCSSClasses={classes.asideMenu}/>
            </div>
        </div>
    )
}

export {AsideDefault}
