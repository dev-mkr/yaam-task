import { FC } from "react";

interface Props {
  error?: string;
}

export const GlobalError: FC<Props> = ({ error }) => {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-gray-50"
      data-testid="global-error"
    >
      <div className="w-1/2 rounded-lg bg-white p-8 text-center shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-red-600">
          Oops! Something went wrong.
        </h2>
        {error && <p className="mb-6 text-gray-700">{error}</p>}
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    </div>
  );
};
