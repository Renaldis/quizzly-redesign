import { Grid } from 'antd';

export const useIsMobileScreen = (): boolean => {
  const { md } = Grid.useBreakpoint();
  return !md;
};
