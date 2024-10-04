import { Outlet } from "@remix-run/react";

interface MenuItem {
    Title: string;
}

interface Data {
    Title: string;
    MenuItems: MenuItem[];
}

export default function templeteBasic() {

    return (
        <div className="container-fluid">
            
            <div className="row" >
                <div className="col">
                    <Outlet />
                </div>
            </div>
            
        </div>
    );
}
