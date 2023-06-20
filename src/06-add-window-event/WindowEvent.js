import { useEffect } from "react";

export default function WindowEvent () {

  useEffect(() => {
    const handleDblClick = () => alert("window event triggered");

    // add event listener when component mounts (triggering this useEffect block)
    window.addEventListener("dblclick", handleDblClick);

    // return fn that will rm event listener when component is unmounted
    return () => window.removeEventListener("dblclick", handleDblClick);
  }, []);

  return (
    <h2>Window event active</h2>
  )
}
