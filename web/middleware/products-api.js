import shopify from "../shopify.js";
// import {QRCodesDB} from "../qr-codes-db.js";
// import {formatQrCodeResponse, getQrCodeOr404, getShopUrlFromSession, parseQrCodeBody} from "../helpers/qr-codes.js";
import express from "express";

const productId = "11235813213455";
const productTshortId = "1673508996";
// `session` is built as part of the OAuth process

// const response = client.get({path: 'shop'});

export default function applyProductsEndpoints(app) {
    app.use(express.json());
    console.log('applyProductsEndpoints')
    try {
        app.get(`/api/product`, async (req, res) => {
            const client = new shopify.clients.Rest({session: res.locals.shopify.session});

            const product = await client.get({
                path: `products/11235813213455`,
                query: {id: 1, title: "title"}
            });
            console.log('product: ', product);
            res.send(product.body.data);
        });

    }catch (e) {
        console.log('error on catch:', e)
    }


    // app.post("/api/qrcodes", async (req, res) => {
    //     try {
    //         const id = await QRCodesDB.create({
    //             ...(await parseQrCodeBody(req)),
    //
    //             /* Get the shop from the authorization header to prevent users from spoofing the data */
    //             shopDomain: await getShopUrlFromSession(req, res),
    //         });
    //         const response = await formatQrCodeResponse(req, res, [
    //             await QRCodesDB.read(id),
    //         ]);
    //         res.status(201).send(response[0]);
    //     } catch (error) {
    //         res.status(500).send(error.message);
    //     }
    // });
    //
    // app.patch("/api/qrcodes/:id", async (req, res) => {
    //     const qrcode = await getQrCodeOr404(req, res);
    //
    //     if (qrcode) {
    //         try {
    //             await QRCodesDB.update(req.params.id, await parseQrCodeBody(req));
    //             const response = await formatQrCodeResponse(req, res, [
    //                 await QRCodesDB.read(req.params.id),
    //             ]);
    //             res.status(200).send(response[0]);
    //         } catch (error) {
    //             res.status(500).send(error.message);
    //         }
    //     }
    // });
    //
    // app.get("/api/qrcodes", async (req, res) => {
    //     try {
    //         const rawCodeData = await QRCodesDB.list(
    //             await getShopUrlFromSession(req, res)
    //         );
    //
    //         const response = await formatQrCodeResponse(req, res, rawCodeData);
    //         res.status(200).send(response);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send(error.message);
    //     }
    // });
    //
    // app.get("/api/qrcodes/:id", async (req, res) => {
    //     const qrcode = await getQrCodeOr404(req, res);
    //
    //     if (qrcode) {
    //         const formattedQrCode = await formatQrCodeResponse(req, res, [qrcode]);
    //         res.status(200).send(formattedQrCode[0]);
    //     }
    // });
    //
    // app.delete("/api/qrcodes/:id", async (req, res) => {
    //     const qrcode = await getQrCodeOr404(req, res);
    //
    //     if (qrcode) {
    //         await QRCodesDB.delete(req.params.id);
    //         res.status(200).send();
    //     }
    // });
}

