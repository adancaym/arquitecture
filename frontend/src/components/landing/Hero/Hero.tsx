import './hero.scss'
import {toAbsoluteUrl} from "../../../_metronic/helpers";

interface HeroProps {
    pathToImg?: string
    children?: React.ReactNode | JSX.Element | JSX.Element[]
}

export const Hero = ({pathToImg, children}: HeroProps) => {
    return <div className={'container  d-grid gap-5 mb-50 align-content-between'} style={{minHeight: '60vh'}}>
        <div className={'hero-image'}
             style={{backgroundImage: pathToImg ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${toAbsoluteUrl(pathToImg)})` : ''}}>
            <div className="hero-content d-grid gap-5 text-center">
                {children}
            </div>
        </div>
    </div>
}