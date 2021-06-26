import React, { useState } from "react";

const Field: React.FC = () => {
  const [value, setValue] = useState(0);

  return (
    <>
      <input type="text" value={value} />
      <button onClick={() => setValue(value + 1)}>Acrescentar</button>
    </>
  );
};

export default Field;
