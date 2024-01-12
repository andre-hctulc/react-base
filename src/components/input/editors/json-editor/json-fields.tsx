import Stack from "@react-client/components/layout/containers/stack";
import React from "react";

interface JSONFields {
    object: object;
}

export default function JSONFields(props: JSONFields) {
    return <Stack className="mt-4">{JSON.stringify(props.object, null, 2)}</Stack>;
}
