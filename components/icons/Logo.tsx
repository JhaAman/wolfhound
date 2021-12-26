const Logo = ({ className = "", ...props }) => (
  // <svg
  //   width="32"
  //   height="32"
  //   viewBox="0 0 32 32"
  //   fill="none"
  //   xmlns="http://www.w3.org/2000/svg"
  //   className={className}
  //   {...props}
  // >
  //   <rect width="100%" height="100%" rx="16" fill="white" />
  //   <path
  //     fillRule="evenodd"
  //     clipRule="evenodd"
  //     d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
  //     fill="black"
  //   />
  // </svg>
  <svg
    width="inherit"
    height="inherit"
    viewBox="0 0 1000 1000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="100%" height="100%" fill="#FE315E" />
    <path
      d="M676.5 500.5L685.5 119L1000 500V1000H374L258 884L279 770L373.5 669.5L676.5 500.5Z"
      fill="#DF0131"
    />
    <path
      d="M449.96 377.007C710.85 319.006 654.456 112.057 681.066 116.057C707.676 120.057 844.287 506.057 666.676 614.557C489.066 723.057 380 598.5 258.066 884.058C242.733 759.558 189.07 435.007 449.96 377.007Z"
      fill="#252C2C"
    />
    <rect
      x="374"
      y="555.634"
      width="274.299"
      height="29"
      rx="14.5"
      transform="rotate(-29.6352 374 555.634)"
      fill="#FE315E"
    />
  </svg>
);

export default Logo;
