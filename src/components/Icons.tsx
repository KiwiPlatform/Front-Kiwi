import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

export const LogoKiwi: React.FC<LogoProps> = ({ width = 90, height = 24, className = '', color = '#38F2AB' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={width} 
    height={height} 
    viewBox="0 0 90 24" 
    fill="none"
    className={className}
  >
    <path d="M38.2402 9.74865H29.1194C28.9005 9.74865 28.7229 9.9175 28.7229 10.126V23.622C28.7229 23.8304 28.9005 23.9993 29.1194 23.9993H38.2402C38.4596 23.9993 38.6372 23.8304 38.6372 23.622V10.126C38.6372 9.9175 38.4596 9.74865 38.2402 9.74865Z" fill={color}/>
    <path d="M28.2508 4.03519C28.2508 4.04132 28.2508 4.04745 28.2508 4.05358C28.2508 4.05971 28.2508 4.06537 28.2508 4.07151C28.248 9.49491 39.1093 9.36568 39.1093 4.07151C39.1093 4.06585 39.1093 4.05971 39.1088 4.05358C39.1088 4.04745 39.1093 4.04179 39.1093 4.03519C39.1102 -1.33775 28.2508 -1.35237 28.2508 4.03519Z" fill={color}/>
    <path d="M88.3812 9.68073H79.2608C79.0415 9.68073 78.8639 9.84958 78.8639 10.058V23.6225C78.8639 23.8304 79.0415 23.9998 79.2608 23.9998H88.3812C88.6006 23.9998 88.7782 23.8309 88.7782 23.6225V10.058C88.7782 9.85005 88.6006 9.68073 88.3812 9.68073Z" fill={color}/>
    <path d="M89.2498 4.03519C89.2507 -1.33775 78.3914 -1.35237 78.3914 4.03519C78.3914 4.04132 78.3914 4.04745 78.3914 4.05358C78.3914 4.05971 78.3914 4.06585 78.3914 4.07198C78.389 9.49538 89.2498 9.36615 89.2498 4.07198C89.2498 4.06632 89.2498 4.06019 89.2493 4.05405C89.2493 4.04792 89.2498 4.04179 89.2498 4.03519Z" fill={color}/>
    <path d="M74.5297 0.318183H66.974C66.7546 0.318183 66.577 0.487031 66.577 0.695496V6.81787C66.577 10.3566 65.5286 11.7088 63.9536 12.1262C63.8277 12.1597 63.7037 12.0677 63.7037 11.9437V0.695496C63.7037 0.487031 63.5261 0.318183 63.3067 0.318183H55.7586C55.5392 0.318183 55.3621 0.487031 55.3621 0.695496V6.7924C55.3621 10.3311 54.3137 11.6833 52.7382 12.1007C52.6127 12.1342 52.4883 12.0422 52.4883 11.9182V0.695496C52.4883 0.487031 52.3107 0.318183 52.0918 0.318183H42.9709C42.7521 0.318183 42.5745 0.487031 42.5745 0.695496V23.622C42.5745 23.8305 42.7521 23.9993 42.9709 23.9993H49.2466C50.2955 23.9993 51.313 23.8262 52.2717 23.5078C55.2898 22.5386 57.6535 20.2186 58.5709 17.3048C58.716 16.8917 58.8212 16.4629 58.9251 16.03C58.9669 15.8569 59.22 15.8673 59.22 16.0488V23.622C59.22 23.8305 59.3971 23.9993 59.6165 23.9993H65.0513C70.505 23.9993 74.9261 19.7941 74.9261 14.6066V0.695496C74.9261 0.487031 74.749 0.318183 74.5297 0.318183Z" fill={color}/>
    <path d="M9.9692 23.9993V14.9796C9.9692 14.8561 10.0918 14.7664 10.2182 14.7962C12.9732 15.4451 14.8408 17.6562 14.9235 23.5828C14.9268 23.8135 15.125 23.9988 15.3674 23.9988L9.9692 23.9993ZM12.448 12.1587C19.2441 12.1587 24.7678 6.97823 24.8936 0.542684C24.896 0.419114 24.7898 0.318183 24.6602 0.318183H19.8839C18.1154 0.318183 16.7705 0.700684 15.4717 1.37089C12.7406 2.71742 10.7988 5.25344 10.2886 8.24459C10.2731 8.32052 10.2628 8.40447 10.2463 8.49173C10.2102 8.67944 9.96826 8.64407 9.97108 8.4705L9.96967 0.539383C9.96967 0.417228 9.86539 0.317712 9.73668 0.317712H0.232989C0.104281 0.317712 0 0.416756 0 0.539383V23.7776C0 23.8998 0.104281 23.9988 0.232989 23.9988H24.6602C24.7898 23.9988 24.896 23.8979 24.8936 23.7743C24.7678 17.3383 19.2437 12.1587 12.448 12.1587Z" fill={color}/>
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const EditIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.50023C18.8978 2.10243 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.10243 21.5 2.50023C21.8978 2.89804 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.10243 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SaveIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="17,21 17,13 7,13 7,21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="7,3 7,8 15,8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M19 12H5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 19L5 12L12 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ExportIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="7,10 12,15 17,10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="15" x2="12" y2="3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LogoutIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="16,17 21,12 16,7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="21" y1="12" x2="9" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
); 