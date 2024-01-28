import { Router, response } from "express";
import dbConnection from "../../data-layer/data.js";

const adminCatalogueRouter = Router();

//Get router for view orders
adminCatalogueRouter.get("/", async (request, response) => {
  try {
    const active = request.query.active;
    const queryString =
      /*sql*/
      `
        SELECT * FROM Catalogue
        WHERE Active = '${active}';
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

export default adminCatalogueRouter;
