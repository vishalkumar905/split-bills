import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const withErrorHandler =
  (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await handler(req, res);
    } catch (err) {
      let error = {};

      if (isMongoError(err)) {
        error = handleMongoError(err, res);
      } else {
        error = handleGeneralError(err, res);
      }

      return NextResponse.json({ success: false, ...error }, { status: 500 });
    }
  };

const isMongoError = (err: any) => {
  return (
    err.name === "MongoError" ||
    err.name === "MongoServerError" ||
    err.name === "ValidationError" ||
    err.code !== undefined
  );
};

const handleMongoError = (err: any, res: NextApiResponse) => {
  let errorMessage = "";
  let fieldName = "";

  if (err?.code) {
    if (err?.keyValue && (err.code === 11000 || err.code === 11001)) {
      const field = Object.keys(err.keyValue)[0];
      fieldName = field;
    }

    switch (err.code) {
      case 11000:
      case 11001:
        errorMessage = `Duplicate Key Error: The value for the field '${fieldName}' already exists.`;
        break;
      case 13:
        errorMessage =
          "Unauthorized: You do not have permission to perform this operation.";
        break;
      case 66:
        errorMessage =
          "Immutable Field Error: Attempted to modify an immutable field like _id.";
        break;
      case 50:
        errorMessage =
          "Timeout Error: The operation took too long to complete.";
        break;
      case 16:
        errorMessage = "Indexing Error: Unable to create the specified index.";
        break;
      case 2:
        errorMessage = "Bad Value Error: The provided value is invalid.";
        break;
      case 9:
        errorMessage =
          "Parsing Error: There was an issue with parsing the query.";
        break;
      case 121:
        errorMessage = `Validation Error: The document failed validation for the field '${err.path}'.`;
        break;
      case 43:
        errorMessage =
          "Cursor Not Found: The cursor was lost during the query.";
        break;
      case 11600:
        errorMessage =
          "Operation Interrupted: The operation was interrupted, possibly by a server shutdown.";
        break;
      case 14:
        errorMessage =
          "Type Mismatch Error: The data type provided does not match the expected type.";
        break;
      case 8:
        errorMessage =
          "Query Error: There was an issue with the query execution.";
        break;
      default:
        errorMessage = "Unknown MongoDB Error: An unknown error occurred.";
        break;
    }
  }

  if (err.name === "ValidationError") {
    let errors: any = {};

    Object.keys(err?.errors).forEach((key) => {
      errors[key] = String(err.errors[key].message).replace('Path', '');
    });

    return { errors };
  }

  return {
    success: false,
    message: errorMessage,
    // code: err.code,
    // field: fieldName || 'N/A',
    // stack: err.stack // Optional: Include the error stack for debugging purposes
  };
};

const handleGeneralError = (err: any, res: NextApiResponse) => {
  return { message: err.message || "An unknown error occurred" };
};
