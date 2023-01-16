import { Card, Page, Layout, TextContainer, Heading } from "@shopify/polaris";
import { TitleBar, useAppBridgeState } from "@shopify/app-bridge-react";
import { ProductsCard } from "../components";
import { useAppQuery } from "../hooks";

export default function Analytics() {
    const appState = useAppBridgeState();
    // console.log('appState: ', appState);
    const {
        data,
    } = useAppQuery({
        url: "/api/qrcodes",
    });
    const {
        data: products,
    } = useAppQuery({
        url: "/api/products/all",
    });
    let totalSum = 0;
    let productItems = 0;
    products.map(product => {
        product.variants.map(productVariant => {
            if (productVariant.inventory_quantity > 0 ) {
                totalSum += productVariant.inventory_quantity * productVariant.price
                productItems += productVariant.inventory_quantity
            }
        })
    } )
    console.log('QRCodes data: ', data)
    console.log('products: ', products)
    console.log('totalSum: ', totalSum)
    return (
        <Page>
            <TitleBar
                title="Analytics"
                primaryAction={{
                    content: "Primary action",
                    onAction: () => console.log("Primary action"),
                }}
                secondaryActions={[
                    {
                        content: "Secondary action",
                        onAction: () => console.log("Secondary action"),
                    },
                ]}
            />
            <Layout>
                <Layout.Section>
                    {/*<Card sectioned>*/}
                    {/*    <Heading>QR codes</Heading>*/}
                    {/*    <TextContainer>*/}
                    {/*        <p>Quality: {QRCodes ? QRCodes.length : 'none'}</p>*/}
                    {/*    </TextContainer>*/}
                    {/*</Card>*/}
                        <ProductsCard />

                </Layout.Section>
                <Layout.Section secondary>
                    <Card sectioned>
                        <Heading>Total cost of goods</Heading>
                        <TextContainer>
                            <p>{totalSum}</p>
                        </TextContainer>
                    </Card>
                    <Card sectioned>
                        <Heading>Total Product items</Heading>
                        <TextContainer>
                            <p>{productItems}</p>
                        </TextContainer>
                    </Card>
                    <Card sectioned>
                        <Heading>Total QRCodes</Heading>
                        <TextContainer>
                            <p>{data ? data.length : 'none'}</p>
                        </TextContainer>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
