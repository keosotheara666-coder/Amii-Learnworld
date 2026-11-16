import React from 'react';
import {
  BookOpen,
  Briefcase,
  Compass,
  Globe,
  HeartPulse,
  Laptop,
  Megaphone,
  PenTool,
  Users,
  Wrench,
} from 'lucide-react';
import { MajorBranch } from '../data/catalog';

export const MajorIcon: React.FC<{ name: MajorBranch['iconName']; className?: string }> = ({
  name,
  className = 'w-6 h-6',
}) => {
  switch (name) {
    case 'laptop':
      return <Laptop className={className} />;
    case 'heart':
      return <HeartPulse className={className} />;
    case 'briefcase':
      return <Briefcase className={className} />;
    case 'users':
      return <Users className={className} />;
    case 'wrench':
      return <Wrench className={className} />;
    case 'compass':
      return <Compass className={className} />;
    case 'book':
      return <BookOpen className={className} />;
    case 'megaphone':
      return <Megaphone className={className} />;
    case 'globe':
      return <Globe className={className} />;
    case 'pen':
      return <PenTool className={className} />;
  }
};
