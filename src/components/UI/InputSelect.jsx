import "./InputSelect.css";
import Input from "./Input";
import arrow from "../../assets/down-arrow.png";
import { useState, useRef } from "react";
import { useEffect } from "react";

const InputSelect = (props) => {
  const { options, input, validHandler } = props.select;
  const [show, setShow] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const ulRef = useRef(null);

  const hasError = inputValue.trim().length === 0;

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
    setInputValue(item);
    setShow(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setClicked(true);
  };

  useEffect(() => {
    handleValidation();
  }, [inputValue]);

  const inputInvalid =
    hasError && clicked ? "form-control invalid" : "form-control";

  return (
    <div className="form-select-wrapper" onBlur={blurHandler}>
      <div className="input-button">
        <Input
          input={{
            ...input,
            value: inputValue,
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
