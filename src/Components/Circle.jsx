/* eslint-disable react/prop-types */
function Circle({ color }) {
  const circleStyles = {
    backgroundColor: color,
    width: "8px",
    height: "8px",
    borderRadius: "100%",
  };
  return <div style={circleStyles}></div>;
}

export default Circle;
