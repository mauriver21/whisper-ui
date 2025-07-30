import { Box } from 'reactjs-ui-core';
import { Outlet } from 'react-router-dom';

export const MainLayout: React.FC = () => {
  return (
    <Box display="grid" gridTemplateColumns="295px 1fr">
      <Box display="grid">
        <Outlet />
      </Box>
    </Box>
  );
};
