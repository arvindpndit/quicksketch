import { RxDotFilled } from 'react-icons/rx'; //medium
import { BsDot } from 'react-icons/bs'; //small
import { GoDotFill } from 'react-icons/go'; //large

const StrokeWidthContainer = ({ setStrokeWidth, strokeWidth }) => {
  return (
    <div className=" flex justify-center top-20 left-0 fixed z-50 m-5 bg-white rounded-xl">
      <div className="flex flex-col gap-2 border-gray-200 border  rounded-xl shadow-sm p-1">
        <button
          onClick={() => setStrokeWidth(2)}
          className={`p-3 rounded-lg hover:bg-gray-200 hover:cursor-pointer ${
            strokeWidth === 2 ? 'bg-green-300' : ''
          }`}
        >
          <BsDot />
        </button>
        <button
          onClick={() => setStrokeWidth(4)}
          className={`p-3 rounded-lg hover:bg-gray-200 hover:cursor-pointer ${
            strokeWidth === 4 ? 'bg-green-300' : ''
          }`}
        >
          <RxDotFilled />
        </button>
        <button
          onClick={() => setStrokeWidth(6)}
          className={`p-3 rounded-lg hover:bg-gray-200 hover:cursor-pointer ${
            strokeWidth === 6 ? 'bg-green-300' : ''
          }`}
        >
          <GoDotFill />
        </button>
      </div>
    </div>
  );
};

export default StrokeWidthContainer;

