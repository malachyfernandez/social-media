
import { type ComponentProps, useMemo } from 'react';
import Svg, { Path, G, Rect, Mask } from 'react-native-svg';

type SadEmojiProps = ComponentProps<typeof Svg> & {
 size?: number;
 lineWidth?: number;
};

export function SadEmoji({ size = 24, lineWidth = 2, ...props }: SadEmojiProps) {
  const maskId = useMemo(
    () => `sadEmojiMask-${Math.random().toString(36).slice(2, 8)}`,
    [],
  );

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>{/* Icon from Material Line Icons by Vjacheslav Trushkin - https://github.com/cyberalien/line-md/blob/master/license.txt */}
      <Mask id={maskId}>
        <G
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={lineWidth}
        >
          <Path
            strokeDasharray="64"
            strokeDashoffset="64"
            d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.6s"
              values="64;0"
            />
          </Path>
          <Path strokeDasharray="2" strokeDashoffset="2" d="M9 9v1">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.7s"
              dur="0.2s"
              values="2;0"
            />
          </Path>
          <Path strokeDasharray="2" strokeDashoffset="2" d="M15 9v1">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.9s"
              dur="0.2s"
              values="2;0"
            />
          </Path>
          <Path strokeDasharray="12" strokeDashoffset="12" d="M8 16c0.5 -1 1.79 -2 4 -2c2.21 0 3.5 1 4 2">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="1.1s"
              dur="0.2s"
              values="12;0"
            />
          </Path>
          <Path
            fill="#000"
            fillOpacity="0"
            stroke="none"
            d="M9.55 12c1.19 1.88 2.45 4.18 2.45 5.5c0 2.5 -2 4.5 -4.5 4.5c-2.5 0 -4.5 -2 -4.5 -4.5c0 -1.32 1.26 -3.62 2.45 -5.5Z"
          >
            <animate
              fill="freeze"
              attributeName="fill-opacity"
              begin="0.9s"
              dur="0.2s"
              values="0;1"
            />
          </Path>
          <Path
            fill="#fff"
            fillOpacity="0"
            stroke="none"
            d="M7.5 13c0 0 2.5 3.12 2.5 4.5c0 1.38 -1.12 2.5 -2.5 2.5c-1.38 0 -2.5 -1.12 -2.5 -2.5c0 -1.38 2.5 -4.5 2.5 -4.5Z"
          >
            <animate
              fill="freeze"
              attributeName="fill-opacity"
              begin="0.9s"
              dur="0.2s"
              values="0;1"
            />
          </Path>
        </G>
      </Mask>
      <Rect width="24" height="24" fill="currentColor" mask={`url(#${maskId})`} />
    </Svg>
  );
}

export default SadEmoji;