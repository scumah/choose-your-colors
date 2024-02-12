import { useCallback, useEffect, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import useSWRMutation from "swr/mutation";
import { contrastText } from "color-delta-e";

import Loader from "../components/loader";

import useClickOutside from "../hooks/useClickOutside";
import useDebounce from "../hooks/useDebounce";

import styles from "./popover-picker.module.css";

const fetcher = ([url, color]: [url: string, color: string]) =>
  fetch(`${url}${color.replace("#", "")}`).then((res) => res.json());

const PopoverPicker = ({
  color,
  onChange,
}: {
  color: string;
  onChange: (color: string) => void;
}) => {
  const [isOpen, toggle] = useState(false);
  const [colorName, setColorName] = useState("");
  const close = useCallback(() => toggle(false), []);
  const popover = useClickOutside(close);
  const debouncedColor = useDebounce<string>(color, 100);

  const { trigger, isMutating } = useSWRMutation(
    ["https://api.color.pizza/v1/?values=", debouncedColor],
    fetcher,
  );

  useEffect(() => {
    if (debouncedColor) {
      const fetchColorName = async () => {
        const result = await trigger();
        if (!result.error) {
          setColorName(result.colors[0].name);
        }
      };
      fetchColorName();

      onChange(color);
    } else {
      setColorName("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedColor]);

  const colorNameContent = () => {
    if (isMutating) {
      return (
        <span className={styles.colorName}>
          <Loader />
        </span>
      );
    }

    return (
      <span className={styles.colorName}>{colorName || "Choose a color"}</span>
    );
  };

  return (
    <div className={styles.picker}>
      <div className={styles.swatchWrapper} onClick={() => toggle(true)}>
        <div className={styles.colorContainer} style={{ background: color }}>
          <div
            className={`${styles.colorCode} ${color ? "" : styles.empty}`}
            style={{ color: contrastText(color) }}
          >
            <HexColorInput color={color} onChange={onChange} />
          </div>
        </div>
        {colorNameContent()}
      </div>

      {isOpen && (
        <div className={styles.popover} ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

export default PopoverPicker;
