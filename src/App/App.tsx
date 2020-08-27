import React, { useEffect, useState } from "react";
import Countdown from "../Countdown";

const App: React.FC = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    setTimeout(() => {
      setNow(new Date());
    }, 500);
  });

  return (
    <div className="app">
      <Countdown now={now} />
      <p role="contentinfo" className="credits">- made by <a href="https://bett.is/rob">rob bettis</a> - </p>
    </div>
  );
};

export default App;
