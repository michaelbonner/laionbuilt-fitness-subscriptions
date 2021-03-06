import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";

const Home = () => {
  const [componentState, setComponentState] = useState("initial"); // initial, success, fail
  const [email, setEmail] = useState("");
  const [countDown, setCountDown] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClick = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!email) {
      return false;
    }

    let data = await (await fetch(`/api/subscription/${email}`)).json();
    setComponentState(data.success ? "success" : "fail");
    setCountDown(10);
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setComponentState("initial");
    setEmail("");
  };

  useEffect(() => {
    if (componentState === "initial") {
      setCountDown(0);
      return;
    }

    if (countDown === 0) {
      resetForm();
      // setCountDown(10);
    } else {
      setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
    }
  }, [countDown]);

  return (
    <div
      className={`${componentState === "initial" ? "bg-gray-200" : ""}${
        componentState === "fail" ? "bg-yellow-500" : ""
      }${
        componentState === "success" ? "bg-green-500" : ""
      } min-h-screen flex flex-col items-center justify-center px-4 transition duration-300 ease-in-out`}
    >
      <Head>
        <title>Laionebuilt Fitness Membership App</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <div className="bg-white overflow-hidden shadow rounded-lg w-full lg:w-2/3 my-4">
        <div className="border-b border-gray-200 px-4 py-5 sm:px-6 bg-black">
          <div className="bg-black px-6 py-3 my-2">
            <Image
              src="/laionebuilt-header.png"
              alt="Laionebuilt Fitness Logo"
              width="891"
              height="103"
            />
          </div>
          <h1 className="m-4 pt-3 text-white text-center text-3xl font-light">
            Check Your Membership
          </h1>
        </div>
        <div className="px-4 py-5 sm:p-6 bg-gray-100">
          <div className="px-4 lg:px-8 my-8 sm:w-full">
            {componentState === "initial" && (
              <form
                autoComplete="off"
                className="sm:flex py-12"
                onSubmit={onClick}
              >
                <input
                  autoComplete="false"
                  className="hidden"
                  name="hidden"
                  type="text"
                />
                <input
                  aria-label="Email address"
                  type="email"
                  required
                  className="appearance-none w-full px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-400 transition duration-150 ease-in-out"
                    disabled={isSubmitting}
                  >
                    Check My Membership
                  </button>
                </div>
              </form>
            )}
            {componentState === "fail" && (
              <p className="text-center text-yellow-800 py-8 lg:px-16 text-2xl font-normal">
                Please see a Laionebuilt staff member or visit{` `}
                <span className="font-semibold">LaioneBuiltFitness.com</span> to
                update the status of your membership.
              </p>
            )}
            {componentState === "success" && (
              <p className="text-center text-green-800 py-8 lg:px-16 text-2xl">
                You're good to go. Thank you for being a member!
              </p>
            )}
          </div>
        </div>
        {componentState !== "initial" && (
          <button
            className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-b-md text-gray-700 bg-gray-200 hover:bg-gray-400 focus:outline-none focus:bg-gray-400 transition duration-150 ease-in-out"
            onClick={resetForm}
          >
            Reset ... {countDown}
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
