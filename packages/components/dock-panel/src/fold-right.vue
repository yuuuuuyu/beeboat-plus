<template>
    <svg
        width="32px"
        height="32px"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
    >
        <defs>
            <filter
                id="filter-1"
                x="-83.3%"
                y="-83.3%"
                width="266.7%"
                height="266.7%"
                filterUnits="objectBoundingBox"
            >
                <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
                <feGaussianBlur
                    stdDeviation="2"
                    in="shadowOffsetOuter1"
                    result="shadowBlurOuter1"
                />
                <feColorMatrix
                    values="0 0 0 0 0.243137255   0 0 0 0 0.290196078   0 0 0 0 0.419607843  0 0 0 0.12 0"
                    type="matrix"
                    in="shadowBlurOuter1"
                    result="shadowMatrixOuter1"
                />
                <feMerge>
                    <feMergeNode in="shadowMatrixOuter1" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
            <filter
                id="filter-2"
                x="-43.8%"
                y="-43.8%"
                width="187.5%"
                height="187.5%"
                filterUnits="objectBoundingBox"
            >
                <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1" />
                <feGaussianBlur
                    stdDeviation="2"
                    in="shadowOffsetOuter1"
                    result="shadowBlurOuter1"
                />
                <feColorMatrix
                    values="0 0 0 0 0.360784314   0 0 0 0 0.517647059   0 0 0 0 0.949019608  0 0 0 0.25 0"
                    type="matrix"
                    in="shadowBlurOuter1"
                    result="shadowMatrixOuter1"
                />
                <feMerge>
                    <feMergeNode in="shadowMatrixOuter1" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="画板" transform="translate(-285.000000, -268.000000)" fill-rule="nonzero">
                <g
                    id="编组-20备份-2"
                    filter="url(#filter-1)"
                    transform="translate(301.000000, 284.000000) scale(-1, 1) rotate(-90.000000) translate(-301.000000, -284.000000) translate(289.000000, 272.000000)"
                >
                    <g id="关闭节点" filter="url(#filter-2)" fill="#FFFFFF">
                        <path
                            id="路径"
                            d="M12,0 C5.372583,0 0,5.372583 0,12 C0,18.627417 5.372583,24 12,24 C18.627417,24 24,18.627417 24,12 C23.9921617,5.37583246 18.6241675,0.00783833585 12,0 Z"
                        />
                    </g>
                    <g id="编组" transform="translate(7.000000, 9.000000)" fill="#3E4A6B">
                        <path
                            id="路径"
                            d="M8.93310547,0.183105469 C8.68896484,-0.0610351562 8.29248047,-0.0610351562 8.04833984,0.183105469 L4.77880859,3.45263672 C4.65771484,3.57373047 4.45849609,3.57373047 4.33740234,3.45263672 L1.06787109,0.183105469 C0.823730469,-0.0610351562 0.427246094,-0.0610351562 0.183105469,0.183105469 C-0.0610351562,0.427246094 -0.0610351562,0.823730469 0.183105469,1.06787109 L3.67333984,4.55810547 C4.16162109,5.04638672 4.95263672,5.04638672 5.44091797,4.55810547 L8.93310547,1.06787109 C9.17724609,0.823730469 9.17724609,0.427246094 8.93310547,0.183105469 L8.93310547,0.183105469 Z"
                            transform="translate(4.558105, 2.462158) scale(1, -1) translate(-4.558105, -2.462158) "
                        />
                    </g>
                </g>
            </g>
        </g>
    </svg>
</template>
