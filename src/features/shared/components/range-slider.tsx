import RangeSliderInput, {
  type ReactRangeSliderInputProps,
} from "react-range-slider-input";

import "react-range-slider-input/dist/style.css";

export function RangeSlider(props: ReactRangeSliderInputProps) {
  return <RangeSliderInput {...props} />;
}
