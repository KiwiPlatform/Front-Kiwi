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

export const KiwiIconLanding: React.FC<IconProps> = ({ size = 60, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_17023_1197)">
      <path d="M63.9672 31.3243C63.8917 30.7821 63.6632 30.2573 63.2527 29.8235C62.1276 28.6307 59.9471 28.3189 58.2043 28.3712C55.4933 28.4525 52.8074 28.8998 50.3055 29.7654C48.6247 30.3464 44.3063 31.9556 47.7165 33.4815C50.8206 34.8719 54.7206 35.6406 58.2818 35.6387C59.6896 35.6387 61.415 35.4393 62.5323 34.686C63.5606 33.9908 63.9963 32.9141 64.0021 31.8529C64.0021 31.6767 63.9924 31.5005 63.9692 31.3262" fill="#38F2AB"/>
      <path d="M13.6949 29.7635C11.193 28.8998 8.50711 28.4525 5.79606 28.3692C4.05325 28.3169 1.87473 28.6287 0.747713 29.8216C0.337184 30.2553 0.108682 30.7821 0.0331597 31.3223C0.0079857 31.4966 -0.0016966 31.6728 0.000239862 31.849C0.00604924 32.9102 0.441753 33.9869 1.47001 34.6821C2.58541 35.4354 4.31274 35.6348 5.71861 35.6348C9.27976 35.6368 13.1798 34.868 16.2839 33.4776C19.694 31.9497 15.3757 30.3405 13.6949 29.7615" fill="#38F2AB"/>
      <path d="M34.2366 50.3053C33.6556 48.6244 32.0464 44.3061 30.5205 47.7162C29.1301 50.8184 28.3613 54.7204 28.3633 58.2815C28.3633 59.6893 28.5627 61.4147 29.316 62.5301C30.0112 63.5584 31.0879 63.9941 32.1491 63.9999C32.3253 63.9999 32.5015 63.9902 32.6758 63.967C33.218 63.8895 33.7428 63.663 34.1785 63.2524C35.3713 62.1254 35.6831 59.9469 35.6308 58.2041C35.5495 55.493 35.1022 52.8072 34.2366 50.3053Z" fill="#38F2AB"/>
      <path d="M32.6758 0.0329155C32.5015 0.00774156 32.3253 -0.00194074 32.1491 -4.27899e-06C31.0879 0.0058051 30.0112 0.441509 29.316 1.46977C28.5627 2.58517 28.3633 4.31249 28.3633 5.71836C28.3613 9.27951 29.1301 13.1795 30.5205 16.2837C32.0484 19.6938 33.6576 15.3755 34.2366 13.6946C35.1002 11.1927 35.5476 8.50686 35.6308 5.79582C35.6831 4.05301 35.3713 1.87449 34.1785 0.747469C33.7447 0.33694 33.218 0.108437 32.6777 0.0329155" fill="#38F2AB"/>
      <path d="M53.0956 47.9622C51.1204 46.1032 48.9051 44.5192 46.5252 43.3612C44.9257 42.5827 40.7352 40.6675 42.0655 44.159C43.2777 47.3367 45.4911 50.6384 48.0104 53.1558C49.0058 54.1492 50.3671 55.2297 51.6897 55.4873C52.9078 55.7235 53.9786 55.2704 54.7319 54.5249C54.8558 54.4009 54.974 54.2692 55.0805 54.1279C55.4097 53.6902 55.6207 53.1577 55.6362 52.5613C55.6846 50.9211 54.364 49.1589 53.0937 47.9641" fill="#38F2AB"/>
      <path d="M16.0377 10.9041C14.8429 9.63573 13.0807 8.31507 11.4405 8.36154C10.8441 8.37897 10.3096 8.58811 9.87394 8.91731C9.73258 9.02381 9.6009 9.14194 9.47696 9.26587C8.73143 10.0192 8.27829 11.09 8.51454 12.308C8.77016 13.6307 9.8507 14.992 10.846 15.9873C13.3634 18.5067 16.6651 20.722 19.8428 21.9323C23.3343 23.2645 21.4172 19.0721 20.6407 17.4726C19.4827 15.0927 17.8986 12.8754 16.0396 10.9022" fill="#38F2AB"/>
      <path d="M19.8409 42.0657C16.6631 43.278 13.3615 45.4913 10.8441 48.0107C9.85067 49.006 8.77013 50.3673 8.51258 51.6899C8.27633 52.908 8.72946 53.9788 9.47693 54.7321C9.60087 54.8561 9.73255 54.9742 9.87391 55.0807C10.3115 55.4099 10.8441 55.619 11.4405 55.6365C13.0807 55.6849 14.8429 54.3642 16.0377 53.0939C17.8967 51.1187 19.4807 48.9034 20.6387 46.5235C21.4171 44.924 23.3323 40.7335 19.8409 42.0638" fill="#38F2AB"/>
      <path d="M46.5252 20.6387C48.9051 19.4807 51.1204 17.8967 53.0956 16.0377C54.3659 14.8429 55.6847 13.0807 55.6382 11.4405C55.6208 10.8441 55.4116 10.3096 55.0824 9.87394C54.9759 9.73258 54.8578 9.6009 54.7339 9.47696C53.9806 8.73143 52.9097 8.27829 51.6917 8.51454C50.3691 8.77016 49.0077 9.8507 48.0124 10.846C45.4931 13.3634 43.2797 16.6651 42.0675 19.8428C40.7371 23.3343 44.9276 21.4172 46.5271 20.6407" fill="#38F2AB"/>
    </g>
    <defs>
      <clipPath id="clip0_17023_1197">
        <rect width="64" height="64" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

export const UserSvgIcon: React.FC<IconProps> = ({ size = 38, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 510 510" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <linearGradient id="lg1"><stop offset="0" stopColor="#7faef4"/><stop offset="1" stopColor="#4c8df1"/></linearGradient>
    <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="72.017" x2="448.659" xlinkHref="#lg1" y1="30.771" y2="407.412"/>
    <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="393.324" x2="118.808" xlinkHref="#lg1" y1="393.324" y2="118.808"/>
    <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="220.253" x2="342.575" y1="220.253" y2="342.575">
      <stop offset="0" stopColor="#4166bf"/>
      <stop offset="1" stopColor="#4256ac"/>
    </linearGradient>
    <linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="368.352" x2="227.221" y1="309.634" y2="168.502">
      <stop offset="0" stopColor="#4256ac" stopOpacity="0"/>
      <stop offset="1" stopColor="#1b1464"/>
    </linearGradient>
    <linearGradient id="lg2"><stop offset="0" stopColor="#ebeff0"/><stop offset="1" stopColor="#e3e5e4"/></linearGradient>
    <linearGradient id="SVGID_5_" gradientUnits="userSpaceOnUse" x1="51.502" x2="399.05" xlinkHref="#lg2" y1="-7.217" y2="340.331"/>
    <linearGradient id="SVGID_6_" gradientUnits="userSpaceOnUse" x1="232.637" x2="276.114" xlinkHref="#lg2" y1="303.885" y2="381.967"/>
    <g>
      <path d="m239.907 2.943c-38.555 15.625-127.875 53.362-171.842 62.404-9.715 1.998-16.648 10.61-16.648 20.528v127.182c0 99.733 44.909 194.164 122.273 257.105l23.878 19.426c33.451 27.215 81.411 27.215 114.863 0l23.878-19.426c77.364-62.941 122.273-157.376 122.273-257.109v-127.178c0-9.918-6.933-18.53-16.648-20.528-43.967-9.042-133.287-46.779-171.841-62.404-9.683-3.924-20.503-3.924-30.186 0z" fill="url(#SVGID_1_)"/>
      <g>
        <circle cx="255" cy="255" fill="url(#SVGID_2_)" r="169.321"/>
        <path d="m405.238 255c0 45.321-20.067 85.954-51.801 113.5-26.365 22.886-60.783 22.738-98.437 22.738-37.275 0-71.379.426-97.639-22.05-32.195-27.555-52.599-68.489-52.599-114.188 0-82.974 67.264-150.238 150.238-150.238s150.238 67.264 150.238 150.238z" fill="url(#SVGID_3_)"/>
        <path d="m255.332 127.937c-38.909 0-68.676 29.767-68.676 68.676 0 20.788 7.232 39.467 21.552 52.363l121.193 121.193c5.079-3.425 19.423 2.333 24.035-1.67 31.734-27.546 51.802-68.178 51.802-113.499 0-2.749-.079-5.48-.225-8.193l-97.318-97.318c-12.896-14.32-31.575-21.552-52.363-21.552z" fill="url(#SVGID_4_)"/>
        <circle cx="255" cy="196.281" fill="url(#SVGID_5_)" r="70.452"/>
        <path d="m348.476 315.4c19.076 12.239 20.97 39.524 3.686 54.185-.199.169-.398.337-.598.505-26.113 21.943-59.795 35.145-96.564 35.145-37.133 0-71.107-13.469-97.327-35.793-.102-.087-.204-.174-.306-.261-17.185-14.694-15.152-41.941 3.917-54.088 26.972-17.181 59.001-27.131 93.351-27.131 34.573 0 66.77 10.069 93.841 27.438z" fill="url(#SVGID_6_)"/>
      </g>
    </g>
  </svg>
); 

export const DashboardIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"
      fill={color}
    />
    <path
      d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"
      fill={color}
    />
  </svg>
);
export const NavbarGeneralIcon: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  className = '',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 16 16"
    className={className}
  >
    <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L4.047 3.339 8 7.293l3.954-3.954L9.049.435zm3.61 3.611L8.708 8l3.954 3.954 2.904-2.905c.58-.58.58-1.519 0-2.098l-2.904-2.905zm-.706 8.614L8 8.708l-3.954 3.954 2.905 2.904c.58.58 1.519.58 2.098 0l2.905-2.904zm-8.614-.706L7.292 8 3.339 4.046.435 6.951c-.58.58-.58 1.519 0 2.098z"/>
  </svg>
);

export const NavbarListIcon: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  className = '',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 16 16"
    className={className}
  >
    <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v2A1.5 1.5 0 0 1 14.5 5h-13A1.5 1.5 0 0 1 0 3.5zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5z"/>
    <path d="M2 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m10.823.323-.396-.396A.25.25 0 0 1 12.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0M0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/>
  </svg>
);

export const CaretRightFillIcon: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  className = '',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 16 16"
    className={className}
  >
    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
  </svg>
);
