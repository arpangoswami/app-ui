exports.sendResponse = (req, res) => {
  console.log("RECEIVED FROM FRONTEND: ");
  console.log(req.body);
  res.status(204).json({ success: "State successfully updated" });
};
