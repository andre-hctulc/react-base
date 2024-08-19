import Icon, { type IconProps } from "../Icon";

export default function ImageIcon(props: IconProps) {
    return (
        <Icon {...props}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="lightblue" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
            </svg> */}
            <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 30 30"
                xmlSpace="preserve"
                fill="#000000"
            >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        fill="#a576ff"
                        stroke="#a576ff"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        d="M24,26H6c-2.2,0-4-1.8-4-4V8c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4v14C28,24.2,26.2,26,24,26z"
                    ></path>
                    <path
                        fill="#6ebaff"
                        stroke="#6ebaff"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        d="M24,26H6c-2.2,0-4-1.8-4-4V8c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4v14C28,24.2,26.2,26,24,26z"
                    ></path>
                    <g>
                        <path
                            fill="#5189e5"
                            stroke="#5189e5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit={10}
                            d="M6,26h18c2.2,0,4-1.8,4-4v-7l-4-4l-10.4,9.6L9,16l-7,6.4C2.3,24.4,3.9,26,6,26z"
                        ></path>
                    </g>
                    <circle
                        fill="#e3faff"
                        stroke="#e3faff"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        cx="7"
                        cy="10"
                        r="2"
                    ></circle>
                </g>
            </svg>
        </Icon>
    );
}
