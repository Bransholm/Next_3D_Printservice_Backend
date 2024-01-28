import { Router, response } from "express";
import dbConnection from "../../data-layer/data.js";

const ordersRouter = Router();

//Get router for view orders with Status
ordersRouter.get("/", async (request, response) => {
  try {
    const status = request.query.status;
    const queryString =
      /*sql*/
      `
        SELECT * FROM orders WHERE Status = '${status}';
    `;
    const [result] = await dbConnection.execute(queryString);
    response.json(result);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ message: "An Internal Server Error Has Occured" });
  }
});

export default ordersRouter;
