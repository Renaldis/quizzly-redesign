import { Avatar, Flex, Space, Typography } from 'antd';
import React from 'react';
import { useIsMobileScreen } from '../../utils/screen';

export type TUserAvatarProps = {
  info?: {
    fullname: string;
    roles: { name: string }[];
    src?: string;
  };
};

const { Text } = Typography;

const UserAvatar: React.FC<TUserAvatarProps> = ({ info }) => {
  const isMobile = useIsMobileScreen();

  return (
    <Flex gap={12} align="center">
      <Avatar size="default" src={info?.src} data-testid="avatar" />

      {!isMobile && (
        <Space.Compact direction="vertical" size="small">
          {/* Username */}
          <Text
            style={{
              fontWeight: '500',
              fontSize: '14px',
              color: '#2D87C6',
            }}
          >
            {info?.fullname}
          </Text>

          {/* User Roles */}
          <Text
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#B5F5EC',
            }}
          >
            {info?.roles?.map((x) => x.name).join(', ')}
          </Text>
        </Space.Compact>
      )}
    </Flex>
  );
};

export default UserAvatar;
