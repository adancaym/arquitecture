/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'
import {ROLE, useAuth} from "../../../../app/modules/auth";

export function AsideMenuMain() {

    const {currentUser} = useAuth();

    if (!currentUser) return <>
        Usuario no autenticado
    </>
    const {groups} = currentUser;


    const renderMenusProductsDefault = () => {

        return <>
            {groups.map(grupo =>
                <div key={`${grupo.id}-divider`}>
                    <div  className='menu-item'>
                        <div className='menu-content'>
                            <div className='separator mx-1 my-4'></div>
                        </div>
                    </div>
                    <MenuNameSection section={grupo.name}/>
                    {grupo.menus.map(menu => menu.menus.length === 0 ? (
                        <Menu key={`${menu.id}-menu`} name={menu.name} path={menu.path}/>
                    ) : (<DropDownMenu
                        key={`${menu.id}-submenu`}
                        name={menu.name}
                        path={menu.path}
                        menus={menu.menus.map(submenu => ({
                            name: submenu.name,
                            path: submenu.path,
                        }))}
                    />))}
                </div>
            )}

        </>

    }


    return (
        <>

            {renderMenusProductsDefault()}

            <div key={8} className='menu-item'>
                <div className='menu-content'>
                    <div className='separator mx-1 my-4'></div>
                </div>
            </div>
        </>
    )
}

interface IAsideMenuItemProps {
    section?: string
}

const MenuNameSection = ({section}: IAsideMenuItemProps) => <div key={section} className='menu-item'>
    <div className='menu-content pt-8 pb-2'>
        <span className='menu-section text-muted text-uppercase fs-8 ls-1'>{section}</span>
    </div>
</div>


interface MenuItemProps {
    path: string
    name: string
    hasBullet?: boolean
    icon?: string;
}

const Menu = ({name, path, hasBullet = false, icon = '/media/icons/duotune/general/gen019.svg'}: MenuItemProps) =>
    <AsideMenuItem
        key={name}
        to={path}
        icon={icon}
        title={name}
        hasBullet={hasBullet}
    />


interface MultiMenuProps {
    path: string
    name: string
    menus: MenuItemProps[]
}

const DropDownMenu = ({name, path, menus}: MultiMenuProps) => <AsideMenuItemWithSub
    to='/apps/chat'
    title={name}
    fontIcon='bi-chat-left'
    icon='/media/icons/duotune/communication/com012.svg'
>
    {menus.map((menu) => <Menu key={menu.name} name={menu.name} path={menu.path} hasBullet={true}/>)}
</AsideMenuItemWithSub>
