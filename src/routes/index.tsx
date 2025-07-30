import { TranscribeAudioModule } from '@components/TranscribeAudioModule';
import { MainLayout } from '@layouts/MainLayout';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [{ index: true, element: <TranscribeAudioModule /> }],
  },
];
