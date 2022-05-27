import {toAbsoluteUrl} from "../../../_metronic/helpers";
import {useLayout} from "../../../_metronic/layout/core";
import './Logo.scss';

export const Logo = () => {
    const {config, logoSize} = useLayout()
    const {aside} = config

    const getSvg = () => {
        if (logoSize === 'sm') {
            return aside.theme === 'dark' ?
                <img alt='Logo' src={toAbsoluteUrl('/shvl/logos/1-s.svg')} className='w-25px'/> :
                <img alt='Logo' src={toAbsoluteUrl('/shvl/logos/2-s.svg')} className='w-25px'/>

        }
        return aside.theme === 'dark' ?
            <img alt='Logo' src={toAbsoluteUrl('/shvl/logos/1.svg')} className='w-50'/> :
            <img alt='Logo' src={toAbsoluteUrl('/shvl/logos/2.svg')} className='w-50'/>

    }

    return (
        <div className='logo-custom'>
            {getSvg()}
        </div>
    )


}