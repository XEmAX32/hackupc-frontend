import * as React from "react"

const SvgComponent = ({imgpath}) => (
  <svg
    viewBox="0 0 2500 1767"
  >
    <image width={2500} height={1767} src={imgpath} />
    <a href="https://google.com">
      <rect x="157" y="1273" fill={"#fff"} opacity={0} width="513" height="294"></rect>
    </a> 
  </svg>
)

export default SvgComponent
