import { useNavigate } from "react-router-dom";

const Alert = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute m-auto left-0 right-0 top-1/4 w-full max-w-md h-96 bg-light z-40 rounded-xl border-mid border-4">
      <div className=" flex flex-wrap justify-center p-5 mt-5 gap-8">
        <h2 className="text-2xl tablet:text-4xl text-black font-semibold text-center">
          It looks like you are not logged in yet
        </h2>
        <p className="text-xl tablet:text-2xl text-center">
          You can change this by clicking on the button below
        </p>
        <button
          onClick={() => navigate("/login")}
          className="glass bg-dark text-light font-bold text-xl p-5 rounded-lg w-2/3 hover:bg-brand hover:text-dark duration-150 italic"
        >
          Log In !
        </button>
      </div>
    </div>
  );
};

export default Alert;
