import {Logo} from "../../../../components/common/Logo/Logo";
import {Link} from 'react-router-dom'
import './navigation.scss'

export const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <Logo/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    </ul>
                    <ul className="navbar-nav d-flex">

                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/">
                                <i className="fa-brands fa-twitter big-icon"></i>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/">
                                <i className="fa-brands fa-discord big-icon"></i>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/">
                                <i className="fa-brands fa-youtube big-icon"></i>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={'nav-link text-white'} to={'/auth'}>
                                <i className="fa fa-sign-in big-icon"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
