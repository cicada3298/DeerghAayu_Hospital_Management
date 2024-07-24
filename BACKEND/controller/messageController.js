import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Message } from "../models/messageSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js"

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  console.log("Request received:", req.body);
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("Please fill full form!",400));
  }
  console.log("Creating message in database");
  await Message.create({ firstName, lastName, email, phone, message });
  console.log("Message created successfully");
  res.status(200).json({
    success: true,
    message: "Message sent successfully!",
  });
})
