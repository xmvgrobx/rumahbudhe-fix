"use client"

import React, { ReactNode, useState } from 'react';
import Sidebar from '@/components/sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [role, setRole] = useState<'employee' | 'owner'>('employee');

  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="ml-64 p-6">{children}</div>
    </div>
  );
};

export default MainLayout;