import { useEffect } from "react";

const InputConatiner = (prop) => {
  return (
    <div className="input-container" id="input-container">
      <div className="task-header">
        <span className="input-action">
          <span className="icons close" title="Band krna hai..." onClick={prop.close}>x</span>
          <span className="icons minus">-</span>
          <span className="icons dot">1</span>
        </span>
        <span className="status c">Add Tasks </span>
      </div>
      <textarea
        ref={prop.r}
        onInput={prop.onInput}
        style={prop.style}
        onBlur={prop.onBlur}
        className="input"
        type="text"
        placeholder="Add your tasks from here...!!!"
        name="task"
        value={prop.value}
        onChange={prop.onChange}
      />

      {/* <button className="" onClick={handleClick}>
      +
    </button> */}
    </div>
  );
};

export default InputConatiner;
