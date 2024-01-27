import { Router, response } from "express";
import dbConnection from "../../data-layer/data.js";

const viewCustomersRouter = Router();

//Get customer register
viewCustomersRouter.get("/", async (request, response) => {
  try {
    const queryString =
        /*sql*/
        `
            SELECT * FROM Customers;
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

export default viewCustomersRouter;
