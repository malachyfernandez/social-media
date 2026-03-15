import Svg, { Path, G, Line } from 'react-native-svg';
import { cssInterop } from 'nativewind';

cssInterop(Svg, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: true,
    },
  },
});

interface UserIconProps {
  size?: number;
  className?: string;
}

export function UserIcon({ size = 24, className }: UserIconProps) {
 return (
    <Svg className={className} width={size} height={size} viewBox="0 0 24 24">{/* Icon from Material Line Icons by Vjacheslav Trushkin - https://github.com/cyberalien/line-md/blob/master/license.txt */}<G fill="none" stroke="currentColor" strokeDasharray="28" strokeDashoffset="28" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><Path d="M4 21v-1c0 -3.31 2.69 -6 6 -6h4c3.31 0 6 2.69 6 6v1"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="28;0" /></Path><Path d="M12 11c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4Z"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="28;0" /></Path></G></Svg>
 )
}

export default UserIcon;