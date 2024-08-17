import * as React from "react";

function CustomSpinner() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full" />
    </div>
  );
}
export { CustomSpinner };
