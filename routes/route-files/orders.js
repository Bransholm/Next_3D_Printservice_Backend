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



// Put route for oders by ID on Status
async function updateVariablesQuery(id, request) {
  const body = request.body;

  const queryString =
    /*sql*/
    `
        UPDATE orders SET Status=? WHERE Id =?;
    `;

  const updateValues = [
      body.status,
      id,
  ];
  const [result] = await dbConnection.query(queryString, updateValues);
  return result;
}
ordersRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const result = await updateVariablesQuery(id, request);
    if (!result || result.affectedRows === 0) {
      rowIdNotFoundResponse(id, response);
    } else {
      response.json(result);
    }
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ message: "An Internal Server Error Has Occured" });
  }
});


export default ordersRouter;
