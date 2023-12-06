import {
  ListRounded,
  ListOutlined,
  PeopleOutlined,
  PeopleRounded,
  SpaceDashboardOutlined,
  SpaceDashboardRounded,
} from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';

type Props = {
  name: string;
} & SvgIconProps;

export function Icon({ name, ...props }: Props) {
  switch (name) {
    case 'list':
      return <ListRounded {...props} />;
    case 'list-outlined':
      return <ListOutlined {...props} />;
    case 'people':
      return <PeopleRounded {...props} />;
    case 'people-outlined':
      return <PeopleOutlined {...props} />;
    case 'space-dashboard':
      return <SpaceDashboardRounded {...props} />;
    case 'space-dashboard-outlined':
      return <SpaceDashboardOutlined {...props} />;
    default:
      return <></>;
  }
}
