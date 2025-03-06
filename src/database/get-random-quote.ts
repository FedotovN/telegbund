import { Quote } from "../models/quote.model.js";


export async function getRandomQuote(): Promise<null | string> {
    try {
        const quote = await Quote.findOne({
            where: {
                isUsed: false
            }
        })
        if (!quote) return null
        await quote.update({
            isUsed: true
        })
        return quote.dataValues.text;
    } catch (e) {
        console.error(e)
    }
    return null;
}