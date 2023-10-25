import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req,res) => {
    try {
        const response = await axios.get("https://fantasy.premierleague.com/api/bootstrap-static/");
        const result = response.data.events;
        console.log(result);
        res.render("index.ejs", { data: result, selected: null});
    } catch (error) {
        res.status(404).send(error);
    }
})

app.post("/", async (req, res) => {
    try {
        console.log(req.body.gw);
        const response = await axios.get("https://fantasy.premierleague.com/api/bootstrap-static/");
        const gameweeks = response.data.events;
        const players = response.data.elements;
        const gw = req.body.gw;
        const selected_gw = result.filter(
            data => {
                return data.id == gw;
            }
        );
        res.render("index.ejs", { data: gameweeks, selected: selected_gw, players: players});
    } catch (error) {
        res.status(404).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });