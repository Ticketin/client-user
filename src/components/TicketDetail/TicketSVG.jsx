import * as React from "react"

const TicketSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={848}
    height={848}
    fill="none"
    {...props}
  >
    <defs>
      <clipPath id="cb">
        <path fill="#fff" d="M0 0h848v848H0z" />
      </clipPath>
      <pattern
        id="nbalogo"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#inba" transform="scale(.00262 .00152)" />
      </pattern>
      <style>
        {
          '@font-face{font-family:"NBA";src:url(https://static.duckee.xyz/NBA-Pacers.woff2)}.ta{font:700 80px Arial;fill:#fff;letter-spacing:-.03em}.ta2{font-size:18px;fill:#000}.tn{font:47px NBA,sans-serif;letter-spacing:-.03em;fill:#fff}.tn2{fill:#828282;font-size:24px}'
        }
      </style>
      <image
        xlinkHref="https://static.duckee.xyz/nba.png"
        id="inba"
        width={382}
        height={656}
      />
    </defs>
    <g clipPath="url(#cb)">
      <path
        fill="#F3F3F3"
        d="M24 0h511c0 17.673 14.327 32 32 32v784c-17.673 0-32 14.327-32 32H24V0Z"
      />
      <path
        fill="#000"
        stroke="#F5F5F5"
        d="M16 .5h223.5v847H16C7.44 847.5.5 840.56.5 832V16C.5 7.44 7.44.5 16 .5Z"
      />
      <path fill="url(#nbalogo)" d="M24 494h191v328H24z" />
      <path
        stroke="#CECECE"
        strokeDasharray="40 40"
        strokeLinecap="round"
        strokeWidth={3}
        d="M567 35v778"
      />
      <path
        fill="#F5F5F5"
        d="M599-.001c0 17.673-14.327 32-32 32v784c17.673 0 32 14.327 32 32h233c8.837 0 16-7.163 16-16v-816c0-8.837-7.163-16-16-16H599Z"
      />
      <path stroke="#fff" strokeWidth={2} d="M567 283.999h281" />
      <circle
        cx={708}
        cy={284.999}
        r={56}
        stroke="#fff"
        strokeWidth={2}
        transform="rotate(-90 708 284.999)"
      />
      <circle
        cx={704}
        cy={455.999}
        r={50}
        stroke="#fff"
        strokeWidth={2}
        transform="rotate(-90 704 455.999)"
      />
      <path
        stroke="#fff"
        strokeWidth={2}
        d="m693.239 602.009-.067-.009H599V494c0-60.199 48.801-109 109-109s109 48.801 109 109v108h-94.172l-.067.009A110.05 110.05 0 0 1 708 603c-5.007 0-9.935-.338-14.761-.991ZM722.761-32.009l.067.009H817V76c0 60.199-48.801 109-109 109S599 136.199 599 76V-32h94.172l.067-.009C698.065-32.663 702.993-33 708-33s9.935.337 14.761.991Z"
      />
      <path
        stroke="#fff"
        strokeWidth={2}
        d="M654 601.999v-145h100v145zM654 118.999v-118h100v118z"
      />
      <circle
        cx={704}
        cy={113.999}
        r={50}
        stroke="#fff"
        strokeWidth={2}
        transform="rotate(90 704 113.999)"
      />
      <path
        stroke="#CECECE"
        strokeDasharray="40 40"
        strokeLinecap="round"
        strokeWidth={3}
        d="M567 35v778"
      />
      <path fill="#E73325" d="M771 0h46v240h-46zM714 0h46v198h-46z" />
      <text className="tn" transform="rotate(-90 453.5 -264.5)">
        <tspan x={0.431} y={37.694}>
          {"2023 NBA"}
        </tspan>
      </text>
      <text className="tn" transform="rotate(-90 503 -272)">
        <tspan x={0.566} y={37.694}>
          {"GAME TICKET"}
        </tspan>
      </text>
      <text
        fill="#828282"
        fontFamily="NBA"
        fontSize={36}
        transform="translate(24 60)"
      >
        {"Upcoming"}
      </text>
      <text className="ta" transform="translate(20 80)">
        <tspan x={0} y={73.734}>
          {"BOS"}
        </tspan>
      </text>
      <text className="ta" transform="translate(20 172)">
        <tspan x={0} y={73.734}>
          {"0"}
        </tspan>
      </text>
      <text className="ta" transform="translate(20 284)">
        <tspan x={0} y={73.734}>
          {"MIA"}
        </tspan>
      </text>
      <text className="ta" transform="translate(20 376)">
        <tspan x={0} y={73.734}>
          {"0"}
        </tspan>
      </text>
      <text className="tn tn2" transform="rotate(-90 581.5 -25.5)">
        <tspan x={0} y={19.248}>
          {"DATE"}
        </tspan>
      </text>
      <text className="ta ta2" transform="rotate(-90 665.75 -109.75)">
        <tspan x={0} y={16.74}>
          {"TD GARDEN,"}
        </tspan>
        <tspan x={0} y={40}>
          {"100 Legends Way, Boston, MA"}
        </tspan>
      </text>
      <text className="tn tn2" transform="rotate(-90 649.5 -93.5)">
        <tspan x={0} y={19.248}>
          {"LOCATION"}
        </tspan>
      </text>
      <text className="ta ta2" transform="rotate(-90 597.5 -41.5)">
        <tspan x={0} y={16.74}>
          {"WEDNESDAY,"}
        </tspan>
        <tspan x={0} y={40}>
          {"MAY 27 PM 7:00"}
        </tspan>
      </text>
      <image
        width={215}
        height={215}
        x={602}
        y={592}
        href="https://pocky.deno.dev/api/qrcode/0"
        preserveAspectRatio="xMidYMid slice"
      />
      <image
        width={295}
        height={295}
        x={256}
        y={66}
        href="https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/bos.png"
        preserveAspectRatio="xMidYMid slice"
      />
      <image
        width={295}
        height={295}
        x={256}
        y={487}
        href="https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/mia.png"
        preserveAspectRatio="xMidYMid slice"
      />
    </g>
  </svg>
)
export default TicketSVG