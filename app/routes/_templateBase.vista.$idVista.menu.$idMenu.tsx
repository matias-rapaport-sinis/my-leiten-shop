import { Outlet, useLoaderData } from "@remix-run/react";
import NavbarBaseComponent from "~/components/NavbarBase";
import { getMenuLoader } from "~/loaders/getMenuLoader";

type Data = {
    Title: string;
    MenuItems: Array<{ id: number; name: string; }>;
};

export const loader = getMenuLoader;  

export default function TemplateBase(){

    const { data } = useLoaderData<{ data: Data }>();

    return (
        <div>
            <NavbarBaseComponent title={data.Title} list={data.MenuItems} />
            <Outlet />
        </div>
    );
};