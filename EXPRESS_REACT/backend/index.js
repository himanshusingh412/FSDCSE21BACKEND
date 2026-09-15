import express from express;
import cars from cars;
import fs from fs;
const app = express();
app.use(cors());
app.use(express.json());
app.get("/products", (req, res) => {
    const data = fs.readFileSync("./data.json", "utf-8");
    const products = JSON.parse(data);
    res.json(products);
});
app.post();
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});