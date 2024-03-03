/* eslint-disable react/prop-types */
import Circle from "./Circle";

function CustomTooltip({
  active,
  payload,
  label,
  showLabelDate,
  circleColors,
}) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        {showLabelDate && (
          <p className="label">
            {`${new Date(label).getDate()} ${new Date(label).toLocaleDateString(
              "default",
              {
                month: "short",
              }
            )} ${new Date(label).getFullYear()}`}
          </p>
        )}
        {payload.map((entry, index) => (
          <div key={index} className="flex-group align-items-center gap-300">
            <Circle color={circleColors[index]} />
            <p>{`$ ${entry.value.toFixed(1)}`}</p>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default CustomTooltip;
