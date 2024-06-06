import { Avatar, List, Typography } from '@mui/material';
import { NestedMenu, PathMenu, UrlMenu } from '@/domain/entities';
import { NavbarDropdownMenu } from './navbar-dropdown-menu';
import { NavbarMenu } from './navbar-menu';

type Props = {
  menus?: (PathMenu | UrlMenu | NestedMenu)[];
};

export function Navbar({ menus }: Props) {
  return (
    <nav className="flex flex-grow items-center justify-end md:ml-4">
      <List dense={true} disablePadding={true} className="hidden text-center md:flex">
        {menus &&
          menus.map((menu, i) => {
            if (menu.hasOwnProperty('path') || menu.hasOwnProperty('url')) {
              return <NavbarMenu key={i} menu={menu as PathMenu | UrlMenu} />;
            } else {
              return <NavbarDropdownMenu key={i} menu={menu as NestedMenu} />;
            }
          })}
      </List>
      <Typography className="hidden mr-4 md:block">User</Typography>
      <Avatar
        variant="circular"
        sizes="32px"
        src="/assets/img/profile.png"
        alt="User"
        className="m-1 w-8 h-8 md:m-0"
      />
    </nav>
  );
}
