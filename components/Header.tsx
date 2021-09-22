import Link from "next/link";

const Header = () => {
  return (
    <div className="header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
      <div className="container header-area header-sticky wow slideInDown">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <Link href="/" passHref>
                <a className="text-dark logo">
                  Dev <span> Agency </span>
                </a>
              </Link>
              <ul className="nav">
                <li className="scroll-to-section">
                  <Link
                    href={{
                      pathname: "/",
                      hash: "top",
                    }}
                    passHref
                  >
                    <a className="active">Accueil</a>
                  </Link>
                </li>
                <li className="scroll-to-section">
                  <Link href="#services" passHref>
                    <a>Nos services</a>
                  </Link>
                </li>
                <li className="scroll-to-section">
                  <Link
                    href={{
                      pathname: "/",
                      hash: "competences",
                    }}
                    passHref
                  >
                    <a>Nos compétences</a>
                  </Link>
                </li>
                <li className="scroll-to-section">
                  <Link
                    href={{
                      pathname: "/",
                      hash: "about",
                    }}
                    passHref
                  >
                    <a>Nos garanties</a>
                  </Link>
                </li>
                <li className="scroll-to-section">
                  <Link
                    href={{
                      pathname: "/",
                      hash: "portfolio",
                    }}
                    passHref
                  >
                    <a>Qui sommes-nous ?</a>
                  </Link>
                </li>
                <li className="scroll-to-section">
                  <div className="bg-info">
                    <Link
                      href={{
                        pathname: "/",
                        hash: "contact",
                      }}
                      passHref
                    >
                      <a>Nous contacter</a>
                    </Link>
                  </div>
                </li>
              </ul>
              <a className="menu-trigger">
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
