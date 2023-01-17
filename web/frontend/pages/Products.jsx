import {Card, ResourceList, ResourceItem, SkeletonBodyText} from '@shopify/polaris';
import React from 'react';
import {useAppQuery} from "../hooks/index.js";
import {Loading, TitleBar} from "@shopify/app-bridge-react";

export default function Products() {
    const {
        data: products,
        isLoading: isLoadingProducts
    } = useAppQuery({
        url: "/api/products/all",
    });
    console.log('products: ', products);

    const loadingMarkup = isLoadingProducts ? (
        <Card sectioned>
            <Loading />
            <SkeletonBodyText />
        </Card>
    ) : null;
    return (
        <Card>
            <TitleBar
                title="Products"
                primaryAction={{
                    content: "Primary action",
                    onAction: () => console.log("Primary action"),
                }}
                // secondaryActions={[
                //     {
                //         content: "Secondary action",
                //         onAction: () => console.log("Secondary action"),
                //     },
                // ]}
            />
            {loadingMarkup}
            <ResourceList
                resourceName={{singular: 'customer', plural: 'customers'}}
                items={products}
                renderItem={(product) => {
                    return (
                        <ResourceItem
                            id={product.id}
                            // url={url}
                            media={<img
                                alt=""
                                width="50px"
                                height="50px"
                                style={{objectFit: 'cover', objectPosition: 'center'}}
                                src={product.image && product.image.src}
                            />}
                            accessibilityLabel={`View details for ...`}
                            // shortcutActions={shortcutActions}
                        >
                            <b>
                                {product.handle}
                            </b>
                            {(product.variants && product.variants.length) && product.variants.map(variant => {
                                return (
                                    <div key={variant.id}>
                                        <p>Title: {variant.title}</p>
                                        <p>Quantity: {variant.inventory_quantity}</p>
                                        <p>Price: {variant.price}</p>
                                    </div>
                                )
                            })
                            }
                        </ResourceItem>
                    );
                }}
            />
        </Card>
    );
}
