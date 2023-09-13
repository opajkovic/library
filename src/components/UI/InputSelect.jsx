import "./InputSelect.css";
import Input from "./Input";
import arrow from "../../assets/down-arrow.png";
import { useState, useRef } from "react";
import { useEffect } from "react";

const InputSelect = (props) => {
  const { options, input, validHandler } = props.select;
  const [show, setShow] = useState(false);
  const [clicked, setClicked] = useState(false);
  const ulRef = useRef(null);

  const hasError = input.value.trim().length === 0;

  const clickHandler = () => {
    setShow(!show);
  };

  const handleValidation = () => {
    if (!hasError) {
      validHandler(true);
    } else {
      validHandler(false);
    }
  };

  const blurHandler = (event) => {
    if (ulRef.current && !ulRef.current.contains(event.target)) {
      setShow(false);
      setClicked(true);
      handleValidation();
    }
  };

  const listHandler = (item) => {
    input.onChange(item)
    setShow(false);
  };

  const handleInputChange = (event) => {
    setClicked(true);
    input.onChange(event.target.value)
  };

  useEffect(() => {
    handleValidation();
  }, [input.value]);

  const inputInvalid =
    hasError && clicked ? "form-control invalid" : "form-control";

  return (
    <div className="form-select-wrapper" onBlur={blurHandler}>
      <div className="input-button">
        <Input
          input={{
            ...input,
            onChange: handleInputChange,
            inputClasses: inputInvalid,
            onClick: clickHandler,
            onKeyUp: handleValidation,
          }}
          sup={true}
        />
        <button>
          <img src={arrow} alt="Arrow Icon" />
        </button>
      </div>
      {hasError && clicked && (
        <p className="error-message"> Uneseni podatak nije validan! </p>
      )}
      {show && (
        <ul ref={ulRef}>
          {options.map((item, index) => (
            <li
              key={index}
              onMouseDown={(e) => {
                e.preventDefault();
                listHandler(item.name);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputSelect;
