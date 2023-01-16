import { Card, Page, Layout, TextContainer, Heading } from "@shopify/polaris";
import { TitleBar, useAppBridgeState } from "@shopify/app-bridge-react";
import { ProductsCard } from "../components";

export default function Analytics() {
    const appState = useAppBridgeState();
    console.log('appState: ', appState);
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
                    {/*    <Heading>Average price</Heading>*/}
                    {/*    <TextContainer>*/}
                    {/*        <p>Body</p>*/}
                    {/*    </TextContainer>*/}
                    {/*</Card>*/}
                        <ProductsCard />

                </Layout.Section>
                <Layout.Section secondary>
                    <Card sectioned>
                        <Heading>Total goods</Heading>
                        <TextContainer>
                            <p>Body</p>
                        </TextContainer>
                    </Card>
                    <Card sectioned>
                        <Heading>Total QRCodes</Heading>
                        <TextContainer>
                            <p>Body</p>
                        </TextContainer>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
