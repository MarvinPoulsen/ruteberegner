import React, { FC } from 'react';
import './navbar.scss';

interface NavbarProps {
    logo: string;
}

const Navbar: FC<NavbarProps> = (props: NavbarProps) => {
    return (
        <>
            <nav
                className="navbar"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <a className="navbar-item noHover">
                        <img
                            src={props.logo}
                            width="112"
                            height="28"
                        />
                    </a>
                </div>

                <div className="navbar-start">
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                    </div>
                </div>
            </nav>
        </>
    );
};
export default Navbar;
