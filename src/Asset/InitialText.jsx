const Initialtext = (props) => {
  console.log(props);
  return (
    <div className="create-task show" onClick={props.onClick}>
      <span className="create-btn">
        <i className="ph-bold ph-plus" />
      </span>
      <span className="create-text">Create New task... </span>
    </div>
  );
};

export default Initialtext;
