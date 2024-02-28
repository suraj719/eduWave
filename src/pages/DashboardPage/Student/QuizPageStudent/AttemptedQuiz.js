import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function AttemptedQuiz({ questions, opened, handleClose }) {
  const [open, setOpen] = useState(opened);
  const cancelButtonRef = useRef(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setIndex(0);
  }, [questions]);
  return (
    <Transition.Root show={opened} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <button
                    onClick={handleClose}
                    className="float-right -mt-5 font-bold"
                  >
                    X
                  </button>
                  <div className="sm:flex sm:items-start">
                    <div
                      className="rounded-xl flex items-center justify-center w-[55vw] h-[70vh]"
                      style={{
                        backgroundImage: `url(${questions?.background})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% 100%",
                      }}
                    >
                      {index !== 0 && (
                        <button onClick={() => setIndex(index - 1)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="w-10 h-10"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
                            />
                          </svg>
                        </button>
                      )}
                      {opened && (
                        <div className="w-[70%] flex flex-col items-center">
                          <p className="font-str text-center font-bold text-black my-2 text-4xl">
                            {questions?.questions[index]?.question_text}
                          </p>
                          <div className="font-str text-white text-2xl w-full flex flex-col items-center">
                            {questions?.questions[index]?.options.map(
                              (option, Opindex) => {
                                return (
                                  <button
                                    className={
                                      "rounded-lg p-4 px-8 bg-sky-200 text-black w-[60%] mt-2 hover:bg-sky-300 " +
                                      (questions?.questions[index]
                                        ?.selectedOption === option
                                        ? option ===
                                          questions?.questions[index]?.answer
                                          ? "border border-4 border-green-500 bg-sky-300" // Selected and correct
                                          : "border border-4 border-red-500" // Selected but incorrect
                                        : option ===
                                          questions?.questions[index]?.answer
                                        ? "border border-4 border-green-500" // Correct answer not selected
                                        : "") // Neither selected nor correct
                                    }
                                    key={option + Opindex}
                                  >
                                    <p>{option}</p>
                                  </button>
                                );
                              }
                            )}
                          </div>
                        </div>
                      )}
                      {index !== questions?.questions?.length - 1 && (
                        <button onClick={() => setIndex(index + 1)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="w-10 h-10"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
