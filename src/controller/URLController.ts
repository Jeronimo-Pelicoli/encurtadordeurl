import { URLModel } from "../database/model/URL";
import { Request, Response } from "express";
import shortid from "shortid";

export class URLController {

    public async shorten(req: Request, res: Response): Promise<void> {

        const { originURL } = req.body;

        const url = await URLModel.findOne({ originURL});
        if(url) {
            res.json(url);
            return
        }

        const hash = shortid.generate();

        const shortURL = `localhost:5000/${hash}`;
        const newURL = await URLModel.create({ hash, shortURL, originURL});
        res.json(newURL);
    }

    public async getUrl(req: Request, res: Response): Promise<void> {

        const { hash } = req.params;
        const url = await URLModel.findOne({ hash });

        if(url) {
            res.redirect(url.originURL)
            return
        }

        res.status(400).json({ error: "URL not found"});
    }
}