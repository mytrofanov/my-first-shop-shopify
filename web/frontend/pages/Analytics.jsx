import {Card, Page, Layout, TextContainer, Heading } from "@shopify/polaris";
import {Loading, TitleBar, useAppBridgeState} from "@shopify/app-bridge-react";
import { useAppQuery } from "../hooks";
import Sales from '../components/sales';

export default function Analytics() {
    const appState = useAppBridgeState();

    const {
        data: QRCodes,
        isLoading: isLoadingQRCodes,
    } = useAppQuery({
        url: "/api/qrcodes",
    });
    const {
        data: products,
        isLoading: isLoadingProducts,
    } = useAppQuery({
        url: "/api/products/all",
    });
    let totalSum = 0;
    let productItems = 0;
    if (products) {
    products.map(product => {
        product.variants.map(productVariant => {
            if (productVariant.inventory_quantity > 0 ) {
                totalSum += productVariant.inventory_quantity * productVariant.price
                productItems += productVariant.inventory_quantity
            }
        })
    } )
    }
    const {
        data,
        isLoading: isLoadingCount,
    } = useAppQuery({
        url: "/api/products/count",
    });

    const loadingMarkup = (isLoadingQRCodes || isLoadingProducts || isLoadingCount) ? (
        <Card sectioned>
            <Loading />
        </Card>
    ) : null;

    return (
        <Page fullWidth>
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
            {loadingMarkup}
            {/*{(isLoadingQRCodes || isLoadingProducts || isLoadingCount) && <LoadingExample />}*/}
            <Layout>
                <Layout.Section secondary>
                    <>
                        <Card
                            sectioned
                        >
                            <Heading>TOTAL PRODUCTS</Heading>
                            <TextContainer spacing="loose">
                                    {isLoadingCount ? "-" : (data ? data.count : 'no data') }
                            </TextContainer>
                        </Card>
                        <Card sectioned>
                            <Heading>Total cost of goods</Heading>
                            <TextContainer>
                                <p>{totalSum}</p>
                            </TextContainer>
                        </Card>
                    </>

                </Layout.Section>
                <Layout.Section secondary>
                    <Card sectioned>
                        <Heading>Total Product items</Heading>
                        <TextContainer>
                            <p>{productItems}</p>
                        </TextContainer>
                    </Card>
                    <Card sectioned>
                        <Heading>Total QRCodes</Heading>
                        <TextContainer>
                            <p>{QRCodes ? QRCodes.length : 'none'}</p>
                        </TextContainer>
                    </Card>
                </Layout.Section>
            </Layout>
            <Sales />
        </Page>
    );
}
