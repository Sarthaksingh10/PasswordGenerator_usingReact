import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setlength] = useState(8); /* To store the length of password */
  const [Numberinput, setNumberinput] =
    useState(false); /* To check if number input  is selected or not */
  const [Characterinput, setCharacterinput] =
    useState(false); /* To check if character input is selected or not */
  const [passwrod, setpassword] = useState("");

  //useREf hook when we want to take refrence of anything
  const passwordref = useRef("null");

  //useCallback hook useCallback(fn,dependencies)
  const passwrodgenerator = useCallback(() => {
    /* Callback function basically store the function and dependencies  */
    let pass = "";
    let str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; /* The password will be given out of these thnigs */
    if (Numberinput) str += "0123456789"; /* To add numbers in the password */
    if (Characterinput)
      str += "~!@#$%^&*(){}[]<>/?|"; /* To add characters in the password */

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(
        Math.random() * str.length + 1
      ); /* Method to generate passwrod */
      pass +=
        str.charAt(
          char
        ); /* If we will not add the plus assignment operator loop will overwrite the value again and again  so will print only one letter*/
    }

    setpassword(pass);
  }, [
    length,
    Characterinput,
    Numberinput,
    setpassword,
  ]); /* dependencies are the parameter or states on which the above function is dependent */

  //Defining copytoclipboard function
  const copypwtoclipboard = useCallback(() => {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(passwrod);
  }, [passwrod]);

  //UseEffect hook useEffect=(setup,dependencies) =>dependencies are represented in the form of array it is the first thing that run when my page is loaded and if any dependency is changed it will re-run again
  useEffect(() => {
    passwrodgenerator();
  }, [length, Numberinput, Characterinput, passwrodgenerator]);
  return (
    <>
      <div className="flex h-screen w-screen bg-slate-500 justify-center items-center">
        <div className="h-70 w-100 bg-black text-center rounded-xl">
          <h1 className="text-white text-4xl mt-2 p-2">Password Generator </h1>
          <div className="flex ">
            <input
              type="text"
              value={passwrod}
              readOnly
              placeholder=" RANDOM PASSWORD"
              ref={passwordref}
              className="w-full h-14 bg-violet-200 mt-4 text-center text-3xl"
            />
            <button
              className=" text-white h-14 w-20 relative top-4 bg-blue-700 hover:bg-blue-500"
              onClick={copypwtoclipboard}
            >
              Copy
            </button>
          </div>
          <div className="flex justify-center">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="bg-white cursor-pointer h-20 w-40"
              onChange={(e) => {
                setlength(parseInt(e.target.value));
              }}
            />

            <h3 className="text-white text-2xl relative top-5 left-4">
              Length({length})
            </h3>
          </div>

          <div className="flex  items-center">
            <div className="flex relative left-20 ">
              <input
                type="checkbox"
                defaultChecked={Numberinput}
                id="number"
                onChange={() => {
                  setNumberinput((prev) => !prev);
                }}
                className="relative bottom-2"
              />
              <label
                htmlFor="number"
                className="text-white text-xl ml-2  relative bottom-2 cursor-pointer "
                id="Number"
              >
                Numbers
              </label>
            </div>
            <div className="flex relative left-24">
              <input
                type="checkbox"
                defaultChecked={Characterinput}
                onChange={() => {
                  setCharacterinput((prev) => !prev);
                }}
                name="Character"
                id="character"
                className="relative bottom-2"
              />
              <label
                htmlFor="character"
                className="text-white text-xl ml-2  relative bottom-2 cursor-pointer"
                id="Character"
              >
                Character
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
