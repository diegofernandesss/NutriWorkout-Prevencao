import {
  NavBackground,
  NavContainer,
  Nav,
  NavLinkMobile,
  Logo,
  NavLink,
  MobileMenuButton,
  LogoHighligh,
  LineViolet,
  NavLink1,
  NavLinkMobile1
} from './NavBarCss'
import { FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => {

  const Links = [
    {name: "Sobre", link:'#about'},
    {name: "Planos", link:'#planos'},
  ]

  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
  return (
    <>
       <>
        <NavBackground>
            <NavContainer>
                <Nav>
                    <Link to="/">
                        <Logo>
                            Nutri<LogoHighligh> Workout</LogoHighligh>
                        </Logo>
                    </Link>

                    <div className="hidden md:block ">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink1 to={'/'}>Página Inicial</NavLink1>
                            {Links.map((link, index) => (
                                    <NavLink 
                                    key={index} 
                                    href={link.link}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(-1)} >
                                {link.name}
                                <LineViolet className={` ${hoveredIndex === index ? 'scale-x-100' : 'scale-x-0'}`} />
                                </NavLink>
                            ))}
                        </div>
                    </div>
                    <div className="md:hidden flex items-center "> 
                        <MobileMenuButton onClick={toggleMenu} className="ml-4">
                            {menuOpen ? (
                                    <FiX className="h-6 w-6 text-white" />
                                ) : ( 
                                    <FiMenu className="h-6 w-6 text-white" />
                                )}
                        </MobileMenuButton>
                    </div>
                </Nav>
            </NavContainer>
                {menuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <NavLinkMobile1 to={'/'}>Página Inicial</NavLinkMobile1>
                            {Links.map((link, index) => (
                            <NavLinkMobile key={index} href={link.link}>
                                {link.name}
                            </NavLinkMobile>
                            ))}
                        </div>
                    </div>
                )}
        </NavBackground>
    </>
    </>
  );
}