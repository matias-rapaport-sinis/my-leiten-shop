import { Link } from "@remix-run/react";


interface MenuItem {
    Title: string;
    MenuItems?: { Title: string }[];
}

const DropdownMenuItem = ({ item, index }: { item: MenuItem, index: number }) => {
    return (
        <li className="nav-item dropdown" key={`dropDownMenu-${index}`}>
            <label className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <Link to={`filtros/productos/${item.id}`}>{item.Title}</Link>
            </label>
            <ul className="dropdown-menu">
                {item.MenuItems?.map((subItem, subIndex: number) => (
                    <li key={`dropDownMenu-${index}-${subIndex}`}>
                        <img src={subItem.image.image} className="img-thumbnail" alt="..." />
                        <Link className="dropdown-item" to={`filtros/productos/${subItem.id}/${null}`}>{subItem.Title}</Link>
                    </li>
                ))}
            </ul>
        </li>
    )
}

const MenuItem = ({ item, index }: { item: MenuItem, index: number }) => {
    return (
        <li className="nav-item" key={`itemMenu-${index}`}>
            <Link className="nav-link" to={`filtros/productos/${item.id}/${null}`}>{item.Title}</Link>
        </li>
    )
}

export default function NavbarBaseComponent({ title, list }) {

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
                                <DropdownMenuItem key={`dropDownMenu-${index}`} item={item} index={index} />
                                :
                                <MenuItem key={`itemMenu-${index}`} item={item} index={index} />
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

