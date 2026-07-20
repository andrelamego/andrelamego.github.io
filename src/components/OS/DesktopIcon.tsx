import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onOpen: () => void;
  isIOSDock?: boolean;
}

export const DesktopIcon = memo(function DesktopIcon({ icon, label, onOpen, isIOSDock }: DesktopIconProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onOpen}
      className={`flex flex-col items-center justify-center ${isIOSDock ? 'w-14 h-14 p-0' : 'w-20 h-24 p-2'} rounded-xl cursor-pointer group`}
    >
      <div className={`${isIOSDock ? 'w-12 h-12' : 'w-14 h-14'} flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 shadow-lg group-hover:bg-white/10 transition-colors`}>
        {icon}
      </div>
      {!isIOSDock && (
        <span className="mt-2 text-[11px] leading-tight font-medium text-white/90 drop-shadow-md text-center line-clamp-2">
          {label}
        </span>
      )}
    </motion.div>
  );
});
