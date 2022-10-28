type Props = {
  text?: string;
  icon?: string;
  isLoading?: boolean;
  color?: "standard" | "white" | "light" | "dark" | "black" | "text" | "ghost";
  corner?: "soft" | "radius";
  size?: "small" | "standard" | "medium" | "large";
} & JSX.IntrinsicElements["button"];

export function Button(props: Props) {
  const {
    text,
    icon,
    isLoading,
    color = "standard",
    corner = "soft",
    size = "standard",
    ...rest
  } = props;
  return (
    <button
      {...rest}
      className={`button ${isLoading && "is-loading"} ${renderBorderType(
        corner
      )} ${renderSize(size)} ${renderColor(color)}`}
    >
      {icon && (
        <span className="icon">
          <i className={icon}></i>
        </span>
      )}
      {text && <span>{text}</span>}
    </button>
  );
}

function renderColor(color: string) {
  switch (color) {
    case "white":
      return "is-white";
    case "light":
      return "is-light";
    case "dark":
      return "is-dark";
    case "black":
      return "is-black";
    case "text":
      return "is-text";
    case "ghost":
      return "is-ghost";
    default:
      return "";
  }
}

function renderBorderType(corner: string) {
  switch (corner) {
    case "radius":
      return "is-rounded";
    default:
      return "";
  }
}

function renderSize(size: string) {
  switch (size) {
    case "small":
      return "is-small";
    case "medium":
      return "is-medium";
    case "large":
      return "is-large";
    default:
      return "";
  }
}
