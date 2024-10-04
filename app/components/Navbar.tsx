import { Link } from "@remix-run/react";


interface MenuItem {
    Title: string;
    MenuItems?: { Title: string }[];
}

const DropdownMenuItem = ({ item, index }: { item: MenuItem, index: number }) => {
    return (
        <li className="nav-item dropdown" key={`menuDropDown-${index}`}>
            <label className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {item.Title}
            </label>
            <ul className="dropdown-menu">
                {item.MenuItems?.map((subItem: { Title: string }, subIndex: number) => (
                    <li key={`submenu-${subIndex}`}><Link className="dropdown-item" to={`filtros/${subItem.id}`}>{subItem.Title}</Link></li>
                ))}
            </ul>
        </li>
    )
}


const MenuItem = ({ item, index }: { item: MenuItem, index: number }) => {
    return (
        <li className="nav-item" key={`menu-${index}`}>
            <a className="nav-link" href="#">{item.Title}</a>
        </li>
    )
}

interface NavbarProps {
    title: string;
    list: any[];
}


export default function NavbarComponent({ title, list }: NavbarProps) {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">{title}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        {list.map((item, index) => (
                            ('MenuItems' in item) ?
                                <DropdownMenuItem item={item} index={index} />
                                :
                                <MenuItem item={item} index={index} />
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}