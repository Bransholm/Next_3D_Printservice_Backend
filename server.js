//Dependensies goes here:
import express from "express";
import cors from "cors";

//Route imports goes here:
import catalogueRouter from "./routes/route-files/catalogue.js";
import startRouter from "./routes/route-files/start.js";
import stockRouter from "./routes/route-files/stock.js";
import availableStockRouter from "./routes/route-files/available-stock.js";
import makeOrderRouter from "./routes/route-files/make-order.js";
import customersRouter from "./routes/route-files/customer.js";
import viewOrdrerRouter from "./routes/route-files/view-ordrer.js";
import makeOrderExistingCustomerRouter from "./routes/route-files/make-order-existing-customer.js";
import variablesRouter from "./routes/route-files/variables.js";
import financeRouter from "./routes/route-files/finance.js";

const app = express();
const port = process.env.PORT || 4811;

app.use(express.json());
app.use(cors());

//The routes goes here:
app.use("/", startRouter);
app.use("/catalogue", catalogueRouter);
app.use("/customers", customersRouter);
app.use("/stock", stockRouter);
app.use("/availableStock", availableStockRouter);
app.use("/makeOrder", makeOrderRouter);
app.use("/makeOrderExistingCustomer", makeOrderExistingCustomerRouter);
app.use("/viewOrdrer", viewOrdrerRouter);
app.use("/variables", variablesRouter);
app.use("/finance", financeRouter);

app.listen(port, () => {
  console.log(
    `The sever is running on port http://127.0.0.1:${port}\n 3DPrintservice_backend is live`
  );
});
