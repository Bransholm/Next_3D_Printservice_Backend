import { Router, response } from "express";
import dbConnection from "../../data-layer/data.js";

const variablesRouter = Router();

//Get router for view orders
variablesRouter.get("/", async (request, response) => {
  try {
    const queryString =
      /*sql*/
      `
        SELECT * FROM variables
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


// Put route for admin settings
async function updateVariablesQuery(request) {
  const body = request.body;

  const queryString =
    /*sql*/
    `
        UPDATE variables SET Tax=?, ShippingPrice=?, PriceCalculationForm=?, MobilePayNumber=? WHERE Id =1;
    `;

  const updateValues = [
    body.tax,
    body.shippingPrice,
    body.priceCalculationForm,
    body.mobilePayNumber,
  ];
  const [result] = await dbConnection.query(queryString, updateValues);
  return result;
}
variablesRouter.put("/", async (request, response) => {
  try {
    const result = await updateVariablesQuery(request);
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


export default variablesRouter;
