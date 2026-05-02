import { useState } from "react";
import StudentCard from "./StudentCard";

function Toggle() {
  const [value, setValue] = useState(false);

  const handleToggle = () => setValue(!value);

  return (
    <>
      <button onClick={handleToggle}>
        {value ? "Hide Student" : "Show Student"}
      </button>
      {value && <StudentCard name={"Ram"} age={18} email={"ram@gmail.com"} />}
    </>
  );
}

export default Toggle;
